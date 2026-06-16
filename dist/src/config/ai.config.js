"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiConfig = void 0;
const aiConfig = () => {
    return {
        ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
        ollamaModel: process.env.OLLAMA_MODEL || 'qwen3:8b',
        ollamaTimeout: parseInt(process.env.OLLAMA_TIMEOUT || '300000'),
        enableCaching: process.env.AI_ENABLE_CACHING !== 'false',
    };
};
exports.aiConfig = aiConfig;
//# sourceMappingURL=ai.config.js.map