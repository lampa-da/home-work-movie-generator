import { render } from 'react-dom';
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

export default class Generator extends React.Component {
  constructor(){
    super()
    this.state ={
      movies: [],
      generator: [],
      movieId: 1
    }
    this.addToGenerator = this.addToGenerator.bind(this)
    this.deleteFromGenerator = this.deleteFromGenerator.bind(this)
  }

  async addToGenerator(){
    const addedMovie = (await axios.get(`api/movies/${this.state.movieId}`)).data
    await axios.post(`/api/generators/${addedMovie.id}`, {movie: addedMovie})
    this.setState({
      
      generator: [...this.state.generator, addedMovie],
      movieId: this.state.movieId + 1
    })
  }

  async deleteFromGenerator(id){
    await axios.delete(`/api/generators/${id}`)
    this.setState({
      generator: this.state.generator.filter(item => {
          return item.id !== id
      })
  })
  }

  componentDidUpdate(){}

  async componentDidMount(){
    const {data: movies} = await axios.get('api/movies')
    this.setState({movies: movies})
  }
  render(){
    const {movies, generator} = this.state
    console.log('movies', movies)
    console.log('generator', generator)
    return (
      <div>
        <button onClick={this.addToGenerator}>Generate Random Movie</button>
        <div className='generator'>
          {
            generator.map(item =>{
              return(
                <div key={item.id}>
                  <button onClick={this.deleteFromGenerator.bind(null, item.id)}>x</button>
                  
                    {item.name }({item.rating})
                  
                  <button>-</button>
                  <button>+</button>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
