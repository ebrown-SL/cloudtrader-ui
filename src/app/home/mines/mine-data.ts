import { IMine } from 'src/app/shared/models/mine.model';

export const MINES: IMine[] = [
  {
    id: 1,
    coordinates: {
      latitude: 51.454514,
      longitude: -2.58791,
    },
    temperature: 30,
    stock: 397,
    price: 10,
    name: 'Bristol',
  },
  {
    id: 2,
    coordinates: {
      latitude: 51.509865,
      longitude: -0.118092,
    },
    temperature: 24,
    stock: 250,
    price: 12,
    name: 'London',
  },
  {
    id: 3,
    coordinates: {
      latitude: 54.966667,
      longitude: -1.6,
    },
    temperature: 37,
    stock: 460,
    price: 15,
    name: 'Newcastle',
  },
  {
    id: 4,
    coordinates: {
      latitude: 55.950558,
      longitude: -3.185556,
    },
    temperature: 16,
    stock: 500,
    price: 16,
    name: 'Edinburgh',
  },
];
