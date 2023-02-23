export interface Login {
  userName: string,
  password: string,
}

export interface LoginResponse extends Login{
  accessToken?: string;
}