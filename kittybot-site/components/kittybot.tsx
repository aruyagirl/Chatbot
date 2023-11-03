'use client'

import React from "react";
import Form from "./form";
import Results from "./results";

export const handler = async (event: any) => {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "https://kittybot.vercel.app",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
  };

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

    return (
        <>
            <h1>Kittybot!</h1>
            {displayedElement}
        </> 
    );
};

export default KittyBot;