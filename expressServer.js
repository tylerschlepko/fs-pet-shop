const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const fs = require('fs')
const { isNumber } = require('util')
const petsPath = path.join(__dirname, 'pets.json')


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
                res.send(JSON.stringify(pets[num]))
            } else {
                res.sendStatus(404)
            }
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})