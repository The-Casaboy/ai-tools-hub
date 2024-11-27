import { useState, useEffect } from "react";
import { HfInference } from "@huggingface/inference";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const DevAssistant = () => {
  const [input, setInput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('devAssistantMessages');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('devAssistantMessages', JSON.stringify(messages));
  }, [messages]);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!apiKey) {
      toast.error("Please enter your Hugging Face API key first");
      return;
    }

    setIsLoading(true);
    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    try {
      const formattedApiKey = apiKey.startsWith('hf_') ? apiKey : `hf_${apiKey}`;
      const hf = new HfInference(formattedApiKey);
      
      const result = await hf.textGeneration({
        model: 'Qwen/Qwen2.5-Coder-32B-Instruct',
        inputs: `<|im_start|>user
${input}
<|im_end|>
<|im_start|>assistant
`,
        parameters: {
          max_new_tokens: 512,
          temperature: 0.7,
          top_p: 0.95,
          top_k: 50,
          repetition_penalty: 1.1,
          return_full_text: false,
        },
      });

      const assistantMessage: Message = { 
        role: "assistant", 
        content: result.generated_text 
      };
      setMessages([...newMessages, assistantMessage]);
      toast.success("Response generated successfully!");
    } catch (error) {
      console.error('Hugging Face API Error:', error);
      toast.error(
        error instanceof Error 
          ? `API Error: ${error.message}` 
          : 'Failed to generate text. Please check your API key and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <label htmlFor="api-key" className="block text-sm font-medium mb-2">
          Hugging Face API Key
        </label>
        <Input
          id="api-key"
          type="password"
          placeholder="Enter your Hugging Face API key (starts with 'hf_')"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="max-w-md"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Your API key should start with 'hf_'. You can find it in your Hugging Face account settings.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              message.role === "user"
                ? "bg-primary text-primary-foreground ml-12"
                : "bg-muted mr-12"
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium mb-2">
            Your Prompt
          </label>
          <Input
            id="prompt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your prompt..."
            disabled={isLoading}
          />
        </div>
        
        <Button type="submit" disabled={isLoading || !apiKey}>
          {isLoading ? "Generating..." : "Generate Text"}
        </Button>
      </form>
    </div>
  );
};