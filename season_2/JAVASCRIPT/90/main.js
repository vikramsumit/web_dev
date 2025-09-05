const express = require('express')
const app = express()
const port = 3000
const birds = require('./routes/birds')
const fs = require('fs')

// app.use(express.static('public'))

app.use('/birds', birds)

// Middleware function to log request details
app.use((req, res, next) => {
    console.log(req.headers)
    req.raju = "I am raju bhai";
    fs.writeFileSync("logs.txt", `${Date.now()} is a ${req.method} request to ${req.url}\n`, { flag: 'a' })
    console.log(`${Date.now()} is a ${req.method} request to ${req.url}`)
    // res.send("Response from first middleware")
    
    next()
})

// app.use((req, res, next) => {
//     console.log("This is my second middleware")
//     next()
// })

// app.use((req, res, next) => {
//     console.log("This is my third middleware")
//     next()
// })

// app.use((req, res, next) => {
//     console.log("This is my fourth middleware")
//     next()
// })

// app.use((req, res, next) => {
//     console.log("This is my fifth middleware")
//     next()
// })
    // console.log(req.headers)
    // req.harry = "I am harry bhai";
    // fs.appendFileSync("logs.txt", `${Date.now()} is a ${req.method}\n`)
    
    // // res.send("Hacked by Middlware 1")
    // next()
// })

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// app.get('/About', (req, res) => {
//   res.send('Hello World here we are in about page' + " \n" + req.raju)
// })
// app.get('/About', (req, res) => {
//   res.send(`Hello World here we are in about page<br>${req.raju}`);
// });
app.get('/About', (req, res) => {
    res.type('text/html');
    res.send(`Hello World here we are in about page\n${req.raju}`);
});
app.get('/contact', (req, res) => {
  res.send('Hello here we are in contact page')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
