import {Dog} from "../classes/Dog.js";

const modifyArray = (array) => {
    let js = array.pop();
    let newArray = [];

    for(let i=0; i<2; i++){
        let popped = array.pop();
        newArray.push(popped);
    }

    newArray.push(js);
    return newArray;
};


const iterateArray = (array) => {
    array.forEach((value, index) => {
        console.log(`The element in array at the index of ${index} has the value ${value} and the type ${typeof value}`);
    });
};

const InstantiateDogs = () => {
    let Bruno = new Dog("Bruno", "Beagle", 3, "Male", "Brown");
    let Pascal = new Dog("Pascal", "Teckel", 5, "Male", "Black");
    let Lola = new Dog("Lola", "Jack Russell Terrier", 4, "Female", "White");

    Bruno.GetInfo();
    Pascal.GetInfo();
    Lola.GetInfo();

    Pascal.Bark();
    Bruno.Fetch();
    Lola.Pet();

    Bruno.GetOlder();

    Lola.Rename("Linda");
    Lola.GetInfo();
};

export const executeExercises = () => {
    console.log(modifyArray(["Love", "I", "Javascript"]));
    iterateArray(["Paul", 1, false, { name: "Jon Snow"}, [1, 2, 3], null, undefined, function() { console.log('Test')} ]);
    InstantiateDogs();
}