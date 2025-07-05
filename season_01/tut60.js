// Inserting data in mongo db
use rajukart
db.items.insertOne({name: "Iphone 15pro", price: 180000, rating: 9.8,quantity: 10000, sold: 985})

db.items.insertMany([{name: "Redmi 11pro", price: 18000, rating: 6.8,   quantity: 1000, sold: 95}, {name: "Redmi 12pro",price: 28000, rating: 6.8, quantity: 100, sold: 9}, {name: "motorola", price: 8000, rating: 4.8,quantity: 100, sold: 9, isBig : true}])
 