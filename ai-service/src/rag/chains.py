from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_groq import ChatGroq
from src.rag.prompt import prompt
from src.rag.retriever import retriever
from src.rag.prompt import title_prompt

chatModel=ChatGroq(model="llama-3.1-8b-instant")

question_answer_chain=create_stuff_documents_chain(chatModel,prompt)
rag_chain=create_retrieval_chain(retriever,question_answer_chain)
title_chain = title_prompt | chatModel
