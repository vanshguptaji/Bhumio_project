export interface AppConfig {
  nodeEnv: 'development' | 'production' | 'test';
  port: number;
  corsOrigin: string | string[];
  apiPrefix: string;
  apiVersion: string;
  logLevel: string;
  enableSwagger: boolean;
}

export const appConfig = (): AppConfig => {
  const nodeEnv = (process.env.NODE_ENV || 'development') as
    | 'development'
    | 'production'
    | 'test';

  return {
    nodeEnv,
    port: parseInt(process.env.PORT || '3000'),
    corsOrigin: process.env.CORS_ORIGIN || '*',
    apiPrefix: process.env.API_PREFIX || '/api',
    apiVersion: process.env.API_VERSION || 'v1',
    logLevel: process.env.LOG_LEVEL || 'debug',
    enableSwagger: process.env.ENABLE_SWAGGER !== 'false',
  };
};
