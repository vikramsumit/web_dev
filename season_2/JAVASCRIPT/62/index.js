/* Create a business name generator by combining list of adjectives and shop name and another word


Adjectives:
Crazy 
Amazing
Fire 

Shop Name:
Engine
Foods
Garments

Another Word:
Bros
Limited
Hub

*/

let adjective1 = "Crazy"
let adjective2 = "Amazing"
let adjective3 = "Fire"

let shopName1 = "Engine"
let shopName2 = "Foods"
let shopName3 = "Garments"

let anotherWord1 = "Bros"
let anotherWord2 = "Limited"
let anotherWord3 = "Hub"

let randomAdjective = Math.random();
let randomShopName = Math.random();
let randomAnotherWord = Math.random();

let finaladjective;
if (randomAdjective < 0.33) {
    finaladjective = adjective1;
}
else if (randomAdjective < 0.66) {
    finaladjective = adjective2;
}
else {
    finaladjective = adjective3;
}   

let finalShopName;
if (randomShopName < 0.33) {
    finalShopName = shopName1;
}
else if (randomShopName < 0.66) {
    finalShopName = shopName2;
}
else {
    finalShopName = shopName3;
}   

let finalAnotherWord;
if (randomAnotherWord < 0.33) {
    finalAnotherWord = anotherWord1;
}
else if (randomAnotherWord < 0.66) {
    finalAnotherWord = anotherWord2;
}
else {
    finalAnotherWord = anotherWord3;
}   

console.log(`Your business name is: ${finaladjective} ${finalShopName} ${finalAnotherWord}`);


