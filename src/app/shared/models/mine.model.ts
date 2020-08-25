export interface IMine {
  id: string;
  coordinates: {
    latitude: number,
    longitude: number
  }
  temperature: number;
  stock: number;
  price: number;
  name: string;
}
