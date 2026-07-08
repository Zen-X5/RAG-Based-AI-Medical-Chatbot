from langchain.document_loaders import PyPDFLoader,DirectoryLoader
from langchain.embeddings import HuggingFaceBgeEmbeddings
from typing import List
from langchain.schema import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter

def extraction(data):
    loader=DirectoryLoader(data,glob="*.pdf",loader_cls=PyPDFLoader)
    documents=loader.load()
    return documents


def filtration(docs:List[Document])->List[Document]:
    minimal_docs:List[Document]=[]

    for doc in docs:
        src=doc.metadata.get("source")
        minimal_docs.append(
            Document(
                metadata={
                    'source':src
                },
                page_content=doc.page_content
            )
        )
    return minimal_docs


def chunking(data):
    text_splitter=RecursiveCharacterTextSplitter(chunk_size=500,chunk_overlap=20)
    chunks=text_splitter.split_documents(data)

    return chunks


def download_embeddings():
    model_name="sentence-transformers/all-MiniLM-L6-v2"
    embedding=HuggingFaceBgeEmbeddings(
        model_name=model_name
    )
    return embedding