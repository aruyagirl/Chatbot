from fastapi import FastAPI, HTTPException
from Kittybot import generate_branding_snippet, generate_keywords
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
handler = Mangum(app)
Max_input_length = 30 

origins = [
    "http://localhost:3000",
    "https://9e364421f0.execute-api.ap-southeast-2.amazonaws.com/prod",
    "https://kittybot.vercel.app/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": snippet, "keywords": []}

@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    keywords = generate_keywords(prompt)
    keywords_list = keywords.split("\n")  # Split the keywords into a list

    return {"snippet": None, "keywords": keywords_list}

@app.get("/generate_snippet_and_keywords")
async def generate_snippet_and_keywords_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    keywords = generate_keywords(prompt)
    keywords_list = keywords.split("\n")  # Split the keywords into a list

    return {"snippet": snippet, "keywords": keywords_list}

def validate_input_length(prompt: str):
    if len(prompt) >= Max_input_length:
        raise HTTPException(status_code=400, detail=f"Input length is too long. Must be under {Max_input_length} characters."
        )

#uvicorn kittybot_api:app --reload