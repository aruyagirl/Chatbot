interface ResultsProps {
    prompt: string;
    snippet: string;
    keywords: string[];
    onBack: any;
}

const Results: React.FC<ResultsProps> = (props) => {
    const keywordElements = [];
    for (let i = 0; i < props.keywords.length; i++) {
        const element = <div key={i} className="bg-pink-200 text-pink-700 p-1 px-2 text-sm rounded-md flex flex-wrap">{props.keywords[i]}</div>;
        keywordElements.push(element);
    }

    const keywordElementsHolder = <div className="gap-2">{keywordElements}</div>;

    const resultSection = (label: string, body: any) => {
        return (
            <div className="bg-slate-700 p-4 my-3 rounded-md">
                <div className="text-slate-400 text- rounded-md font-bold mb-4">{label}</div>
                <div>{body}</div>
            </div>
        );
    };

    return (
        <>
            <div className="mb-6">
                {resultSection(
                    "Prompt", 
                    <div className="text-lg font-bold">{props.prompt}</div>
                )}
                {resultSection("Branding Snippet", props.snippet)}
                {resultSection("Keywords", keywordElements)}
            </div>
        <button 
            className="bg-gradient-to-r from-rose-200 to-rose-400 rounded-md w-1/4 mx-auto p-2 hover:opacity-75"
            onClick={props.onBack}>
            Back
        </button>
        </>
    );
}; 

    export default Results;