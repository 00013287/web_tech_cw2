const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

const { body, validationResult } = require('express-validator');

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/animes', require('./routes/animes'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/create', (req, res) => {
   res.render('create')
})

app.get('/animes/:id', (req, res) => {
    const id = req.params.id

    fs.readFile('./data/animes.json', (err,data) => {
        if (err) throw err

        const animes = JSON.parse(data)
        const anime = animes.filter(anime => anime.id == id)[0]

        res.render('info', {anime : anime})
    })
    
}) 

app.get('/:id/delete', (req, res) => {
    const id = req.params.id
    fs.readFile('./data/animes.json', (err, data) => {
      if (err) throw err
      const animes = JSON.parse(data)
      const filtered = animes.filter(anime => anime.id != id)
      fs.writeFile('./data/animes.json', JSON.stringify(filtered), err => {
     if (err) throw err
     res.render('animes', {animes: filtered, deleted: true})
      })
    })
})

app.get('/:id/update', (req, res) => {
      const id = req.params.id;
    
      fs.readFile('./data/animes.json', (err, data) => {
        if (err) throw err;
    
        const animes = JSON.parse(data);
        const anime = animes.find(anime => anime.id === id);
    
        if (anime) {
          res.render('update', { anime: anime });
        } else {
          res.status(404).send(`Anime with id ${id} not found`);
        }
      });
    });
         
    
/*app.post('/:id/update', (req, res) => {
  const id = req.params.id;
  const updatedAnime = req.body; 

  fs.readFile('./data/animes.json', (err, data) => {
    if (err) throw err;

    const animes = JSON.parse(data);
    const index = animes.findIndex(anime => anime.id === id);
      if (index >= 0) {
      
      animes[index] = { ...animes[index], ...updatedAnime };

      
      fs.writeFile('./data/animes.json', JSON.stringify(animes), err => {
        if (err) throw err;
        res.render('animes', { animes: animes, updated: true });
      });
    } else {
      
      res.status(404).send(`Anime with id ${id} not found`);
    }
  });
});
    
 */     

/*app.get('/api/v1/animes', (req, res) => {
    fs.readFile('./data/animes.json', (err, data) => {
        if (err) throw err

        const animes = JSON.parse(data)
        res.json(animes)
    })
})
*/

        
app.listen(3000, err => {
    if (err) console.log(err)

    console.log('Server is running on port 3000... ')
})