const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/home', (req, res) => {
  res.send('Welcome every one in this home page')
})
app.get('/contact', (req, res) => {
  res.send('This page is about contact')
})
app.get('/about', (req, res) => {
  res.send('This page is about us') 
})
app.get('/blog', (req, res) => {
  res.send('This page will show all the blog posts') 
})


app.get('/blog/:slug/:second', (req, res) => {
    // logic to fetch {slug} from the db
    // For URL: http://localhost:3000/blog/intro-to-padosi?mode=dark&region=in
    console.log(req.params) // will output { slug: 'intro-to-padosi' }
    console.log(req.query) // will output { mode: 'dark', region: 'in' }

    res.send(`hello ${req.params.slug} and ${req.params.second}`)
})

// app.get('/blog/intro-to-js', (req, res) => {
//     // logic to fetch intro to js from the db
//     res.send('Hello intro-to-js!')
// })

// app.get('/blog/intro-to-python', (req, res) => {
//     // logic to fetch intro to python from the db
//     res.send('Hello intro-to-python!')
// })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
