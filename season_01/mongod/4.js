show dbs
use sumitkart
show collections
db.items.find()

db.items.updateOne({name:"i phone 15"},{$set:{"price":900}})
db.items.find()
db.items.updateMany({name: "samsung s24"},{$set:{price:5, rating:2}})
db.items.find().pretty()