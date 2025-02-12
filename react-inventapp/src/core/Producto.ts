export interface Producto {
  id?: string; 
  codigo: string;
  nombre: string;
  caracteristicas: string;
  precio: number;
  moneda: string;
  empresaNit: string;
  categorias: string[];
}
