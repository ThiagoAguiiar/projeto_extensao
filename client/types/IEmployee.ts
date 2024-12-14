export interface IGetEmployee {
  email: string;
  idFuncionario: number;
  nome: string;
  especializacao: string;
  dataContratacao: string;
  dataDemissao: string;
  senha: string;
  token: string;
  telefone: string;
  ativo: boolean;
  ultimoLogin: null | Date;
}

export interface IPostEmployee {
  email: string;
  nome: string;
  especializacao: string;
  dataContratacao: string;
  senha: string;
  telefone: string;
  ativo: boolean;
  dataCriacao: Date
}

export interface IPutEmployee {
  email: string;
  idFuncionario: number;
  nome: string;
  especializacao: string;
  telefone: string;
  ativo: boolean;
}
