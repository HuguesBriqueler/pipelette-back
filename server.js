const port = 8000;
const express = require ('express')
const app = express();
app.use(express.json());

const requestHandler = ( request, response) => {
    console.log(request.url);
    response.end('Hello Node.js Server!');
}

app.get("/", (request, response) => {

    response.send("Welcome to Express");
  
  });

app.listen(port, (err)=> {
    if (err) {
        console.error('Something bad happened');
    } else {
        console.log(`server is listening on ${port}`);
    }
});