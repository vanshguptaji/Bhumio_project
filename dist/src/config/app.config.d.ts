export interface AppConfig {
    nodeEnv: 'development' | 'production' | 'test';
    port: number;
    corsOrigin: string | string[];
    apiPrefix: string;
    apiVersion: string;
    logLevel: string;
    enableSwagger: boolean;
}
export declare const appConfig: () => AppConfig;
