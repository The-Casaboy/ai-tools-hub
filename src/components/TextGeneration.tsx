import { useState } from "react";
import { HfInference } from "@huggingface/inference";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

export const TextGeneration = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!apiKey) {
      toast.error("Please enter your Hugging Face API key first");
      return;
    }

    setIsLoading(true);

    try {
      const hf = new HfInference(apiKey);
      const result = await hf.textGeneration({
        model: 'gpt2',
        inputs: input,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
        },
      });

      setOutput(result.generated_text);
      toast.success("Text generated successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate text');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <Input
          type="password"
          placeholder="Enter your Hugging Face API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="max-w-md mx-auto"
        />
      </div>

      <form onSubmit={handleGenerate} className="space-y-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your prompt..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate Text"}
        </Button>
      </form>

      {output && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <h3 className="font-semibold mb-2">Generated Text:</h3>
          <p className="whitespace-pre-wrap">{output}</p>
        </div>
      )}
    </div>
  );
};