import os
import openai
import argparse

Max_input_length = 30

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    print(f"User input: {user_input}")
    if validate_length(user_input):
      generate_branding_snippet(user_input)
      generate_keywords(user_input)

    else: 
        raise ValueError(f"Input length is too long. Must be under {Max_input_length}. Submitted input is {user_input}"
        )

def validate_length(prompt: str) -> bool:
    return len(prompt) <= Max_input_length

def generate_keywords(prompt: str) -> str:
    openai.api_key = os.getenv("OPENAI_API_KEY")
    enriched_prompt = f"Generate related branding keywords for {prompt}"
    print(enriched_prompt)

    response = openai.Completion.create(
      model="gpt-3.5-turbo-instruct",
      prompt= enriched_prompt,
      temperature=0.4,
      max_tokens=25,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0.6,
    )

    #Extract ouput text
    keywords_text: str = response['choices'][0]['text']

    #strip whitespace
    keywords_text = keywords_text.strip()
      
    print(f"Keywords: {keywords_text}")

    return(keywords_text)

def generate_branding_snippet(prompt: str) -> str:
    openai.api_key = os.getenv("OPENAI_API_KEY")

    enriched_prompt = f"Generate upbeat branding snippet for {prompt}"
    print(enriched_prompt)

    response = openai.Completion.create(
      model="gpt-3.5-turbo-instruct",
      prompt= enriched_prompt,
      temperature=0.9,
      max_tokens=25,
      top_p=1,
      frequency_penalty=0,
      presence_penalty=0.6,
    )

    #Extract ouput text
    branding_text: str = response['choices'][0]['text']

    #strip whitespace
    branding_text = branding_text.strip()
    
    #Add ... to truncated statements
    last_char = branding_text[-1]
    if last_char not in (",", "!", "?"):
        branding_text+= "..."

    print(f"Snippet: {branding_text}")

    return(branding_text)

if __name__ == "__main__":
    main()


