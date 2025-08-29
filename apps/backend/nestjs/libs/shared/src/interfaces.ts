// User Interfaces
export interface IUser {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUserRequest {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface IUpdateUserRequest {
  email?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
}

// Auth Interfaces
export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface IJwtPayload {
  sub: string;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}

export interface ITokenValidationRequest {
  token: string;
}

export interface ITokenValidationResponse {
  valid: boolean;
  payload?: IJwtPayload;
}

// Chat Interfaces
export interface IChatRoom {
  id: string;
  name: string;
  description?: string;
  isPrivate: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  id: string;
  content: string;
  chatRoomId: string;
  userId: string;
  user?: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateRoomRequest {
  name: string;
  description?: string;
  isPrivate?: boolean;
  createdBy: string;
}

export interface ISendMessageRequest {
  content: string;
  chatRoomId: string;
  userId: string;
}

export interface IJoinRoomRequest {
  roomId: string;
  userId: string;
}

export interface ILeaveRoomRequest {
  roomId: string;
  userId: string;
}

// Response Interfaces
export interface IServiceResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IPaginatedResponse<T = any> {
  success: boolean;
  message: string;
  data: T[];
  meta: IPaginationMeta;
}

// WebSocket Interfaces
export interface ISocketUser {
  id: string;
  socketId: string;
  user: IUser;
}

export interface ISocketMessage {
  event: string;
  data: any;
  room?: string;
  userId?: string;
}