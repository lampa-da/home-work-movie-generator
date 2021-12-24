var express = require('express');
const router = express.Router();
const { models:{Movie, Generator} } =require('../db')


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

router.get('/generators', async(req, res, next)=>{
  try{
    res.send(await Generator.findAll( {
      include: [Movie]
    }))
  }
  catch(ex){
    next(ex)
  }
})

router.get('/generators/:id', async(req, res, next)=>{
  try{
      res.send(await Generator.findByPk(req.params.id, {
        include: [Movie]
      }))
  }
  catch(ex){
    next(ex)
  }
})

router.post('/generators/:id', async(req, res, next)=>{
  try{
    let generators = await Generator.create(req.params.id, {
      include: [Movie]
    })
    let movie = await Movie.findByPk(req.params.id)
    console.log(movie)
    generators.addMovies([movie.dataValues.id])
    generators = await Generator.findByPk(req.params.id,{ include: [Movie]})
    res.send(generators)
  }
  catch(ex){
    next(ex)
  }
})

module.exports = router