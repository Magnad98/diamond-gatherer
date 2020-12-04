class Person {
    constructor(options) {
        this.name = options.name;
        this.age = options.age;
        this.gender = options.gender;
    }
    present() {
        console.log(`Hi, my name is ${this.name}, I'm ${this.age} years old and I'm a ${this.gender}.`);
    }
    work() {
        console.log(`${this.name} is working.`);
    }
}
module.exports = Person;