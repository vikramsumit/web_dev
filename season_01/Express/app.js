const express = require("express");
const { readFileSync } = require("fs");
const path = require("path");
const app = express();
const port = 8000;

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // for serving static file
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') //set the template engine as pug
app.set('views', path.join(__dirname, 'views')) //see the views directiory

//ENDPOINTS
app.get('/',(req, res)=>{
    const con = "Please dont diturb here othrewse uj land in jail"
    const params = {'title': 'pubg is waste of time', "content": con}
    res.status(200).render('index.pug', params);
}) 

app.post('/', (req, res)=>{
    // console.log(req. body)

    fs.writeFileSync('output.txt', outputToWrite)
    const params = {'message' : 'your form has been submitted successfully', "content": con}
    res.status(200).render('index.pug', params);
})

//START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});