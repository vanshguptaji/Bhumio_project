export interface AIConfig {
    ollamaBaseUrl: string;
    ollamaModel: string;
    ollamaTimeout: number;
    enableCaching: boolean;
}
export declare const aiConfig: () => AIConfig;
