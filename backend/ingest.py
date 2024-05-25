from git import Repo
import glob
from splitters import (js_splitter, ts_splitter, md_splitter)
from langchain_community.document_loaders.generic import GenericLoader
from langchain_community.document_loaders.parsers import LanguageParser
from langchain_community.document_loaders.parsers.txt import TextParser
#Clone repo
repo_path = "./repo"
repo = Repo.clone_from("https://github.com/ethereum/ethereum-org-website.git", to_path=repo_path)

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
    return texts


texts = process_documents()