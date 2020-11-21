export class Dog{
    constructor(name, race, age, gender, color){
        this.name = name;
        this.race = race;
        this.age = age;
        this.gender = gender;
        this.color = color;
    }

    GetInfo(){
        console.log(`My name is ${this.name}. I'm a ${this.color} ${this.gender} ${this.age} years old ${this.race}`);
    }

    Bark(){
        console.log(`You get closer to ${this.name}.`);
        console.log(`${this.name} barks at you. WOOF, WOOF!`);
    }

    Pet(){
        console.log(`You pet ${this.name}.`);
        console.log(`${this.name} wags it's tail happily.`);
    }
    
    Fetch(){
        console.log("You pick a stick from the ground.");
        console.log("You throw the stick.");
        console.log(`${this.name} runs after the stick and fetches it back to you.`);
    }

    Rename(newName){
        console.log(`Renaming ${this.name} to ${newName}...`);
        this.name = newName;
    }

    GetOlder(){
        console.log(`${this.name} is 1 year older now.`);
        this.age++;
    }
}