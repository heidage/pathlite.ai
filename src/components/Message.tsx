import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import React, {useState} from "react";
import FileContentModal from "./FileContentModal";

type Props = {
    message: string;
    isUser: boolean;
    sources?: { name: string; link: string; website: boolean }[],
};

export default function Message({message, isUser, sources}: Props) {
    const [selectedSource, setSelectedSource] = useState<{ name: string; content: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const fetchFileContent = async (link: string) => {
        const response = await fetch(`/api/file-content?path=${encodeURIComponent(link)}`);
        const content = await response.text();
        return content
    }

    return (
    <div className="border-b border-gray-700 w-11/12 mx-auto p-4 flex gap-3">
        <div className="flex-shrink-0">
            {
                isUser ? (
                    <div className="flex items-center justify-center w-8 h-8 bg-gray-900 border border-gray-700 rounded-md">
                        <FontAwesomeIcon icon={faUser} className="text-white" />
                    </div>
                ) 
                : <Image 
                    src={require('../../public/images/Pathlite.ai Brand Mark.png')} 
                    alt="robot" 
                    width={30} 
                    height={30} 
                    className="rounded-full border-2 border-gray-500"
                    />
            }
        </div>
        <div className="flex-grow">
            <div className="text-white" style={{ whiteSpace: 'pre-wrap' }}>
                {message}
            </div>
            {sources && sources.length > 0 && (
                <div className="mt-2">
                    <div className="text-gray-400 text-sm">Sources:</div>
                    <ul className="mt-1 flex flex-wrap gap-2">
                        {sources.map((source, index) => (
                            <li key={index} className="flex-shrink-0">
                                <div className="bg-gray-800 rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow duration-300 w-full sm:w-auto sm:max-w-[200px]">
                                    {source.website? (
                                        <a
                                            href={source.link}
                                            className="text-blue-400 hover:text-blue-300 font-medium block text-sm"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {source.name}
                                        </a>
                                    ) : (
                                        <button
                                            onClick={async () => {
                                                const content = await fetchFileContent(source.link);
                                                setSelectedSource({ name: source.name, content });
                                                setIsModalOpen(true);
                                            }}
                                            className="text-blue-400 hover:text-blue-300 font-medium block text-sm"
                                        >
                                            {source.name}
                                        </button>
                                    )}
                                    <p className="text-gray-400 text-xs mt-1 truncate">
                                        {source.link}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        {selectedSource && (
            <FileContentModal
                source={selectedSource}
                onClose={() => {
                    setSelectedSource(null);
                    setIsModalOpen(false);
                }}
            />
        )}
    </div>
    );
}