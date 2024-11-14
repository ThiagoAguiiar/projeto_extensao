export interface IGetUser {
  dataCricao: string;
  email: string;
  idUsuario: number;
  nome: string;
  senha: string;
  token: string;
  telefone: string;
  ativo: boolean;
  ultimoLogin: null | Date;
}

export interface IPostUser {
  email: string;
  nome: string;
  senha: string;
  telefone: string;
  ativo: boolean;
}

export interface IPutUser {
  email: string;
  idUsuario: number;
  nome: string;
  telefone: string;
  ativo: boolean;
}
