import React, { Component } from 'react'
import axios from 'axios'
import ListProduct from './product/ListProduct'
import SearchProduct from './product/SearchProduct.js'
import DeleteProduct from './product/DeleteProduct'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

/*class App extends Component {
  constructor(props) {
    super(props)
    this.state = { imageURL: '' }
  }

  componentDidMount() {
    axios.get('https://dog.ceo/api/breeds/image/random')
    .then(response => {
      this.setState({ imageURL: response.data.message })
    })
    .catch(error => {
      console.log(error)
    })
  }

  render() {
    return (
      <img src={ this.state.imageURL } />
    )
  }
}*/

class App extends Component {

render() {
  return (
      <div className = 'container'>
      <BrowserRouter>
          <Switch>
            <Route exact path='/list'><ListProduct/></Route>
            <Route exact path='/search'><SearchProduct/></Route>
            <Route path='/delete/:product' component={ DeleteProduct } />
            <Route path='/delete'><DeleteProduct/></Route>
            <Route path='*'><ListProduct/></Route>
          </Switch>  
      </BrowserRouter>
      </div> 
    )
  }
}

export default App
