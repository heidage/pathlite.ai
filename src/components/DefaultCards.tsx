import React from "react";
import { addMessage, showMessages } from "@/store";

type Props = {
    icon: React.ReactNode;
    title: string;
    setHistory: React.Dispatch<React.SetStateAction<any[]>>;
}
export default function DefaultCards({icon, title, setHistory}: Props) {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        addMessage({message: title, isUser: true});
        setHistory(showMessages());
    };

    return (
        <div className="grid grid-rows-1 p-6 bg-black border border-gray-700 backdrop-blur-md rounded-lg shadow-lg hover:bg-gray-800 transition duration-300" style={{"width": "250px"}} onClick={handleClick}>
            <div className="text-lg mr-4">{icon}</div>
            <div className="text-sm text-white">{title}</div>
        </div>
    )
}