// Service for making API calls to the backend

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// process user input, returning RAG enhanced gpt response
export async function processQuery(query) {
  //TODO: make safer by using express body handler type package
  const response = await fetch(`${API_URL}/query/text`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error('Couldn\'t get a response!');
  }

  return response.json();
}

// generate image based on written output
export async function generateImage(query, context) {
  const { red_response, blue_response } = context;
  const response = await fetch(`${API_URL}/query/image`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, red_context: red_response, blue_context: blue_response }),
  });

  if (!response.ok) {
    throw new Error('Couldn\'t get a response!');
  }

  return response.json();
}