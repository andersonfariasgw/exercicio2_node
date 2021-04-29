// imports
const app = require("express")();
const bodyParse = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { startDatabase } = require("./database/mongo");
const { insertAds,getAds, deleteAds, updateAds } = require("./database/ads");

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
    async (req,res)=>{
        res.send( await getAds());
    }
);

app.post('/',
    async (req,res)=>{
        const newAd = req.body;
        await insertAds(newAd);
        res.send({'message': 'NEW AD INSERTED'});
    }
);

app.delete('/:id',
    async (req,res)=>{
        await deleteAds(req.params.id);
        res.send({'message': 'AD REMOVED'});
    }
);

app.put('/:id',
    async (req,res)=>{
        const updateAd = req.body;
        await updateAds(req.params.id, updateAd);
        res.send({'message': 'AD UPDATED'});
    }
);


startDatabase().then(async ()=>{
    await insertAds({'title': 'Database na memoria (ok)'})
})


// start server
app.listen(3000, async ()=>{
    console.log("Server ok! porta 3000");
})
