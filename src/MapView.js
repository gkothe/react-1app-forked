import React from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';
Gmaps.Marker = Marker;

export default class MapView extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state={latitude:props.latitude,longitude:this.props.longitude};

    if(props.initialRegion){
      this.state.latitude = props.initialRegion.latitude;
      this.state.longitude = props.initialRegion.longitude;
    }
    if(props.region){
      this.state.latitude = props.region.latitude;
      this.state.longitude = props.region.longitude;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps !==this.props){
      if(nextProps.region){
        nextState.latitude = nextProps.latitude;
        nextState.longitude = nextProps.longitude;
        if(nextProps.region){
          nextState.latitude = nextProps.region.latitude;
          nextState.longitude = nextProps.region.longitude;
        }

      }
    }
    return true;
  }


  render() {
    var style = { width:"100%",height:"100%"};
    if(this.props.style){
      var lista = [];
      if( Array === this.props.style.constructor){
        lista = this.props.style;
      }else{
        lista.push(this.props.style);
      }
      for (var a = 0; a < lista.length; a++) {
        var st = lista[a];
        if(!st){
          continue;
        }
        var tags = Object.keys(st);
        for (var i = 0; i < tags.length; i++) {
          style[tags[i]] = st[tags[i]];
        }
      }
    }
    // console.log(this.state);
    // <Circle strokeColor='#cccccc'
    //   lat={this.state.latitude}
    //   lng={this.state.longitude}
    //   radius={100}  />
    // console.log(this.state);
    return (
      <Gmaps style={style}
        width={'500px'} mapTypeControl={false}
        height={'500px'}
        lat={this.state.latitude}
        lng={this.state.longitude}
        zoom={13}
        loadingMessage={'Carregando'}
        params={{v: '3.exp'}} >


        <Marker
          lat={this.state.latitude}
          lng={this.state.longitude}
          draggable={false}
          />
      </Gmaps>
    );
  }

}

// export default MapView;
