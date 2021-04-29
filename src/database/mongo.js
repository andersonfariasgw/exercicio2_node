// import mongoose from 'mongoose';
const { MongoMemoryServer } = require("mongodb-memory-server")
const { MongoClient} = require("mongodb");

// variaveis do arquivo
let database = null

// funções
async function startDatabase(){
    const mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    const con = await MongoClient.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    database = con.db(await mongoServer.getDbName());
}

async function getDatabase(){
    if(!database) {
        await startDatabase();
    }
    return database;
}

// export das funções
module.exports = {
    getDatabase,
    startDatabase
}