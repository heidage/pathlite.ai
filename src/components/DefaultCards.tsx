import React from "react";

type Props = {
    icon: React.ReactNode;
    title: string;
}
export default function DefaultCards({icon, title}: Props) {
    return (
        <div className="grid grid-rows-1 p-6 bg-black border border-gray-700 backdrop-blur-md rounded-lg shadow-lg hover:bg-gray-800 transition duration-300" style={{"width": "250px"}}>
            <div className="text-lg mr-4">{icon}</div>
            <div className="text-sm text-white">{title}</div>
        </div>
    )
}