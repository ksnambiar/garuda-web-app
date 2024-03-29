import React, { Component } from 'react'
import Notification from "react-web-notification"
import {firebase} from "../../utils/Firebase"

export default class Nofications extends Component {
    constructor(props) {
        super(props);
        this.state = {
          ignore: true,
          title: ''
        };
      }
      componentDidMount(){
        firebase.database().ref('reports').on('child_added',(error,data)=>{
            console.log(data,error)
            this.handleButtonClick()
          })
      }
    
      handlePermissionGranted(){
        console.log('Permission Granted');
        this.setState({
          ignore: false
        });
      }
      handlePermissionDenied(){
        console.log('Permission Denied');
        this.setState({
          ignore: true
        });
      }
      handleNotSupported(){
        console.log('Web Notification not Supported');
        this.setState({
          ignore: true
        });
      }
    
      handleNotificationOnClick(e, tag){
        console.log(e, 'Notification clicked tag:' + tag);
      }
    
      handleNotificationOnError(e, tag){
        console.log(e, 'Notification error tag:' + tag);
      }
    
      handleNotificationOnClose(e, tag){
        console.log(e, 'Notification closed tag:' + tag);
      }
    
      handleNotificationOnShow(e, tag){
        // this.playSound();
        console.log(e, 'Notification shown tag:' + tag);
      }
    
      playSound(filename){
        document.getElementById('sound').play();
      }
    
      handleButtonClick() {
    
        if(this.state.ignore) {
          return;
        }
    
        const now = Date.now();
    
        const title = 'React-Web-Notification' + now;
        const body = 'Hello' + new Date();
        const tag = now;
        const icon = 'http://mobilusoss.github.io/react-web-notification/example/Notifications_button_24.png';
        // const icon = 'http://localhost:3000/Notifications_button_24.png';
    
        // Available options
        // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
        const options = {
          tag: tag,
          body: body,
          icon: icon,
          lang: 'en',
          dir: 'ltr',
        //   sound: './sound.mp3'  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
        }
        this.setState({
          title: title,
          options: options
        });
      }
    
      handleButtonClick2() {
        this.props.swRegistration.getNotifications({}).then(function(notifications) {
          console.log(notifications);
        });
      }
    render() {
        return (
            <div>
                        {/* <button onClick={this.handleButtonClick.bind(this)}>Notif!</button> */}
                <Notification
          ignore={this.state.ignore && this.state.title !== ''}
          notSupported={this.handleNotSupported.bind(this)}
          onPermissionGranted={this.handlePermissionGranted.bind(this)}
          onPermissionDenied={this.handlePermissionDenied.bind(this)}
          onShow={this.handleNotificationOnShow.bind(this)}
          onClick={this.handleNotificationOnClick.bind(this)}
          onClose={this.handleNotificationOnClose.bind(this)}
          onError={this.handleNotificationOnError.bind(this)}
          timeout={5000}
          title={this.state.title}
          options={this.state.options}
          swRegistration={this.props.swRegistration}
        />
            </div>
        )
    }
}
