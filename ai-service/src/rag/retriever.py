from src.utils.helper import download_embeddings
from langchain_pinecone import PineconeVectorStore
from dotenv import load_dotenv
import os

load_dotenv()

embeddings=download_embeddings()

PINECONE_API_KEY=os.getenv("PINECONE_API_KEY")
GROQ_API_KEY=os.getenv("GROQ_API_KEY")

os.environ["PINECONE_API_KEY"]=PINECONE_API_KEY
os.environ["GROQ_API_KEY"]=GROQ_API_KEY

index_name="rag-medical-chatbot"

docsearch=PineconeVectorStore.from_existing_index(
    embedding=embeddings,
    index_name=index_name
)
retriever=docsearch.as_retriever(search_type="similarity",search_kwargs={"k":3})