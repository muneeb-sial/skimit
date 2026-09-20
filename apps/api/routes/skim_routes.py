from typing import Optional
from urllib.parse import urlparse

from fastapi import APIRouter, BackgroundTasks, Depends, File, Form, HTTPException, Response, UploadFile
from sqlmodel import Session

from config.db.session import get_db_session
from dtos.skim_schema import SkimRead
from services.skim_service import SkimService, run_skim_pipeline

router = APIRouter(prefix="/skim", tags=["skim"])


@router.post("", response_model=SkimRead)
async def create_skim(
    background_tasks: BackgroundTasks,
    response: Response,
    url: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    session: Session = Depends(get_db_session),
):
    if bool(url) == bool(file):
        raise HTTPException(422, "Provide exactly one of 'url' or 'file'")

    service = SkimService(session)
    if url:
        if urlparse(url.strip()).scheme not in ("http", "https"):
            raise HTTPException(422, "'url' must be an http(s) URL")
        transcription, needs_processing = service.submit_url(url)
    else:
        transcription, needs_processing = service.submit_file(file.filename, await file.read())

    if needs_processing:
        background_tasks.add_task(run_skim_pipeline, transcription.id)
        response.status_code = 202
    return SkimRead.from_transcription(transcription)


@router.get("", response_model=list[SkimRead])
def list_skims(session: Session = Depends(get_db_session)):
    return [SkimRead.from_transcription(t, detail=False) for t in SkimService(session).list()]


@router.get("/{skim_id}", response_model=SkimRead)
def get_skim(skim_id: int, session: Session = Depends(get_db_session)):
    transcription = SkimService(session).get(skim_id)
    if transcription is None:
        raise HTTPException(404, "Skim not found")
    return SkimRead.from_transcription(transcription)
