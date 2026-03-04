import os
import shutil
import subprocess
import requests
from pathlib import Path
from fastapi import FastAPI, BackgroundTasks
from pydantic import BaseModel

app = FastAPI()

# In-memory job status tracker
class JobStatus:
    jobs: dict = {}

class ProcessRequest(BaseModel):
    song_path: str
    song_id: int
    callback_url: str


def run_demucs(song_path: str, song_id: int, callback_url: str):
    output_dir = Path(__file__).parent.parent / "backend" / "public" / "media" / "stems" / str(song_id)
    output_dir.mkdir(parents=True, exist_ok=True)

    try:
        result = subprocess.run(
            ["python", "-m", "demucs", "-n", "htdemucs", "--mp3", "-o", str(output_dir), song_path],
            capture_output=True,
            text=True,
            check=True
        )

        # Demucs writes to output_dir/htdemucs/<track_basename>/
        song_basename = Path(song_path).stem
        stem_source_dir = output_dir / "htdemucs" / song_basename

        stem_types = ["vocals", "drums", "bass", "other"]
        for stem_type in stem_types:
            src = stem_source_dir / f"{stem_type}.mp3"
            dst = output_dir / f"{stem_type}.mp3"
            if src.exists():
                shutil.move(str(src), str(dst))

        # Clean up the htdemucs subdirectory
        htdemucs_dir = output_dir / "htdemucs"
        if htdemucs_dir.exists():
            shutil.rmtree(str(htdemucs_dir))

        JobStatus.jobs[song_id] = "complete"
        requests.post(callback_url, json={
            "song_id": song_id,
            "status": "complete",
            "stems": stem_types
        })

    except Exception as e:
        JobStatus.jobs[song_id] = "failed"
        requests.post(callback_url, json={
            "song_id": song_id,
            "status": "failed",
            "error": str(e)
        })


@app.post("/process")
async def process(req: ProcessRequest, background_tasks: BackgroundTasks):
    JobStatus.jobs[req.song_id] = "processing"
    background_tasks.add_task(run_demucs, req.song_path, req.song_id, req.callback_url)
    return {"status": "queued", "song_id": req.song_id}


@app.get("/health")
def health():
    return {"status": "ok"}
