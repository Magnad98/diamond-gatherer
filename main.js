let developer = {
    firstName:"Alex",
    lastName: "Pop",
    age:21,
    occupation:"student",
    height:181,
    knowsJavascript: true,
    Walk: () => {
        console.log("Walking...");
    },
    SayHello: () => {
        console.log(`Hello! My name is ${this.firstName} ${this.lastName}!`);
    }
}

let Greet = (name) => {
    return `Buna, numele meu este ${name}`;
}

window.onload = () => {
    console.log(developer);
};