const express = require('express')
const cors = require('cors')
const {
    MongoClient,
    ServerApiVersion
} = require('mongodb')
const app = express()
const port = process.env.PORT || 5000


const corsOption = {
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credential: true,
    optionSuccessStatus: 200
}

// mIddleware
app.use(cors(corsOption))
app.use(express.json())

const uri = "mongodb+srv://skilledCourse:0qOh1MsQITrgRc4n@cluster0.05txn1y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const jobCollection = client.db('skilledCourse').collection('jobs');


        // To get add Job data in URL
        app.get('/jobs', async (req, res) => {
            const result = await jobCollection.find().toArray();

            res.send(result);
        })

        
        // To get Add Job Data in dataBase from client-addSec
        app.post('/job', async (req, res) => {
            const jobData = req.body;

            const result = await jobCollection.insertOne(jobData)
            res.send(result)
        })



        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({
            ping: 1
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('Skilled with course server running')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})