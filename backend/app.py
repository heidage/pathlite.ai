import os
from openai import AzureOpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from ingest import loading_vectorstore
from dotenv import load_dotenv
import Prompts as prompts

load_dotenv()
endpoint = os.environ["AZURE_OPENAI_ENDPOINT"]
deployment = os.environ["CHAT_COMPLETIONS_DEPLOYMENT_NAME"]
api_key = os.environ["AZURE_OPENAI_API_KEY"]

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

db = loading_vectorstore()
retriever = db.as_retriever(
    search_type="mmr",  # Also test "similarity"
    search_kwargs={"k": 3},
)
print("Retriever loaded")

# token_provider = get_bearer_token_provider(DefaultAzureCredential(), "https://cognitiveservices.azure.com/.default")

client = AzureOpenAI(
    azure_endpoint=endpoint,
    # azure_ad_token_provider=token_provider,
    api_version="2024-02-01",
)

def getDocs(question):
    docs = retriever.invoke(question)
    final_docs = ""
    for doc in docs:
        doc.page_content = doc.page_content.replace("\n\n", " ")
        final_docs += doc.metadata['source']+":\n"+doc.page_content+"\n\n"

    return final_docs

def getAnswerfromGPT(question, context):
    random_delimiters = prompts.generate_random_delimiters(3)
    systemprompt = prompts.CHAT_SYSTEMPROMPT.format(
        organization="pathlite.ai",
        delimiters=random_delimiters,
        number_of_words=os.environ["OPENAI_CHAT_RESPONSE_MAX_TOKENS"],
        sources=context,
    )
    completion = client.chat.completions.create(
        model=deployment,
        messages=[
            {
                "role": "system",
                "content": systemprompt,
            },
            {
                "role": "user",
                "content": prompts.HUMANPROMPT.format(input=question),
            },
        ]
    )

    return completion.choices[0].message.content

@app.post("/getResponse")
async def askGPT(request: Request):
    try:
        data = await request.json()
    except:
        return {"error": "Invalid JSON"}
    
    question = data["question"]
    context = getDocs(question)
    response = getAnswerfromGPT(question, context)
    print(response)
    return {"answer": response}