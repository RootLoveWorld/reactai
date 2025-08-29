// Microservice Names
export const SERVICE_NAMES = {
  AUTH_SERVICE: 'AUTH_SERVICE',
  USER_SERVICE: 'USER_SERVICE',
  CHAT_SERVICE: 'CHAT_SERVICE',
} as const;

// Message Patterns for Microservices
export const MESSAGE_PATTERNS = {
  // Auth Service
  AUTH: {
    LOGIN: 'auth.login',
    REGISTER: 'auth.register',
    VALIDATE_TOKEN: 'auth.validate_token',
    REFRESH_TOKEN: 'auth.refresh_token',
    LOGOUT: 'auth.logout',
  },
  // User Service
  USER: {
    CREATE: 'user.create',
    FIND_BY_ID: 'user.find_by_id',
    FIND_BY_EMAIL: 'user.find_by_email',
    UPDATE: 'user.update',
    DELETE: 'user.delete',
    FIND_ALL: 'user.find_all',
  },
  // Chat Service
  CHAT: {
    CREATE_ROOM: 'chat.create_room',
    JOIN_ROOM: 'chat.join_room',
    LEAVE_ROOM: 'chat.leave_room',
    SEND_MESSAGE: 'chat.send_message',
    GET_MESSAGES: 'chat.get_messages',
    GET_ROOMS: 'chat.get_rooms',
  },
} as const;

// WebSocket Events
export const WS_EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  MESSAGE: 'message',
  NEW_MESSAGE: 'new_message',
  USER_JOINED: 'user_joined',
  USER_LEFT: 'user_left',
  ERROR: 'error',
} as const;

// HTTP Status Messages
export const STATUS_MESSAGES = {
  SUCCESS: 'Success',
  CREATED: 'Created successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Forbidden access',
  BAD_REQUEST: 'Bad request',
  INTERNAL_ERROR: 'Internal server error',
} as const;

// Validation Messages
export const VALIDATION_MESSAGES = {
  EMAIL_INVALID: 'Email format is invalid',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
  PASSWORD_REQUIRED: 'Password is required',
  EMAIL_REQUIRED: 'Email is required',
  NAME_REQUIRED: 'Name is required',
  ID_REQUIRED: 'ID is required',
} as const;