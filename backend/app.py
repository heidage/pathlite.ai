from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from ingest import loading_vectorstore
from dotenv import load_dotenv
from langchain.prompts import (
    ChatPromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate
)
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.chat_models import AzureChatOpenAI

import sys
import os

load_dotenv()
app = FastAPI()

origins = [
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db = loading_vectorstore()
retriever = db.as_retriever(
    search_type="mmr",  # Also test "similarity"
    search_kwargs={"k": 3},
)
print("Retriever loaded")

chat = AzureChatOpenAI(
    headers = {"Ocp-Apim-Subscription-Key": os.environ["OPENAI_API_KEY"]},
    # openai_api_base = os.environ["AZURE_OPENAI_ENDPOINT"],
    openai_api_base = os.environ["OPENAI_API_BASE"],
    openai_api_key = os.environ["OPENAI_API_KEY"],
    deployment_name=os.environ["OPENAI_CHAT_DEPLOYMENT"],
    openai_api_version=os.environ["OPENAI_CHAT_API_VERSION"],
    max_tokens=os.environ["OPENAI_CHAT_RESPONSE_MAX_TOKENS"],
    temperature=os.environ["OPENAI_CHAT_TEMPERATURE"],
    verbose=True
)

# using Langchain conversationchain for chat method
conversation = ConversationChain(
    llm=chat,
    verbose=True,
)

def getDocs(question):
    docs = retriever.invoke(question)
    final_docs = ""
    for doc in docs:
        doc.page_content = doc.page_content.replace("\n\n", " ")
        final_docs += doc.metadata['source']+":\n"+doc.page_content+"\n\n"

    return final_docs

@app.post("/getResponse")
async def askGPT(request: Request):
    try:
        data = await request.json()
    except:
        return {"error": "Invalid JSON"}
    
    question = data["question"]
    context = getDocs(question)
    return {"answer":context}