const MODELS: Record<string, { maxTokens: number, description: string }> = {
  'meta-llama/Llama-2-7b-chat-hf': {
    maxTokens: 4096,
    description: 'Meta LLaMA 2 - 7B Chat model from Hugging Face, good for general dialogue'
  },
  'mistralai/Mistral-7B-Instruct-v0.2': {
    maxTokens: 8192,
    description: 'Mistral 7B Instruct, lightweight and strong for instruction following'
  },
  'deepseek-ai/deepseek-math-7b-instruct': {
    maxTokens: 8192,
    description: 'DeepSeek Math 7B - powerful for solving complex math and reasoning tasks'
  },
  'google/gemma-7b-it': {
    maxTokens: 8192,
    description: 'Google Gemma 7B Instruction Tuned - ideal for helpful and aligned conversation'
  }
};

