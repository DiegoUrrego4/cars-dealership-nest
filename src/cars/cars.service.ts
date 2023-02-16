import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDTO, UpdateCarDTO } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // { id: uuid(), brand: 'Toyota', model: 'Corolla' },
    // { id: uuid(), brand: 'Honda', model: 'Civic' },
    // { id: uuid(), brand: 'Jeep', model: 'Cherokee' },
  ];

  findAll() {
    console.log(this.cars);
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car)
      throw new NotFoundException(`Car with id '${id}' not found in DB`);

    return car;
  }

  create(createCarDTO: CreateCarDTO) {
    const car: Car = {
      id: uuid(),
      ...createCarDTO,
    };
    this.cars.push(car);
    return car;
  }

  update(id: string, updateCarDTO: UpdateCarDTO) {
    let carDB = this.findOneById(id);
    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDTO,
          id,
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }

  delete(id: string) {
    this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
  }

  fillsCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
  }
}
