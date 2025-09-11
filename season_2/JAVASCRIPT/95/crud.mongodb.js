use("CrudDb")

db.createCollection("courses")

db.courses.insertOne({
    name: "Here we will study about webdev",
    price: 0,
    assignments:12,
    projects: 44
})

// db.courses.insertMany([
//   { name: "javascript", price: 3333, instructor: "raju bhai" },
//   { name: "python", price: 4444, instructor: "sumit" },
//   { name: "java", price: 5000, instructor: "anita" },
//   { name: "c++", price: 3500, instructor: "vikram" },
//   { name: "nodejs", price: 4200, instructor: "ajay" },
//   { name: "react", price: 3900, instructor: "priya" },
//   { name: "angular", price: 4100, instructor: "manish" },
//   { name: "mongodb", price: 3700, instructor: "rahul" },
//   { name: "expressjs", price: 3600, instructor: "tina" },
//   { name: "datastructures", price: 6000, instructor: "alok" },
//   { name: "machine learning", price: 8000, instructor: "sneha" }
// ])

let a = db.courses.find()
console.log("Data fetched successfully")
console.log(a.toArray())
a.forEach((e) => {
    printjson(e)
})
 
//UPDATE
// db.courses.updateOne({ name: "Here we will study about webdev" }, { $set: { price: 1999 } }) 
// db.courses.updateMany({ price: { $gt: 4000 } }, { $set: { price: 3500 } })

//DELETE
db.courses.deleteOne({ name: "datastructures" }) 
db.courses.deleteMany({ price: { $gt: 4000 } })

console.log("Data updated and deleted successfully")

//CRUD Operations Completed 