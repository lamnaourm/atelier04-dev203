import express from "express";
import cors from "express";
import fs from "fs";
import {v4 as uuid} from 'uuid'

const app = express()
app.use(express.json())
app.use(cors())

app.post('/produit', (req, res) => {
    const produit = req.body;

    if(!fs.existsSync('./data'))
        fs.mkdirSync('./data')
    
    const id = uuid();

    fs.writeFileSync(`./data/${id}.txt`, JSON.stringify(req.body))

    res.sendStatus(201)
})

app.get('/produits/all', (req, res) => {
    const filesnames = fs.readdirSync('./data')
    var produits = []
    filesnames.forEach(name => {
        const data = fs.readFileSync(`./data/${name}`)
        produits.push({id: name.substring(0,name.split('.')[0]),...JSON.parse(data)})
    })

    res.json(produits);
})

app.listen(3000, (err) => {
    if(!err)
        console.log('Server Started')
    else
        console.log('Server not Started')
})