import React, {useState} from "react";
import ChatInput from "./ChatInput";
import ChatHistory from "./ChatHistory";

type Message = {
    message: string;
    isUser: boolean;
    sources?: { name: string; link: string }[];
};

export default function ChatContainer() {
    const [history, setHistory] = useState<Message[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    return (
        <>
            <ChatHistory history={history} setHistory={setHistory} setLoading={setLoading}/>
            <ChatInput setHistory={setHistory} isLoading={isLoading}/>
        </>
    )
}