import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { InferenceClient } from "@huggingface/inference";
import {
  Textarea,
  Button,
  Container,
  Paper,
  Title,
  Text,
  MantineProvider,
} from "@mantine/core";
import "@mantine/core/styles.css";

const Chatbot = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiKey = import.meta.env.VITE_HUGGINGFACE_API_KEY;
    const client = new InferenceClient(apiKey);

    try {
      const result = await client.summarization({
        model: "sshleifer/distilbart-cnn-12-6",
        inputs: input,
        provider: "hf-inference",
      });

      setResponse(result?.summary_text || "No response");
    } catch (error) {
      console.error(error);
      setResponse("Error fetching response");
    }
  };

  return (
    <Container size="sm" style={{ fontFamily: "sans-serif" }}>
      <Title align="center" mb="lg">
        Hugging Face Text Generation Demo
      </Title>
      <Paper shadow="xs" p="md" withBorder>
        <form onSubmit={handleSubmit}>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type text you want to summarize here..."
            autosize
            minRows={4}
            mb="md"
          />
          <Button
            type="submit"
            fullWidth
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
          >
            Send
          </Button>
        </form>
      </Paper>
      {response && (
        <Paper shadow="xs" p="md" mt="lg" withBorder>
          <Title order={3} mb="sm">
            Response:
          </Title>
          <Text color="dimmed">
            <ReactMarkdown>{response}</ReactMarkdown>
          </Text>
        </Paper>
      )}
    </Container>
  );
};

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "light" }}
    >
      <Chatbot />
    </MantineProvider>
  );
}

export default App;
