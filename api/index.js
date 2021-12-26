var express = require('express');
const router = express.Router();
const { models:{ Movie } } =require('../db')


router.get('/movies', async(req, res, next)=>{
  try{
    res.send(await Movie.findAll())
  }
  catch(ex){
    next(ex)
  }
})

router.get('/movies/:id', async(req, res, next)=>{
  try{
      res.send(await Movie.findByPk(req.params.id))
  }
  catch(ex){
    next(ex)
  }
})
router.put('/movies/:id', async(req, res, next)=>{
  try{
    let movie = await Movie.findByPk(req.params.id);
    await movie.update(req.body);
    res.send(movie);
  }
  catch(ex){
    next(ex)
  }
})

router.post('/movies/random', async(req, res, next)=>{
  try{
    res.send(await Movie.createRandom())
  }
  catch(ex){
    next(ex)
  }
})

router.delete('/movies/:id', async(req, res, next) => {
  const movieToDelete = await Movie.findByPk(req.params.id)
  movieToDelete.destroy()
  res.sendStatus(204)
})

module.exports = router