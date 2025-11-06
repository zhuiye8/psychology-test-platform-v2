// Authentication related types

export interface Teacher {
  id: string;
  username: string;
  email: string;
  name: string;
  avatar?: string;
  phoneNumber?: string;
  department?: string;
  title?: string;
  isActive: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: Teacher;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: {
    statusCode: number;
    message: string[];
    timestamp: string;
    path: string;
    method: string;
  };
}