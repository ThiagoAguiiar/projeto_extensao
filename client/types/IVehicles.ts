export interface IGetVehicle {
    placa: string;
    idCliente: number;
    modelo: string;
    ano: string;
    frota: string;
    cor: string;
    motor: string;
  }
  
  export interface IPostVehicle {
    idCliente: number;
    placa: string;
    modelo: string;
    ano: string;
    frota: string;
    motor: string;
    cor: string;
  }
  
  export interface IPutVehicle {
    idCliente: number;
    placa: string;
    modelo: string;
    ano: string;
    frota: string;
    cor: string;
    motor: string;
  }
  