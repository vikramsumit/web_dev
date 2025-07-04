// searching for sata in mongodb
use sumitkart

//This query will return all the objects with rating equal to 3.5
db.items.find({ rating: 4.8 })
db.items.find({ rating: { $gte: 4.0 } })
db.items.find({ rating: { $gt: 4.0 } })

//And operator
db.items.find({ rating: { $gt: 4 }, price: { $gt: 40000 } })
db.items.find({ rating: { $gt: 4 }, price: { $gt: 99000 } })

// or operator
db.items.find({ $or: [{ rating: { $gt: 4 } }, { price: { $gt: 99000 } }] })

// one by one searching
db.items.find({ rating: 4.8 }, {rating:1})
db.items.find({ rating: { $gte: 4.0 }}, {rating:1, qty:1 })
