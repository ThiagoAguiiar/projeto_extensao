export interface IGetVehicle {
    dataCricao: string;
    placa: string;
    idCliente: number;
    modelo: string;
    ano: string;
    token: string;
    frota: string;
  }
  
  export interface IPostVehicle {
    placa: string;
    modelo: string;
    ano: string;
    frota: string;
  }
  
  export interface IPutVehicle {
    placa: string;
    modelo: string;
    ano: string;
    frota: string;
  }
  