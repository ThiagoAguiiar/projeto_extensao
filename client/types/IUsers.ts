export interface IGetClient {
  dataCriacao: Date;
  email: string;
  idCliente: number;
  nome: string;
  telefone: string;
  endereco: string;
}

export interface IPostClient {
  email: string;
  nome: string;
  telefone: string;
  endereco: string;
}

export interface IPutClient {
  idCliente: number;
  email: string;
  nome: string;
  telefone: string;
  endereco: string;
}
