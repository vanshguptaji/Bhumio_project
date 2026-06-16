export interface AIConfig {
  ollamaBaseUrl: string;
  ollamaModel: string;
  ollamaTimeout: number;
  enableCaching: boolean;
}

export const aiConfig = (): AIConfig => {
  return {
    ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
    ollamaModel: process.env.OLLAMA_MODEL || 'qwen3:8b',
    ollamaTimeout: parseInt(process.env.OLLAMA_TIMEOUT || '300000'), // 5 minutes
    enableCaching: process.env.AI_ENABLE_CACHING !== 'false',
  };
};
