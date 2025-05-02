# Blog Agent

## Description
Blog Agent is a Node.js application that leverages AI and various APIs to generate and manage blog content. It includes a backend server using Express and integrates with Google Generative AI, among other tools.

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd blog_agent_1
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create a `.env` file in the root directory and add necessary environment variables.

## Usage
Start the server with:
```
npm start
```
The server runs with experimental specifier resolution enabled.

## Scripts
- `npm start`: Starts the Node.js server.

## Project Structure
- `server.js`: Main server entry point.
- `db.js`: Database connection and configuration.
- `index.js`: Main application logic.
- `imageGenerator.js`: Module for image generation.
- `listModels.js`: Module to list AI models.
- `prompts/`: Directory containing prompt templates.
- `frontend/`: Frontend React application.
- `exports/`: Exported markdown documentation files.

## Dependencies
- express
- cors
- dotenv
- body-parser
- markdown-it
- @google/generative-ai

## Contributing
Contributions are welcome. Please open issues or submit pull requests for improvements.
