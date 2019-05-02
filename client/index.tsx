// React
import * as React from 'react';
import * as ReactDOM from 'react-dom';

//imported files
import './index.scss';
import Chatkit from '@pusher/chatkit-client';
import RoomList from './components/RoomList';
import MessageList, {IMessage} from './components/MessageList';
import SendMessageForm from './components/SendMessageForm';
import NewRoomForm from './components/NewRoomForm';
import { tokenUrl, instanceLocator } from './chatkit'

interface IState {
  roomId: string
  currentUser: any //set state of curent user
  messages: IMessage[] //state of messages
}
//State is private to a component
//props is is not provate and is shared between compoents
// Import App, which is the main react component
class App extends React.Component<{}, IState> {
  currentUser: any
  constructor(props) {
    super(props)
    this.state = {
      roomId: "20580718",
      currentUser: null,
      messages: []// set to an empty array
    }
    
  }


  componentDidMount() {
    const chatManager = new Chatkit.ChatManager ({
      instanceLocator,
      userId: 'slick-Rick',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })//after connection has been estiblished with api

    chatManager.connect().then(currentUser => {
      this.setState({ currentUser });
      currentUser.subscribeToRoom({
        roomId: this.state.roomId,// set state of roomId to current roomId
        messageLimit: 5,
        hooks: {
          onMessage: (message: IMessage) => {//importtant for diplay messages
            let messages = this.state.messages
            messages.push(message)
            this.setState({ messages })
            //this.setState({messages})
            console.log(message)
          }
        }
      });

      currentUser.fetchMultipartMessages({
        roomId: this.state.roomId.toString(),
      })
        .then(messages => {
          console.log(messages)
          this.setState({ messages });
          // do something with the messages

        })
        .catch(err => {
          console.log(`Error fetching messages: ${err}`)
        })

    })

  }

  sendMessage(text: string) {//apon submit 
    const { roomId } = this.state// roomId will the be the crrent state
    this.state.currentUser.sendMessage({ text, roomId})//
    //need to use inverse data flow
  }

  render() {
    const { currentUser } = this.state;
    const isLoading = currentUser === null;
    if (isLoading) return (<h1>Loading...</h1>);
    return (
      <div className="main">
        <RoomList />
        <MessageList messages={this.state.messages}/> {/*how you pass down props to component*/}
        <SendMessageForm sendMessage={this.sendMessage.bind(this)}/>{/*inverse data flow binded this to sendMessage*/}
        <NewRoomForm/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("render-target"));