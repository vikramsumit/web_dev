// inserting data in mongodb
use sumitkart
db.items.insertOne({name: "samsung s24", price:99000, rating:4.8, qty:999, sold:55, remain:88 })

db.items.insertMany([{name: "samsung s24", price:99000, rating:4.8, qty:999, sold:55, remain:88 }, {name: "oppo", price:9900, rating:2.8, qty:999, sold:555, remain:8 }, {name: "iphone", price:990000, rating:4.8, qty:999, sold:5555, remain:88 } , {name: "samsung s23", price:79000, rating:3.8, qty:999, sold:55, remain:88 }, {name: "i phone 15", price:79000, rating:4.8, qty:999, sold:55, remain:88 },{name: "oneplus", price:99000, rating:4.8, qty:999, sold:55, remain:88 },{name: "nothing", price:99000, rating:4.8, qty:999, sold:55, remain:88 }])