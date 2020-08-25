export interface IMine {
  id: number;
  coordinates: {
    latitude: number,
    longitude: number
  }
  temperature: number;
  stock: number;
  price: number;
  name: string;
}
