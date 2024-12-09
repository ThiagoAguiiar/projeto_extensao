export interface IGetClient {
  dataCriacao: Date;
  email: string;
  idCliente: number;
  nome: string;
  telefone: string;
  endereco: string;
  //ativo: boolean;
  //ultimoLogin: null | Date;
}

export interface IPostClient {
  email: string;
  nome: string;
  telefone: string;
  endereco: string;
  //ativo: boolean;
}

export interface IPutClient {
  idCliente: number;
  email: string;
  nome: string;
  telefone: string;
  endereco: string;
  //ativo: boolean;
}
