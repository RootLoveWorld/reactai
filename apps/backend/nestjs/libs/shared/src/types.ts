// Environment types
export type Environment = 'development' | 'production' | 'test';

// Service types
export type ServiceName = 'AUTH_SERVICE' | 'USER_SERVICE' | 'CHAT_SERVICE';

// Database types
export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

// JWT types
export interface JwtConfig {
  secret: string;
  expiresIn: string;
  refreshSecret: string;
  refreshExpiresIn: string;
}

// Redis types
export interface RedisConfig {
  host: string;
  port: number;
  password?: string;
}

// Microservice configuration types
export interface MicroserviceConfig {
  name: string;
  port: number;
  host?: string;
  transport?: 'TCP' | 'REDIS' | 'MQTT' | 'NATS';
}

// API Response types
export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
  timestamp?: string;
};

// WebSocket types
export type SocketEventHandler = (data: any) => void | Promise<void>;

export interface SocketEventMap {
  [event: string]: SocketEventHandler;
}

// Pagination types
export interface PaginationOptions {
  page: number;
  limit: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}

// Error types
export interface CustomError extends Error {
  statusCode?: number;
  code?: string;
}

// Utility types
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export type Required<T> = {
  [P in keyof T]-?: T[P];
};

export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// Entity status types
export type EntityStatus = 'ACTIVE' | 'INACTIVE' | 'DELETED';

// Message types for microservices
export type MessagePattern = string;

export interface MessagePayload<T = any> {
  pattern: MessagePattern;
  data: T;
}