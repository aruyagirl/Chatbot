'use client'

import React from "react";
import Form from "./form";
import Results from "./results";
import Image from "next/image";
import logo from "../public/kitty.svg"

const KittyBot: React.FC = () => {
    const CHARACTER_LIMIT: number = 30;
    const ENDPOINT: string = "https://9e364421f0.execute-api.ap-southeast-2.amazonaws.com/prod/generate_snippet_and_keywords"; 
    const [prompt, setPrompt] = React.useState("");
    const [snippet, setSnippet] = React.useState("");
    const [keywords, setKeywords] = React.useState([]);
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = () => {
        console.log("Submitting: " + prompt);
        setIsLoading(true);
        fetch(`${ENDPOINT}?prompt=${prompt}`)
            .then((res) => res.json())
            .then(onResult);            
    };

    const onResult = (data: any) => {
        setSnippet(data.snippet);
        setKeywords(data.keywords);
        setHasResult(true);
        setIsLoading(false);
    };

    const onReset = (data: any) => {
        setPrompt("");
        setHasResult(false);
        setIsLoading(false);
    };

    let displayedElement = null;

    if (hasResult) {
        displayedElement = 
        <Results 
        snippet={snippet} 
        keywords={keywords} 
        onBack={onReset} 
        prompt={prompt} 
        />
    } else { 
        displayedElement = 
        <Form prompt={prompt} 
        setPrompt={setPrompt} 
        onSubmit={onSubmit} 
        isLoading={isLoading} 
        characterLimit={CHARACTER_LIMIT} 
        />
    }

    const gradientTextStyle = 
        "text-white text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-rose-400"

    return (
        <>
        <div className= "h-screen flex">
            <div className="mac-w-md mx-auto p-2">
                <div className="bg-slate-600 p-8 rounded-md text-white flex flex-col items-center justify-center">
                    <div className="text-center" my-6>
                        <Image src={logo} width={200} height={5} alt={""}/>
                        <h1 className={" text-3xl font-light w-fit" + gradientTextStyle}>Kittybot</h1>
                        <div className={"mt-6" + gradientTextStyle}>Your AI branding assistant</div>
                    </div>

                    {displayedElement}
                </div>
            </div>
        </div>
        </>
    );
    
};

export default KittyBot;