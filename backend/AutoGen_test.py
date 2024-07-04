import os
import string
import random
import json
from typing import List
import chromadb
from azure.core.credentials import AzureNamedKeyCredential, AzureKeyCredential

from autogen import Cache        
from autogen.agentchat.contrib.retrieve_user_proxy_agent import RetrieveUserProxyAgent
from autogen.agentchat.contrib.retrieve_assistant_agent import RetrieveAssistantAgent
from langchain_openai import AzureChatOpenAI

from dotenv import load_dotenv

from ingest import process_documents

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
    "max_tokens": 200,
}

assistant = RetrieveAssistantAgent(
    name="assistant",
    system_message="",
    llm_config = LLM_CONFIG,
)

azure_proxy = RetrieveUserProxyAgent(
    name="ragproxyagent",
    human_input_mode="NEVER",
    retrieve_config = {
        "task": "default",
        "vector_db": None,
        "client": chromadb.PersistentClient(),
        "collection_name": "ethereum",
        "embedding_model": "all-MiniLM-L6-v2",
        "chunk_token_size": 2000,
        "custom_text_types": ["md", "js", "ts","md","txt"],
        "overwrite": False,
        "model": "gpt-35-turbo",
    }
)

assistant.reset()

with Cache.redis(redis_url="redis://localhost:6379/0") as cache:
    azure_proxy.initiate_chat(assistant, message=azure_proxy.message_generator, problem="How do I create a wallet", cache=cache)

