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

export const executeExercises = () => {
    console.log(modifyArray(["Love", "I", "Javascript"]));
    iterateArray(["Paul", 1, false, { name: "Jon Snow"}, [1, 2, 3], null, undefined, function() { console.log('Test')} ]);
}