import { render } from 'react-dom';
import React, {Component} from 'react';
import ReactDOM from 'react-dom'
import axios from 'axios'

export default class Generator extends React.Component {
  constructor(){
    super()
    this.state ={
      movies: []
    }
    this.addToGenerator = this.addToGenerator.bind(this)
    this.deleteFromGenerator = this.deleteFromGenerator.bind(this)
    this.changeRating = this.changeRating.bind(this)
    // this.increaseRating = this.increaseRating.bind(this)
  }

  sortByName(a, b){
    return a.name.localeCompare(b.name)
  }
  sortByRating(a, b){
    return b.rating - a.rating
  }

  async addToGenerator(){
    const addedMovie = (await axios.post(`/api/movies/random`)).data
    this.setState({
      movies: [...this.state.movies, addedMovie]
      .sort(this.sortByName)
      .sort(this.sortByRating)
    })
  }

  async deleteFromGenerator(id){
    await axios.delete(`/api/movies/${id}`)
    this.setState({
      movies: this.state.movies.filter(movie => {
          return movie.id !== id
      })
    })
  }

  async changeRating(movie, method){
    let newRating = movie.rating
    method === 'decrease'?
      newRating = movie.rating - 1
      :
      newRating = movie.rating + 1
    const updatedMovie = (await axios.put(`/api/movies/${movie.id}`, {rating: newRating})).data
    const movies = await axios.get(`api/movies`).data
    this.setState({movies: this.state.movies
      .map(mov => (mov.id === updatedMovie.id ? updatedMovie : mov))
      .sort(this.sortByName)
      .sort(this.sortByRating)
    })
  }

  componentDidUpdate(){}

  async componentDidMount(){
    const {data: movies} = await axios.get('api/movies')
    this.setState({movies: movies
      .sort(this.sortByName)
      .sort(this.sortByRating)
    })
  }
  render(){
    const {movies} = this.state
    console.log('movies', movies)
    return (
      <div>
        <button onClick={this.addToGenerator}>Generate Random Movie</button>
        <div className='generator'>
          {
            movies.map(movie =>{
              return(
                <div key={movie.id}>
                  <button onClick={this.deleteFromGenerator.bind(null, movie.id)}>x</button>
                  {movie.name }({movie.rating})
                  <button disabled={ movie.rating === 1 ? true : false } onClick={this.changeRating.bind(null, movie, 'decrease')} >-</button>
                  <button disabled={ movie.rating === 5 ? true : false } onClick={this.changeRating.bind(null, movie, 'increase')}>+</button>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
