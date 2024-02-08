# VoiceMeUp

VoiceMeUp is a React and Node.js project utilizing the fakeyou.ts API for realistic voice emulation and ChatGPT API for character-specific responses. Demonstrating proficiency in frontend, backend, and API integration, the app offers users an engaging and technically sophisticated experience with curated famous personalities.

## Project Structure

This project is divided into two main parts: the backend and the frontend.

### Backend

Located in the `backend/` directory. It's responsible for processing the chat requests and returning the responses.

- `index.js`: This is the entry point of the backend. It sets up the server and routes.
- `chat.js`: This file handles the chat logic. It processes the user's input and generates a response.
- `utils.js`: This file contains utility functions that are used throughout the backend.

### Frontend

Located in the `frontend/` directory. It's responsible for the user interface of the application.

- `src/App.js`: This is the main component of the React application. It renders the chat interface and handles the state of the application.
- `src/Autocomplete.jsx`: This component provides autocomplete functionality for the text input.
- `src/VoiceRequest.jsx`: This component handles the voice input. It uses the Web Speech API to transcribe the user's voice into text.

## Installation

1. Clone the repository: `git clone https://github.com/username/project.git`
2. Navigate to the backend directory: `cd project/backend`
3. Install the backend dependencies: `npm install`
4. Start the backend server: `npm start`
5. In a new terminal, navigate to the frontend directory: `cd ../frontend`
6. Install the frontend dependencies: `npm install`
7. Start the frontend server: `npm start`

## Usage

After starting both the backend and frontend servers, open your browser and navigate to `http://localhost:3000`. You can interact with the chatbot by typing into the text input or by clicking the microphone button and speaking into your microphone.

## Contributing

If you want to contribute to this project, please create a new branch, make your changes, and open a pull request.
