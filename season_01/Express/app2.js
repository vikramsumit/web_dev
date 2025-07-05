// const express = require("express")

// const app = express();
// const port = 80;

// //for serving static file
// app.use('/static', express.static('static'));

// //set the template engine as pug
// app.set('view engine','pug')

// //set the view directory
// app.set('views', path.join(__dirname,'views'))

// //our pug demo endpoint
// app.get("/demo", (req,res)=>{
//     res.status(200).render('demo', { title: 'Hey', message: 'Hello world how are you how the all things going on there is the things will fine '})
// });

// app.get("/", (req,res)=>{
//     res.status(200).send("This is my home page of my first express app with babubhai")
// });

// app.get("/", (req,res)=>{
//     res.send("This is my about page of my first express app with babubhai")
// });

// app.get("/", (req,res)=>{
//     res.send("The application started successfully on port ${port}")
// });

// app.post("/about", (req,res)=>{
//     res.send("The post nothing application started successfully on port ${port}")
// });

// app.get("/this", (req,res)=>{
//     res.status(404).send("chal nikal yahan se page busy hai baad mein aana nhi to mat aana")
// });

// app.listen(port, ()=>{
//     console.log(`The application started successfully on port ${port}`)
// })