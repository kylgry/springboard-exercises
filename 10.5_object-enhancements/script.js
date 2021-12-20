//
// const createInstructor = (firstName,lastName) => {
//   return {firstName, lastName}
// }
//
// console.log(createInstructor('Kyle','Gray'))
//
// const favoriteNumber = 42;
// const instructor = { firstName: "Colt", [favoriteNumber]: "That is my favorite!"}
//
// console.log(instructor)

const instructor = {
    firstName : "Colt",
    sayHi(){return "Hi!"},
    sayBye(){return this.firstName + " says bye!"}
  }

const createAnimal = (species, verb, noise) => {
  return {
    species,
    [verb]() {console.log(noise)}
  }
}

const dog = createAnimal("dog", "bark", "wooof!");
console.log(dog);
dog.bark();
