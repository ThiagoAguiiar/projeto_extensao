export interface IGetPart {
    idPeca: number;
    nome: string;
    quantidade: number;
    valor: number;
  }
  
  export interface IPostPart {
    nome: string;
    quantidade: number;
    valor: number;
  }
  
  export interface IPutPart {
    idPeca: number;
    nome: string;
    quantidade: number;
    valor: number;
  }
  