# PDF Document Q&A Assistant

## Description

The PDF Document Q&A Assistant is a web application that allows users to upload PDF documents and ask questions about their content. The application uses advanced natural language processing (NLP) techniques to provide accurate answers based on the document's content. The backend is built with FastAPI, and the frontend is a React application.

## Features

- **Upload PDF Documents**: Users can upload PDF files to the system.
- **Ask Questions**: Users can ask questions related to the uploaded PDF documents.
- **Select API**: Option to choose backend API (standard chain and LangGraph workflow) for answering questions.
- **Real-time Progress**: Shows real-time progress during file upload and processing.
- **Responsive Design**: The frontend is fully responsive and works on all devices.

## Technologies Used

### Backend

- **FastAPI**: A modern, fast (high-performance) web framework for building APIs with Python.
- **LangChain**: A framework for developing applications powered by language models.
- **Google Generative AI**: For using Google's Gemini model for NLP tasks.
- **FAISS**: For efficient similarity search and clustering of dense vectors.
- **PyPDFLoader**: For loading and processing PDF documents.
- **Uvicorn**: For serving the FastAPI application.

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **Axios**: For making HTTP requests to the backend.
- **React Icons**: For using icons in the UI.
- **SweetAlert2**: For displaying beautiful alerts and notifications.
- **Flowbite**: For UI components and theming.
- **Tailwind CSS**: For styling the application.

## Installation

### Prerequisites

- Node.js and npm (for frontend)
- Python 3.8+ (for backend)
- Google API Key (for using Google Generative AI)

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name/frontend
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```
### Backend Setup

1. Navigate to the backend directory:
    ```bash
    cd your-repo-name/backend
    ```

2. Create a virtual environment:
    ```bash
    python -m venv .venv
    ```

3. Activate the virtual environment:

    - On Windows:
        ```bash
        .venv\Scripts\activate
        ```

    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```

4. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

5. Set up environment variables:
    Create a .env file in the backend directory and add your Google API key:
    ```bash
    GOOGLE_API_KEY=your_google_api_key
    ```

6. Start the FastAPI server:
    ```bash
    uvicorn app.main:app --reload
    ```

## Usage

- **Upload a PDF:** Click on the upload area or drag and drop a PDF file.

- **Ask Questions:** Once the PDF is uploaded, you can start asking questions related to the document.

- **Switch Backend API:** Use the dropdown to switch between the standard chain and LangGraph workflow models.

- **End Session:** Click on "End Session" to clear the current session and upload a new document.

## API Endpoints

### Backend API

- **POST /upload:** Upload a PDF file.
    Request: `file` (PDF file)
    Response: `session_id`, `filename`

- **POST /ask:** Ask a question using the standard chain.
    Request: `session_id`, `question`
    Response: `answer`, `source_documents`

- **POST /ask_with_graph:** Ask a question using the LangGraph workflow.
    Request: `session_id`, `question`
    Response: `answer`, `source_documents`, `message_history`

- **DELETE /session/{session_id}:** Delete a session and associated files.
    Response: `message`