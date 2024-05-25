from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.text_splitter import Language

js_splitter = RecursiveCharacterTextSplitter.from_language(
    language = Language.JS, chunk_size=1000, chunk_overlap=200
)
ts_splitter = RecursiveCharacterTextSplitter.from_language(
    language = Language.TS, chunk_size=1000, chunk_overlap=200
)
md_splitter = RecursiveCharacterTextSplitter.from_language(
    language = Language.MARKDOWN, chunk_size=1000, chunk_overlap=200
)