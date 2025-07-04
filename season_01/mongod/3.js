
show dbs
use sumitkart
show collections

db.items.find({prtice:99000})

// Deleting items from mongo database
db.items.deleteOne({price:99000})
//deleteone will delete the matching document entry and will delete the first entry in case of multi document match

db.items.deleteMany({price:99000})

