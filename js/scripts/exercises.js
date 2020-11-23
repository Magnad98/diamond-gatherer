import { Dog } from "../classes/Dog.js";

const modifyArray = (array) => {
    let temp = array[0];
    array[0] = array[1];
    array[1] = temp;
    return array;
};


const iterateArray = (array) => {
    array.forEach((value, index) => {
        console.log(`The element in array at the index of ${index} has the value ${value} and the type ${typeof value}`);
    });
};

const instantiateDogs = () => {
    let bruno = new Dog("Bruno", "Beagle", 3, "Male", "Brown");
    let pascal = new Dog("Pascal", "Teckel", 5, "Male", "Black");
    let lola = new Dog("Lola", "Jack Russell Terrier", 4, "Female", "White");

    bruno.getInfo();
    pascal.getInfo();
    lola.getInfo();

    pascal.bark();
    bruno.fetch();
    lola.pet();

    bruno.getOlder();

    lola.rename("Linda");
    lola.getInfo();
};

export const executeExercises = () => {
    console.log(modifyArray(["Love", "I", "Javascript"]));
    iterateArray(["Paul", 1, false, { name: "Jon Snow" }, [1, 2, 3], null, undefined, function () { console.log('Test') }]);
    instantiateDogs();
}