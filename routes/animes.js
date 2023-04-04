let fs = require('fs')

let express = require('express')
let router = express.Router()
let uniqid = require('uniqid')

const { body, validationResult } = require('express-validator');

const animeData = fs.readFileSync('./data/animes.json');
const animes = JSON.parse(animeData);

router.get('/', (req, res) => {
    res.render('animes', { animes: getAll('animes')})
})


router.route('/create')
  .get((req, res) => {
    res.render('create', { statuses: getAll('statuses') })
  })
  .post([
    body('title').isLength({ min: 1, max: 50 })
      .withMessage('Title must be between 1 and 50 characters long'),

    body('episodes').isInt({ min: 1, max: 999 })
      .withMessage('Episodes must be a number between 1 and 999'),

    body('description').isLength({ min: 10, max: 1000 })
      .withMessage('Description must be between 1 and 100 characters long')

    
  ], (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const animes = getAll('animes');

    animes.push({
      id: uniqid(),
      title: req.body.title,
      episodes: req.body.episodes,
      description: req.body.description,
      status: req.body.status
    });

    saveAll('animes', animes);

    res.redirect('/animes');
  });

/*router.route('/create')
    .get((req, res) => {
        res.render('create', { statuses: getAll('statuses')})
    })
    .post((req, res) => {
        let animes = getAll('animes')
        
        animes.push({
            id: uniqid(),
            title: req.body.title,
            episodes: req.body.episodes,
            description: req.body.description,
            status: req.body.status
        })

        saveAll('animes', animes)
        
        res.redirect('/animes')
    })
*/  
router.delete('delete', (req, res) => {
        let animes = getAll('animes')
        let filteredAnimes = animes.filter(anime => anime.id != req.body.id)
        saveAll('animes', filteredAnimes)
        res.json({ deleted: true })
})


module.exports = router;

function  getAll(collection) {
    return JSON.parse(fs.readFileSync(`./data/${collection}.json`))
}

function saveAll(collection, data) {
    fs.writeFileSync(`./data/${collection}.json`, JSON.stringify(data))
}


