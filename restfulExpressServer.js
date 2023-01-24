const express = require('express')
const fs = require('fs')
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())



app.get('/pets', (req, res) => {
    fs.readFile('./pets.json', (err, data) =>{
        if(err){
            throw err
        } else {
            res.send(data)
        }
    })
})

app.get('/pets/:id_pets', (req, res) =>{
    let id = req.params.id_pets

    fs.readFile('./pets.json', (err, data) =>{
        if(err){
            throw err
        } else {
            let singleData = JSON.parse(data)[id]
            singleData = JSON.stringify(singleData)
            res.send(singleData)
        }
    })
})

app.post('/pets', (req, res) =>{
    let obj = req.body
    let petData = {
        age : obj.age,
        kind : obj.kind,
        name : obj.name
    }

    fs.readFile('./pets.json', (err, data) =>{
        if (err){
            throw err
        } else { 
            data = JSON.parse(data)
            data.push(petData)
            data = JSON.stringify(data)
            fs.writeFile('./pets.json', data, (err) =>{
                if (err){
                    throw err
                } else {
                    console.log('sucessful')
                    res.send('Pet has been added')
                }
            })
        }
    })

})

app.patch('/pets/:id', (req, res) =>{
    let {age, kind, name} = req.body
    let id = req.params.id 

    fs.readFile('./pets.json', (err, data) =>{
        if (err){
            throw err
        } else { 
            data = JSON.parse(data)
            let editObj = data[id]
            editObj.age = age
            editObj.kind = kind
            editObj.name = name
            data[id] = editObj
            data = JSON.stringify(data)
            fs.writeFile('./pets.json', data, (err) =>{
                if (err){
                    throw err
                } else {
                    console.log('sucessful')
                    res.send('Pet has been updated')
                }
            })
        }
    })
})



app.delete('/pets/:id', (req, res) =>{
    let id = req.params.id

    fs.readFile('./pets.json', (err, data) =>{
        if (err){
            throw err
        } else { 
            data = JSON.parse(data)
            data.splice(id, 1)
            data = JSON.stringify(data)
            fs.writeFile('./pets.json', data, (err) =>{
                if (err){
                    throw err
                } else {
                    console.log('sucessful')
                    res.send('Pet has been deleted')
                }
            })
        }
    })
})

app.listen(PORT, (error) =>{
    if (error){
        throw error
    } else {
        console.log(`App listening on port ${PORT}`)
    }
})