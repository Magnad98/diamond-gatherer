const Person = require("./person.js");

class Employee extends Person {
    constructor(options) {
        super(options);
        this.salary = options.salary;
        this.vacantion = options.vacantion;
    }
    getSalary() {
        console.log(`${this.name}: Yay! I just got paid \$${this.salary}.`);
    }
    getSalaryRiseTo(newSalary) {
        if (this.salary < newSalary) {
            this.salary = newSalary;
            console.log(`${this.name}: My salary has been risen to ${this.salary}.`);
        } else
            console.log(`${this.name}: \$${newSalary} is not a salary rise for me!`);
    }
    getVacantion(days) {
        if (this.vacantion >= days) {
            this.vacantion -= days;
            console.log(`${this.name}: I'm going on a vacantion for ${days} days!`);
        } else
            console.log(`${this.name}: I only have ${this.vacantion} vacantion days left.`);
    }
}
module.exports = Employee;