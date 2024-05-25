from git import Repo
import glob
import os
from splitters import (js_splitter, ts_splitter, md_splitter,txt_splitter)
from langchain_community.document_loaders.generic import GenericLoader
from langchain_community.document_loaders.parsers import LanguageParser
from langchain_community.document_loaders.parsers.txt import TextParser
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

# Constants
persist_directory = "db"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"

#Clone repo
repo_path = "./repo"
repo = Repo.clone_from("https://github.com/ethereum/ethereum-org-website.git", to_path=repo_path)

def does_vectorstore_exist(persist_directory: str) -> bool:
    """
    Checks if vectorstore exists
    """
    if os.path.exists(os.path.join(persist_directory,'chroma.sqlite3')):
        return True
    return False

#Load documents
def process_documents():
    texts = []
    root_dir = "./repo/etherium"
    loader = GenericLoader.from_filesytem(
        root_dir,
        glob="**/*",
        suffixes=[".js", ".ts", ".md",'.txt'],
        parser= [LanguageParser(parser_threshold=500),TextParser()]
    )
    documents = loader.load()
    for doc in documents:
        if doc.metadata['source'][-2:] == "js":
            texts.extend(js_splitter.split_documents([doc]))
        elif doc.metadata['source'][-2:] == "ts":
            texts.extend(ts_splitter.split_documents([doc]))
        elif doc.metadata['source'][-2:] == "md":
            texts.extend(md_splitter.split_documents([doc]))
        elif doc.metadata['source'][-2:] == "txt":
            texts.extend(txt_splitter.create_documents([doc]))
    return texts

#load vectorstore
def loading_vectorstore():
    embedding = HuggingFaceEmbeddings(
        model_name = EMBEDDING_MODEL,
        model_kwargs = {'device': 'cuda:0'},
        encode_kwargs = {'normalize_embeddings': False}
    )
    if does_vectorstore_exist(persist_directory):
        db = Chroma(persist_directory=persist_directory,embedding_function=embedding)
    else:
        print("creating new vectorstore")
        texts = process_documents()
        db = Chroma.from_documents(texts, embedding,persist_directory=persist_directory)
        print("vectorstore created")
    return db

texts = process_documents()