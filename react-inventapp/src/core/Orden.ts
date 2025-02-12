import { Cliente } from "./Cliente";
import { Producto } from "./Producto";

export interface Orden {
  id: number;
  fecha: string;
  cliente: Cliente;
  productos: Producto[];
}
