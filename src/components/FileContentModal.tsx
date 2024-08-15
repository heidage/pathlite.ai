import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type FileContentModalProps = {
    source: { name: string; content: string; file: string };
    onClose: () => void;
};

const ButtonLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to} className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
        {children}
    </a>
);
const InfoBanner = ({ children, emoji, shouldSpaceBetween }: { children: React.ReactNode; emoji?: string; shouldSpaceBetween?: boolean }) => (
    <div className={`bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 my-4 ${shouldSpaceBetween ? 'flex justify-between items-center' : ''}`}>
        {emoji && <span className="mr-2">{emoji}</span>}
        {children}
    </div>
);

export default function FileContentModal({ source, onClose }: FileContentModalProps) {
    const fileExtension = source.file.split('.').pop()?.replace("'",'') || '';
    const renderContent = () => {
        if (fileExtension === 'md') {
            return (
                <div className="markdown-content">
                    <ReactMarkdown components={{
                        a: ({ href, children }) => <ButtonLink to={href || ''}>{children}</ButtonLink>,
                        div: ({ children, ...props }) => <InfoBanner {...props}>{children}</InfoBanner>
                    }}>{source.content}</ReactMarkdown>
                </div>
            );
        } else if (['js','ts'].includes(fileExtension)) {
            return (
                <SyntaxHighlighter language={fileExtension} style={dark}>
                    {source.content}
                </SyntaxHighlighter>
            );
        } else {
            return <pre className="text-white whitespace-pre-wrap">{source.content}</pre>;
        }
    }
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-gray-800 rounded-lg p-6 w-11/12 max-w-4xl max-h-[85vh] overflow-y-auto z-10">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-white hover:text-gray-300 text-3xl"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <h2 className="text-white text-lg font-bold mb-4">{source.name}</h2>
                <div className="overflow-y-auto max-h-[70vh] scrollbar-custom">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}