// console.log("Hello World")
const http = require('http');

const hostname = '127.0.0.81';
const port = 5000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
//   res.end('Hello World This is first servern');
  res.end(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Tour The World</title>
  </head>
  <style>
     /* css reset */
     body
     {
      margin: 0px;
      padding: 0px;
      background: url('images/2.png');
      height: 1920px;
      width: 1080px; 
  
     }
     .left{
      display: inline-block;
      /* border: 3px solid gray; */
      position: absolute;
      left : 34px;
      top: 12px;
      left: 11px;
  
     }
     .left img{
      width: 76px;
      top: 2px;
     }
     .center{
      display: block;
      width: 44%;
      margin: 12px 508px;
      /* border: 3px solid red; */
      top: 0px;
     }
     .right{
      position: absolute;
      /* border: 3px solid green; */
      right: 34px;
      top: 20px;
     }
     .navbar{
      display: inline-block;
     }
     .navbar li{
      display: inline-block;
      font-size: 25 px;
     }
     .navbar li a{
      color: aliceblue;
      text-decoration: none;
      padding: 34px 23px;
     }
     .navbar li a:hover,.navbar li a:active{
      text-decoration: wavy;
      color: rgb(124, 115, 124);
     }
     .btn{
      background-color: azure;
      margin: 0px;
      padding: 4px 19px;
      color: black;
      border-radius: 11px;
      font-size: medium;
     }
     .container{
      /* border: 3px solid brown; */
      margin: 35px 441px;
      padding: 40px 19px;
      border-radius: 12px;
      width: 573px;
     }
     .form-group input{
      text-align: center;
      display: block;
      width: 500px;
      padding: 2px;
      margin: 11px auto;
      border: 3px solid rgb(31, 34, 35);
      border-radius: 16px;
      font-size: 23px;
  
     }
     .btn{
      width: 110px;
      margin: auto;
     }
  </style>
  <body>
      <header class="header">
          <!-- left box for logo -->
          <div class="left">
                <img src="images/travel.jpg" alt="">
                <div>Explore World</div>
          </div>
          <!-- center for navbar -->
          <div class="center">
              <ul class="navbar">
                  <li><a href="#" class="active">Home</a></li>
                  <li><a href="#">About us</a></li>
                  <li><a href="#">Tour guide</a></li>
                  <li><a href="#">Contact us</a></li>
              </ul>
          </div>
          <!-- right box for buttons -->
          <div class="right">
              <button class="btn">call us</button>
              <button class="btn">email us</button>
          </div>
      </header>
      <div class="container">
          <h1>Join our team to explore world</h1>
          <form action="no action.php">
              <div class="form-group">
                  <input type="text" name="" placeholder="Enter your Name">
              </div>
              <div class="form-group">
                  <input type="text" name="" placeholder="Enter your Gender">
              </div>
              <div class="form-group">
                  <input type="text" name="" placeholder="Enter your Age">
              </div>
              <div class="form-group">
                  <input type="text" name="" placeholder="Enter your Country">
              </div>
              <div class="form-group">
                  <input type="text" name="" placeholder="Enter your Phone No">
              </div>
              <div class="form-group">
                  <input type="text" name="" placeholder="Enter your E-mail Address">
              </div>
              <div class="btn">Submit</div>
          </form>
      </div>
      
  </body>
  </html>`);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});