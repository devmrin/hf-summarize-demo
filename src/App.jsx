import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { InferenceClient } from "@huggingface/inference";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setIsLoading(true);

    const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    const client = new InferenceClient(apiKey);

    try {
      const result = await client.summarization({
        model: "sshleifer/distilbart-cnn-12-6",
        inputs: input.trim(),
        provider: "hf-inference",
      });

      setResponse(result?.summary_text || "No response");
    } catch (error) {
      console.error(error);
      setResponse("Error fetching response");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center" style={{ marginBottom: "2rem" }}>
        Hugging Face Text Summarization
      </h2>
      <div className="row">
        <div className="twelve columns">
          <form onSubmit={handleSubmit}>
            <textarea
              className="u-full-width"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type text you want to summarize here..."
              style={{ minHeight: "150px", marginBottom: "1rem" }}
            />
            <button
              type="submit"
              className="button-primary u-full-width"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Send"}
            </button>
          </form>
        </div>
      </div>
      {response && (
        <div className="row" style={{ marginTop: "2rem" }}>
          <div className="twelve columns">
            <h4>Response:</h4>
            <div className="response-content">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function App() {
  return <Chatbot />;
}

export default App;
