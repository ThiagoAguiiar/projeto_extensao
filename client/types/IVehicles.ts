export interface IGetVehicle {
    placa: string;
    idCliente: number;
    nomeProp: string;
    modelo: string;
    ano: number;
    frota: string;
    motor: string;
  }
  
  export interface IPostVehicle {
    idCliente: number;
    nomeProp: string;
    placa: string;
    modelo: string;
    ano: number;
    frota: string;
    motor: string;
  }
  
  export interface IPutVehicle {
    idCliente: number;
    placa: string;
    modelo: string;
    ano: number;
    frota: string;
    motor: string;
  }
  