from langchain_core.prompts import ChatPromptTemplate

system_prompt=(
    "You are an expert medical assistant for question answering. "
    "Use only the provided context from the knowledge base to answer the user's question. "
    "If the answer is not present in the context, say you do not know. "
    "Be concise, accurate, and professional."
    "Make the response a bit very much longer"
)

prompt=ChatPromptTemplate.from_messages(
    [
        ("system",system_prompt),
        ("human","Context:\n{context}\n\nQuestion:\n{input}\n")
    ]
)


title_prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "Generate a short chat title based on the user's first medical question. Maximum 5 words."
        ),
        (
            "human",
            "{question}"
        )
    ]
)