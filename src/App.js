import React, { Component } from 'react';
import scriptLoader from 'react-async-script-loader';
import List from './List.js';
import './App.css';



// https://stackoverflow.com/questions/41709765/how-to-load-the-google-maps-api-script-in-my-react-app-only-when-it-is-require

class App extends Component {
  constructor(props) {
    super(props);

  }
  
state={
markers:[],
locations: [
  {
      id: "520a4b8793cd8c429aa8f8b7",
      name: "Olives Restaurant",
      location:{
      lat: 25.714606844628456,
      lng: 32.65145301818848
      }
    },
    {
      id: "5207a74f0493b6d975d1bf9d",
      name: "Rossetta Main Dining Restaurant",
      location:{
      lat: 25.71752603781213,
      lng: 32.650465965270996
      }
    },
    {
      id: "53ce7a19498eccb2e2dc2ea1",
      name: "Aisha Restaurant",
      location:{
      lat: 25.687715530395508,
      lng: 32.632713317871094
      }
    },
    {
      id: "4fbe2076e4b0343dfc452a26",
      name: "Ghazala Restaurant & Cafe",
      location:{
      lat: 25.68701944879247,
      lng: 32.63146834791071
      }
    },
    {
      id: "56c5f7abcd10e5873b92ee54",
      name: "Casa Di Napoli restaurant",
      location:{
      lat: 25.687305,
      lng: 32.631357
      }
    },
    {
      id: "4fc25aeee4b02db73e820744",
      name: "Oum Hashim Restaurant",
      location:{
      lat: 25.702250625145417,
      lng: 32.6440185132106
      }
    },
    {
      id: "56c4bfe5cd10583a69b8b452",
      name: "Nubian restaurant",
      location:{
      lat: 25.68757562748794,
      lng: 32.63099920475835
      }
    }
 ]
}

/*--------test part
 foursquare = require('react-foursquare')({
  clientID: 'PEEZ12FJCFW01QSIIAB1LYP24CDJ0ZCJUDUVQKRFYRQKEZLG',
  clientSecret: 'E3M5OUVJGXF45JGXLGLQCOHBGLYOWT2QWI2ADV2OZNFIMTWN'  
});

 params = {
  "ll": "25.6872431,32.6396357",
  "query": 'resorts'
};

//export default class FoursquareDemo extends Component {

  constructor(props) {
     super(props);
     this.state = {
       locations: [],
       markers:[]
     };
   }

  componentDidMount() {    
    foursquare.venues.getVenues(params)
      .then(res=> {
        this.setState({ locations: res.response.venues });
      });
  }
//-----------test end
*/
componentWillReceiveProps({isScriptLoaded,isScriptLoadSucceed}){
  
  if (isScriptLoaded && !this.props.isScriptLoaded) {  //Loud the map
    if (isScriptLoadSucceed) {
        //var markers = [];
        var map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: {lat: 25.6872431, lng: 32.6396357}
        });
   
       
//Udacity (ud864-master)
//----------------------

          let largeInfowindow = new window.google.maps.InfoWindow(),
              highlightedIcon = makeMarkerIcon('FFFF24'),// new color
              bounds = new window.google.maps.LatLngBounds();
          var restaurantsList=document.querySelectorAll('li');
         
       
        for(let i=0; i<this.state.locations.length; i++) {
                let position= this.state.locations[i].location,
                    title= this.state.locations[i].name;
           
                let marker = new window.google.maps.Marker({
                  map: map,
                  position: position,
                  title: title,
                  animation: window.google.maps.Animation.DROP,
               
              });            
       
              this.state.markers.push(marker);
       
        //--- When click popup info window
        marker.addListener('click', function() {
          populateInfoWindow(this, largeInfowindow);
        });
      
        //--- When click change color of marker
        marker.addListener('click', function() {
          this.setIcon(highlightedIcon);
        });
        
        //--- When click focus the same name in list
         marker.addListener('click', function() {
          checkInList(this.title);
        });
     
        bounds.extend(this.state.markers[i].position);
      }
    
      map.fitBounds(bounds);
     
    }

    
    function populateInfoWindow(marker, infowindow) {
      
      if (infowindow.marker !== marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
      
        infowindow.addListener('closeclick',function(){
          infowindow.setMarker = null;
        });
      }
    }
    
    function makeMarkerIcon(markerColor) {
      var markerImage = new window.google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
        '|40|_|%E2%80%A2',
        new  window.google.maps.Size(21, 34),
        new  window.google.maps.Point(0, 0),
        new  window.google.maps.Point(10, 34),
        new  window.google.maps.Size(21,34));
      return markerImage;
    }

     //--- function to focus the name of clicked marker in the list of restaurants
     function checkInList(title) {
      
      restaurantsList.forEach(function(item){
        if(item.innerHTML === title){
          item.className = 'active' ;
          setTimeout(function(){
            item.className='item_name';
           },2000);  
     
        } 
      }); 
    } 
    
  }
    else{
        alert("script not loaded")
    }
}

//--- function to focus marker when click the list

focusMarker= (listItem)=>{
  console.log(listItem)
let newMarker=this.state.markers
  newMarker.map(marker=>{
    if(marker.title === listItem.innerHTML) {
  console.log('mached')

      window.google.maps.event.trigger(marker,'click');
    
      }else{
  console.log('not matched')

      }
    })
    console.log(listItem);
  }
 
 
render(){
 
    return(
      <div>
        {/*<div>
        <div>Items:</div>
        { this.state.locations.map(item=> { return <div key={locations.id}>{locations.name}</div>}) }
        </div>*/}
       <div className='container'>
       
            <List
            setMarker={this.populateInfoWindow} 
            locations={this.state.locations}
            markers={this.state.markers}
            focus={this.focusMarker}
            />
          <div id="map"></div>
        </div>
        <footer></footer>
      </div>
    )
}
}

export default scriptLoader(
["https://maps.googleapis.com/maps/api/js?key=AIzaSyDrb41GQ4AvQu6fzITuhh2BraPokBzmNhI&v=3&callback=initMap"]
)(App)
