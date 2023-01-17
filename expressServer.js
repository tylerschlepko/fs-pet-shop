const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const fs = require('fs')
const petsPath = path.join(__dirname, 'pets.json')

app.use(express.json())
app.use(express.urlencoded())

app.get('/pets', (req, res) =>{
    fs.readFile(petsPath, 'utf8', (err, data)=>{
        if(err){
            console.error(err.stack)
            res.sendStatus(500)
        } else {
            res.json(data)
        }
    })
})


app.get('/pets/:id', (req, res)=>{
    fs.readFile(petsPath, 'utf8', (err, data)=>{
        if(err){
            console.error(err.stack)
            res.sendStatus(500)
        } else {
            let pets = JSON.parse(data)
            let num = parseInt(req.params.id)
            if(num >= 0 && num <= pets.length - 1){
                res.json(JSON.stringify(pets[num]))
            } else {
                res.status(404).send('Not Found')
            }
        }
    })
})

app.post('/pets', (req, res) =>{
    if(!Number(parseInt(req.body.age)) || req.body.name === undefined || null || "" || req.body.kind === undefined || null || "" || req.body.age === undefined || null || ""){        res.status(400).send('Bad Request')
    } else {
    let pet = {
        age : parseInt(req.body.age),
        kind : req.body.kind,
        name : req.body.name,
    }
    fs.readFile(petsPath, 'utf8', (error, data) => {
        if (error) {
            console.error(error.stack)
            res.sendStatus(500)
        }
        let pets = JSON.parse(data)
        if (!pet) {
            res.sendStatus(400)
        }
        pets.push(pet)

        let newPetsJSON = JSON.stringify(pets)

        fs.writeFile(petsPath, newPetsJSON, (error) => {
            if (error) {
                console.error(error.stack)
                res.sendStatus(500)
            }
            res.set('Content-Type', 'application/json')
            res.send(newPetsJSON)
        })
    })
}
})

app.get('/boom', (req, res)=>{
    res.status(500).send('Internal Server Error')
})


app.get('/*', (req, res) =>{
    res.status(404).send('Not Found')
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})