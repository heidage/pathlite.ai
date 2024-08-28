import os
import re
import string
import random
import json
from typing import List
import chromadb

from autogen import Cache        
from autogen.agentchat.contrib.retrieve_user_proxy_agent import RetrieveUserProxyAgent
from autogen.agentchat.contrib.retrieve_assistant_agent import RetrieveAssistantAgent

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from Prompts import RETRIEVE_USER_SYSTEMPROMPT

load_dotenv()
CHAT_MEMORY_WINDOW = int(os.environ.get("OPENAI_CHAT_MEMORY_WINDOW", "4"))
CHAT_BASE_URL = os.environ["AZURE_OPENAI_ENDPOINT"]
CHAT_DEPLOYMENT = os.environ.get("CHAT_COMPLETIONS_DEPLOYMENT_NAME","gpt-35-turbo")
CHAT_API_VERSION  = os.environ.get("OPENAI_CHAT_API_VERSION", "2023-05-15")
CHAT_TEMPERATURE = float(os.environ.get('OPENAI_CHAT_TEMPERATURE', '0.0'))
CHAT_API_TYPE = os.environ["OPENAI_API_TYPE"]
LLM_CONFIG = {
    "config_list": [
        {
            "model": CHAT_DEPLOYMENT,
            "api_type": CHAT_API_TYPE,
            "api_key": os.environ['AZURE_OPENAI_API_KEY'],
            "base_url": CHAT_BASE_URL,
            "api_version": CHAT_API_VERSION,
        }
    ],
    "temperature": CHAT_TEMPERATURE,
}

assistant = RetrieveAssistantAgent(
    name="assistant",
    system_message="You are a helpful AI assistant",
    llm_config = LLM_CONFIG,
)

azure_proxy = RetrieveUserProxyAgent(
    name="ragproxyagent",
    human_input_mode="NEVER",
    retrieve_config = {
        "vector_db": None,
        "docs_path": None,
        "client": chromadb.PersistentClient(path="./db"),
        "collection_name": "ethereum",
        "embedding_model": "all-MiniLM-L6-v2",
        "chunk_token_size": 2000,
        "custom_text_types": ["md", "js", "ts","md","txt"],
        "overwrite": False,
        "model": "gpt-35-turbo",
    }
)

app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/getResponse")
async def askGPT(request: Request):
    try:
        data = await request.json()
    except:
        return {"error": "Invalid JSON"}
    
    question = data["question"]
    assistant.reset()
    with Cache.redis(redis_url="redis://localhost:6379/0") as cache:
        result = azure_proxy.initiate_chat(assistant, message=azure_proxy.message_generator, problem=question, cache=cache)
        final_result = result.summary
        
        if "Sources: " in final_result:
            answer, sources = final_result.split("Sources: ")
            sources_list = sources.split(", ")
            if type(sources_list) is not list:
                sources_list = [sources]
            
            pattern = r'\[(.*?)\]\((.*?)\)'
            if len(re.findall(pattern, sources)) > 0:
                sources_list = [{"name": match[0], "link": match[1], "website": True} for source in sources_list for match in re.findall(pattern, source)]
            else:
                sources_list = list(set(sources_list))[:3]
                sources_list = [{"name": source.split('\\\\')[-2], "link": source, "website": False} for source in sources_list]
            return {"answer": answer, "sources": sources_list}
        return {"answer": final_result, "sources": []}
    
@app.get("/api/file-content")
async def get_file_content(file_path: str):
    # Ensure the requested file is within the allowed directory
    try:
        file_path = os.path.join(os.path.dirname(__file__), file_path)
        print(file_path)
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        return {"content": content}
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))