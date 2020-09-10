import React, {Component} from 'react';
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';

import InfoWindow from '../../components/info/infoWindow.js';
import SearchBar from '../../components/searchbar/searchbar.js';

const mapStyles = [
  {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#444444"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
          {
              "color": "#f2f2f2"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
          {
              "saturation": -100
          },
          {
              "lightness": 45
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels.text",
      "stylers": [
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#a8e5fe"
          },
          {
              "visibility": "on"
          }
      ]
  }
];

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: [],
      selectedMarker: {},
      infoWindow: false,
      loading: false,
    }
  }

  componentDidMount() {
    this.getMarkers();
  }

  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: mapStyles
    });
  }

  onMarkerClick = (props) => {
    this.resetBounce();
    this.setState({selectedMarker: props, infoWindow: true});
    let newMarkers = this.state.markers;
    newMarkers[props.id].animation = this.props.google.maps.Animation.BOUNCE;
    const jsonNewMarkers = JSON.stringify(newMarkers);
    this.setState({markers: JSON.parse(jsonNewMarkers)}, () => {
    });
  }

  getMarkers = () => {
    fetch('/api/getMarkers')
    .then(res => res.json())
    .then(newMarkers => this.setState({markers: newMarkers}))
  }

  getBusyness = () => {
    this.setState({loading: true});
    fetch('/api/getBusyness', {
      method: "post",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({index: this.state.selectedMarker.id})
    })
    .then(res => res.json())
    .then(newMarkers => this.setState({markers: newMarkers, loading: false}))
  }

  onSearch = keyWord => {
    let newMarkers = this.state.markers;
    for (let i = 0; i < this.state.markers.length; i++) {
      if (this.state.markers[i].name.toLowerCase().includes(keyWord.toLowerCase())) {
        newMarkers[i].visible = true;
      } else {
        newMarkers[i].visible = false;
      }
    }
    const jsonNewMarkers = JSON.stringify(newMarkers);
    this.setState({markers: JSON.parse(jsonNewMarkers)}, () => {
    });
  }

  onReset = () => {
    let newMarkers = this.state.markers;
    for (let i = 0; i < this.state.markers.length; i++) {
      newMarkers[i].visible = true;
    }
    const jsonNewMarkers = JSON.stringify(newMarkers);
    this.setState({markers: JSON.parse(jsonNewMarkers)}, () => {
    });
  }

  resetBounce = () => {
    let newMarkers = this.state.markers;
    for (let i = 0; i < this.state.markers.length; i++) {
      newMarkers[i].animation = null;
    }
    const jsonNewMarkers = JSON.stringify(newMarkers);
    this.setState({markers: JSON.parse(jsonNewMarkers)}, () => {
    });
  }

  render() {
    return(
      <div>
        <Map
          google={this.props.google}
          zoom={12}
          style={this.mapStyles}
          initialCenter={{lat: 49.166592, lng: -123.133568}}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
        >
          {this.state.markers.map((marker, index) => (
            <Marker
              key={index}
              id={index}
              name={marker.name}
              position={marker.position}
              busy={marker.busy}
              address={marker.address}
              visible={marker.visible}
              animation={marker.animation}
              onClick={this.onMarkerClick}
            />
          ))}
          {this.state.infoWindow ? (
            <div>
              <InfoWindow
                name={this.state.selectedMarker.name}
                busy={this.state.markers[this.state.selectedMarker.id].busy}
                address={this.state.selectedMarker.address}
                loading={this.state.loading}
                time={this.state.markers[this.state.selectedMarker.id].time}
                getBusyness={this.getBusyness}
              />
            </div>
          ) : (
            null
          )}
          <SearchBar onSearch={this.onSearch} onReset={this.onReset}/>
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAd6Tpl9TqVdyUKBZoNhmVwv4Aym20Bj34'
})(Main);