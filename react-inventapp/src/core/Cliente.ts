import { Orden } from "./Orden";

export interface Cliente {
  telefono: string;
  id: number;
  nombre: string;
  email?: string;
  direccion: string;
  ordenes: Orden[];
}
