'use strict';

class iPhone {
  constructor(modelNum, suffix) {
    this.modelNum = modelNum;
    this.suffix = suffix;
    this.prefix = 'iPhone';
  }

  set modelNum(modelNum) {
    if (!/\d/.test(modelNum)) console.log('Number is not included in modelNum');
    this._modelNum = modelNum;
  }

  get modelNum() {
    return this._modelNum;
  }

  set suffix(suffix) {
    const suffixes = new Set(['pro', 'max', 'mini']);
    if (!suffixes.has(suffix)) console.log('Suffix does not exist');
    this._suffix = suffix;
  }

  get suffix() {
    return this._suffix;
  }

  set fullName(fullName) {
    if (this.modelNum && this.suffix)
      this._fullName = this.modelNum + ' ' + this.suffix;
    else this._fullName = fullName;
  }

  get fullName() {
    if (this.modelNum && this.suffix)
      return (this._fullName =
        this.prefix + ' ' + this.modelNum + ' ' + this.suffix);
    else return this._fullName;
  }

  static isSoldOut() {
    return true;
  }
}

///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(this.make, 'at', this.speed, 'km/h');
//   }

//   brake() {
//     this.speed -= 5;
//     console.log(this.make, 'at', this.speed, 'km/h');
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }

//   set speedUS(speed) {
//     this.speed *= 1.6;
//   }
// }

// const cars = [new Car('BMW', 100), new Car('Benz', 95)];

////////////////////////////////////////
// Inheritance

const PersonProto = {
  calcAge() {
    console.log(2021 - this.birthYear);
  },
};
const steven = Object.create(PersonProto);

// Constructor function
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2023 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);
Student.prototype.introduce = function () {
  console.log(`Hi I'm ${this.firstName} and I study ${this.course}`);
};

// const me = new Student('Seongwoo', 1978, 'architecture');
// me.introduce();
// me.calcAge();

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
// Car.prototype.accel = function () {
//   this.speed += 10;
//   console.log(`${this.make} speed up to ${this.speed} km/h`);
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   console.log(`${this.make} speed down to ${this.speed} km/h`);
// };

// const EV = function (make, speed, charge) {
//   Car.call(this, make, speed);
//   this.charge = charge;
// };
// EV.prototype = Object.create(Car.prototype);
// EV.prototype.chargeBattery = function (chargeTo) {
//   this.charge = chargeTo;
// };
// EV.prototype.accel = function () {
//   this.speed += 20;
//   this.charge--;
//   console.log(
//     `${this.make} speed up to ${this.speed}km/h, battery at ${this.charge}`
//   );
// };

///////////////////
// Inheritance by ES6 classes

class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    super(fullName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`I am ${this.fullName} and study ${this.course}`);
  }
}

///////////////////////////////////////
// Coding Challenge #4

class Car {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accel() {
    this.speed += 10;
    console.log(`${this.make} speeds up to ${this.speed}km/h`);
    return this;
  }

  brake() {
    this.speed -= 10;
    console.log(`${this.make} slows down to ${this.speed}km/h`);
    return this;
  }
}

class EV extends Car {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`${this.make} charged to ${this.#charge}%`);
    return this;
  }

  accel() {
    this.speed += 20;
    this.#charge -= 1;
    console.log(
      `${this.make} speeds up to ${this.speed}km/h, with a charge of ${
        this.#charge
      }`
    );
    return this;
  }
}

const model3 = new EV('tesla', 100, 100);
