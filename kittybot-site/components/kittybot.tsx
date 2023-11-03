'use client'

import React from "react";
import Form from "./form";
import Results from "./results";

const allowCors = (fn: { (req: any, res: any): void; (arg0: any, arg1: any): any; }) => async (req: { method: string; }, res: { setHeader: (arg0: string, arg1: string | boolean) => void; status: (arg0: number) => { (): any; new(): any; end: { (): void; new(): any; }; }; }) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return await fn(req, res)
  }
  
  const handler = (req: any, res: { end: (arg0: string) => void; }) => {
    const d = new Date()
    res.end(d.toString())
  }
  
  module.exports = allowCors(handler)
  

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