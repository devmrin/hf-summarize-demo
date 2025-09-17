# Hugging Face Summarization Demo

This project demonstrates text summarization using Hugging Face's inference API integrated with React and Mantine for a modern UI.

## Features

- **Text Summarization**: Enter text in the form, and the app summarizes it using the Hugging Face model `sshleifer/distilbart-cnn-12-6`.
- **Modern UI**: Built with Mantine components for a responsive and visually appealing interface.
- **React Integration**: Powered by React and Vite for fast development and hot module replacement.

## Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Add your Hugging Face API key to the `.env` file:
   ```env
   VITE_HUGGINGFACE_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```

## Usage

- Open the app in your browser.
- Type or paste text into the textarea.
- Click "Send" to get the summarized response.

## Technologies Used

- **React**: Frontend framework.
- **Mantine**: UI components.
- **Hugging Face Inference API**: Text summarization.
- **Vite**: Build tool.

## License

This project is licensed under the MIT License.
