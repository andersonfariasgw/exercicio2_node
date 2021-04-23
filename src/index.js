// imports
const app = require("express")();
const bodyParse = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// apenas durante o dev, criar um registro
const ads = [
    { 'titulo': 'olá!'}
];

// definições
app.use(helmet());
app.use(bodyParse.json());
app.use(cors());
app.use(morgan('combined'));

// routers
app.get('/',
    (req,res)=>{
        res.send(ads);
    }
);


// start server
app.listen(3000, ()=>{
    console.log("Server ok! porta 3000");
})
