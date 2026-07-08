from src.utils.helper import extraction,filtration,chunking,download_embeddings
from langchain_pinecone import PineconeVectorStore
from dotenv import load_dotenv
import os
from pinecone import Pinecone
from pinecone import ServerlessSpec

load_dotenv()

extracted_data=extraction("data")
filtered_data=filtration(extracted_data)
chunks=chunking(filtered_data)
embeddings=download_embeddings()



PINECONE_API_KEY=os.getenv("PINECONE_API_KEY")
GROQ_API_KEY=os.getenv("GROQ_API_KEY")

os.environ["PINECONE_API_KEY"]=PINECONE_API_KEY
os.environ["GROQ_API_KEY"]=GROQ_API_KEY



pc=Pinecone(api_key=PINECONE_API_KEY)

index_name="rag-medical-chatbot"
if not pc.has_index(index_name):
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws",region="us-east-1")
    )
index=pc.Index(index_name)#this line means connect to the pinecone so i can already use it


docsearch=PineconeVectorStore.from_documents(
    documents=chunks,
    embedding=embeddings,
    index_name=index_name
)
