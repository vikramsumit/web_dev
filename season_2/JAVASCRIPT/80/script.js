// let obj = {
//     a: 1,
//     b: "Harry"
// }

// console.log(obj)

// let animal = {
//     eats: true
// };

// let rabbit = {
//     jumps: true
// };

// rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal

class Animal{
    constructor(name){
        this.name = name
        console.log("Object is created...")
    }

    eats(){
        console.log("Kha raha hoon")
    }
    jumps(){
        console.log("Kood raha hoon")
    }
}

class Lion extends Animal{
    constructor(name){
        super(name) // calls the constructor of the parent class
        console.log("Lion is created...")
    }

    roar(){
        console.log("Roaring...")
    }
}

let lion = new Lion("Sheru");
console.log(lion);
let a = new Animal("sheru");
console.log(a)