const express = require('express')
const blog = require('./routes/blog')
const shop = require('./routes/shop')


const app = express()
const port = 3000

app.use(express.static('public'))
app.use('/blog', blog)
app.use('/shop', shop)

// app.get('/', (req, res) => {
//     console.log("Hey this is a get request")
//     res.send('Hello World!')
// })

// app.post('/', (req, res) => {
//     console.log("Hey this is a post request")
//     res.send('Hello World from post req!')
// })

// app.put('/', (req, res) => {
//     console.log("Hey this is a put request")
//     res.send('Hello World from put req!')
// })

// app.delete('/', (req, res) => {
//     console.log("Hey this is a delete request")
//     res.send('Hello World from delete req!')
// })

// Chaining of requests
app.get('/', (req, res) => {
    console.log("Hey this is a get request")
    res.send('Hello World!')
}).post('/', (req, res) => {
    console.log("Hey this is a post request")
    res.send('Hello World from post req!')
}).put('/', (req, res) => {
    console.log("Hey this is a put request")
    res.send('Hello World from put req!')
}).delete('/', (req, res) => {
    console.log("Hey this is a delete request")
    res.send('Hello World from delete req!')
})

app.get("/index", (req, res) => {
    console.log("Hey its index")
    // res.send("This is index page")
    res.sendFile('templates/1.html', { root: __dirname })
})

app.get("/api", (req, res) => {
    res.json({ name: "Raju", job: "Developer", age: 24 , hobbies: ['coding', 'sleeping', 'listening music']})
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
