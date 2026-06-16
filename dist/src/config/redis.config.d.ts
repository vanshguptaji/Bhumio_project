export interface RedisConfig {
    host: string;
    port: number;
    password?: string;
    db?: number;
    retryStrategy?: (times: number) => number;
    enableReadyCheck?: boolean;
    enableOfflineQueue?: boolean;
    maxRetriesPerRequest?: number;
}
export declare const redisConfig: () => RedisConfig;
