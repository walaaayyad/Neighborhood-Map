import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

   // console.log(props.locations[0].name);
    //console.log(props.markers.id);
    class List extends Component {
  state={
      query:''
  }

  updateQuery=(query)=>{
      this.setState({
          query: query
      })
  }
        render() {

           let showingRestaurant
           if(this.state.query) {
               const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingRestaurant = this.props.locations.filter((restaurant)=> match.test(restaurant.name))

           }else{
            showingRestaurant = this.props.locations
           }

           showingRestaurant.sort(sortBy('name'))

    return(

       <div id='search'>
          <h2>Luxor Egypt</h2>
          <div className='search-list'>
          <input className='search'
                 type='text'
                 placeholder='Search Restaurant'
                 value={this.state.query}
                 onChange={(event)=>this.updateQuery(event.target.value)}
                />
         
          </div>
          <ol className='list'>
              {showingRestaurant.map((item)=> (
                  <li   onClick={(event)=> this.props.focus(event.target)}
                  className='item_name' 
                  role='button'
                  key= {item.id}
                  >
                      {item.name}  
                  </li>
              ))}
          </ol>
       </div>
    )
}
    }

        
         export default List

       