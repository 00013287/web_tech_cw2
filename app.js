const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/create', (req, res) => {
    res.render('create')
})

const animes = ['Aot', 'Silet voice']
app.get('/animes', (req, res) => {
    res.render('animes', {animes: animes})
})

app.get('/anime/info', (req, res) => {
    res.render('info')
}) 

app.listen(3000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 3000... ')
})