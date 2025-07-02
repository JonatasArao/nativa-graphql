export enum Role {
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export interface User {
	id: string;
	email: string;
	name: string;
  role: Role;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthPayload {
  token: string;
  user: User;
}