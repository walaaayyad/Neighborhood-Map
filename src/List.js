import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

  
class List extends Component {
  state={
      query:'',
      markers: this.props.markers
  }

  updateQuery=(query)=>{
      this.setState({
          query: query
      })
  }

        render() {
            //console.log(this.state.markers)
            //console.log(this.props.locations)
           let showingRestaurant
           let filteredMarkers
           if(this.state.query) {
               const match = new RegExp(escapeRegExp(this.state.query), 'i')
            //--test part to filter markers
            filteredMarkers= this.state.markers.filter((restaurant)=> match.test(restaurant.title))
            console.log(filteredMarkers)
            //---------------------
            showingRestaurant = this.props.locations.filter((restaurant)=> match.test(restaurant.name))
            //console.log(showingRestaurant)
            
          
           }else{
            showingRestaurant = this.props.locations
           }
            showingRestaurant.sort(sortBy('name'))

    
                return(

                <div id='search'>
                    <h2 tabIndex='0' >Luxor Egypt</h2>
                    <div className='search-list'>
                        <input className='search'
                            role='search'
                            aria-labelleby='search_field'
                            type='text'
                            placeholder='Search Restaurant'
                            value={this.state.query}
                            onChange={(event)=>this.updateQuery(event.target.value) && this.props.updateMarkers(filteredMarkers)}//--test part to filter markers
                        />
                    <h5 tabIndex='0'>Click on Restaurant Name</h5>
                    </div>

                    <ol className='list'  aria-label='restaurant name'>
                        {showingRestaurant.map((item)=> (
                            <li onClick={(event)=> this.props.focus(event.target)}
                                onKeyPress={(event)=> this.props.focus(event.target)}
                                className='item_name'
                                tabIndex='0' 
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

       