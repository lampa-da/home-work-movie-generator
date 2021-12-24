const Sequelize = require('sequelize')
const {STRING, INTEGER} = Sequelize
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/movie_db')
const faker = require('faker')

let movieData = new Array(50).fill('').map(_ => faker.company.catchPhrase())

const Movie = conn.define('movie', {
  name: {
    type: STRING
  },
  rating: {
    type: INTEGER,
    validate: {
      max: 5,
      min: 1
    },
    defaultValue: 3,
  }
})

const Generator = conn.define('generator', {
})

Generator.hasMany(Movie)

const syncAndSeed = async()=>{
  await conn.sync({force: true})
  const movies = await Promise.all(
    movieData.map((name)=> Movie.create({name: name })),
    )
    console.log(movies)
}

module.exports ={
  models: {
    Movie,
    Generator
  },
  conn,
  syncAndSeed,
}