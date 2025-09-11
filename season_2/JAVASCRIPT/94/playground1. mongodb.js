use("sigmadatabase");
// db.playground1.drop();
// db.createCollection("playground1");
db.getCollection('sales').insertMany([
  { name: "Alice", age: 30, city: "New York" },
  { name: "Bob", age: 25, city: "San Francisco" },
  { name: "Charlie", age: 35, city: "Los Angeles" },
    { name: "Diana", age: 28, city: "Chicago" },
    { name: "Ethan", age: 32, city: "Miami" },
    { name: "Fiona", age: 27, city: "Seattle" }
]);
console.log("Data inserted successfully");
