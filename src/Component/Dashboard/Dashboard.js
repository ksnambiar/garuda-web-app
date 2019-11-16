import React, { Component } from 'react'
import Notifications from "../Common/Nofications"
import Weather from "./Weather"
import {Row,Col, Spinner} from "react-bootstrap"
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import Overlay from 'pigeon-overlay'
import MapBox from "./MapBox"
import Graph from "./Graph"
import RecentReports from "./RecentReports"
export default class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            latitude:null,
            longitude:null,
            chosenlatitude:null,
            chosenlongitutde:null
            // data:null
       }
       this.mapChangeEvent = this.mapChangeEvent.bind(this)
    }

    componentDidMount(){
        const location = window.navigator && window.navigator.geolocation
        
        if (location) {
          location.getCurrentPosition((position) => {
              console.log('check 1')
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
            // resolve(true)
          }, (error) => {
            this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
            // reject(false)
          })
        }
    }
    mapChangeEvent(e){
        this.setState({
            chosenlatitude:e.latLng[0],
            chosenlongitude:e.latLng[1]
        })
    }
    render() {
        return (
            <div>
                {this.state.latitude?<div>
                {/* <Notifications /> */}
                <Row>
                    <Col md={8}>
                    {/* <Map center={[this.state.latitude, this.state.longitude]} zoom={9} width={600} height={400} onClick={this.mapChangeEvent}>
    <Marker anchor={[this.state.latitude, this.state.longitude]} payload={1} onClick={({ event, anchor, payload }) => {
        console.log(event,anchor,payload)
    }} />
    <Overlay anchor={[this.state.latitude, this.state.longitude]} offset={[120, 79]}>
    </Overlay>
    {
        this.state.chosenlatitude?<Marker anchor={[this.state.chosenlatitude, this.state.chosenlongitude]} payload={2} onClick={({ event, anchor, payload }) => {
            console.log(event,anchor,payload)
        }} />:null
    }
  </Map>
  <div>
</div> */}
<RecentReports />
                    </Col>
                        <Col md={4}>
                            <Row className="mv3">
                                <Col>
                                <Weather />
                                </Col>
                            </Row>
                            <Row className="mv3">
                            <Col>
{    this.state.latitude?<MapBox latitude={this.state.latitude} longitude={this.state.longitude} />
:<Spinner animation="grow" variant="primary" />}
                    </Col>
                            </Row>
                            <Row className="mv3">
                            <Graph />
                            </Row>
                        </Col>
                </Row>
                <Row>
                    <Col>
                    </Col>
                </Row>
                </div>:<div>  <Spinner animation="grow" variant="primary" /></div>
}
            </div>
        )
    }
}
