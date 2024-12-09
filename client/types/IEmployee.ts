export interface IGetEmployee {
  dataCriacao: Date;
  email: string;
  idFuncionario: number;
  nome: string;
  senha: string;
  token: string;
  telefone: string;
  ativo: boolean;
  ultimoLogin: null | Date;
}

export interface IPostEmployee {
  email: string;
  nome: string;
  senha: string;
  telefone: string;
  ativo: boolean;
}

export interface IPutEmployee {
  email: string;
  idFuncionario: number;
  nome: string;
  telefone: string;
  ativo: boolean;
}
