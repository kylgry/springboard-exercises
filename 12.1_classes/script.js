class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  honk() {
    console.log('Beep.');
  }

  toString() {
    return `This vehicle is a ${this.make} ${this.model} from ${this.year}`;
  }
}

let myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);
console.log(myFirstVehicle.toString());
myFirstVehicle.honk();

class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 4;
  }
}

let myFirstCar = new Car("Toyota", "Corolla", 2005);
console.log(myFirstCar.toString());
myFirstCar.honk();
console.log(myFirstCar.numWheels);

class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 2;
  }
  revEngine() {
    console.log("VROOM!!!")
  }
}

let myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);
console.log(myFirstMotorcycle.toString());
myFirstMotorcycle.honk();
myFirstMotorcycle.revEngine();
console.log(myFirstMotorcycle.numWheels);

class Garage {
  constructor(capacity) {
    this.capacity = capacity;
    this.vehicles = [];
  }

  add(vehicle) {
    if (!(vehicle instanceof Vehicle)) { return "Only vehicles are allowed in here!" }
    if (this.vehicles.length >= this.capacity) { return "Sorry, we're full." }
    this.vehicles.push(vehicle);
    console.log("Vehicle added!");
  }
}

let garage = new Garage(2);
console.log(garage.vehicles);
garage.add(new Car("Hyundai", "Elantra", 2015));
console.log(garage.vehicles);
console.log(garage.add("Taco")); 
garage.add(new Motorcycle("Honda", "Nighthawk", 2000));
console.log(garage.vehicles);
console.log(garage.add(new Motorcycle("Honda", "Nighthawk", 2001)));
