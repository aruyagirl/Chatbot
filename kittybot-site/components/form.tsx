interface FormProps {
    prompt: string;
    setPrompt: any;
    onSubmit: any;
    isLoading: boolean;
    characterLimit: number;
}

const Form: React.FC<FormProps> = (props) => {
    const isPromptValid = props.prompt.length < props.characterLimit;
    const updatePromptValue = (text: string) => {
        if (text.length <= props.characterLimit) {
            props.setPrompt(text);
        }
    };

    let statusColor = "text-slate-500";
    let statusText = null;
    if (!isPromptValid) {
        statusColor = "text-red-400";
        statusText = `Input must be less than ${props.characterLimit} characters.`
    }

    return (
        <>
            <div className="mb-6 mt-7 text-slate-300">
                <p>
                    Tell me what your brand is about and I will generate copy and keywords for you.
                </p>
            </div>

            <input 
                className="p-2 w-full rounded-md focus:outline-rose-300 text-slate-700"
                type="text" 
                placeholder="cats" 
                value={props.prompt}
                onChange={(e) => updatePromptValue(e.currentTarget.value)}
            ></input>
            <div className={statusColor + " flex justify-between my-2 text-s w-full mb-6"}>
                <div> {statusText} </div>
                <div >
                    {props.prompt.length}/{props.characterLimit}
                </div>
            </div>
            <button 
                className="bg-gradient-to-r from-rose-200 to-rose-400 disabled:opacity-50 rounded-md w-1/4 mx-auto p-2 hover:opacity-75"
                onClick={props.onSubmit} 
                disabled ={props.isLoading || !isPromptValid}>
                Submit
            </button> 
        </>
    );
}; 

export default Form;