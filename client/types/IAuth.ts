export interface ILogin {
  token: string;
}

export interface IDecodeToken {
  email: string;
  exp: number;
  iat: number;
  id: number;
  nome: string;
}
