from fastapi import APIRouter
from pydantic import BaseModel
from src.rag.chains import rag_chain,title_chain

router = APIRouter(
    prefix="/api/ai-service"
)

class Prompt(BaseModel):
    question: str

@router.post("/data")
def getAns(prompt: Prompt):
    try:
        response=rag_chain.invoke({"input":prompt.question})
        title=title_chain.invoke({"question":prompt.question})
        return {
            "message": response["answer"],
            "title":title.content
        }
    except Exception as e:
        print(e)

        return{
            "error":"something went wrong by LLM"
        }