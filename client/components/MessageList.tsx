import * as React from 'react';
import Message from './Message';


export interface IMessage { //exported the massages state 
  id: number
  senderId: string
  text: string
  roomId: string
  createdAt: string

}

interface IProps { //messages property
  messages: IMessage[] //will contain senderId and content

}

class MessageList extends React.Component<IProps> {
  render() {
    const {messages} = this.props//important
    return (
      <div className="message-list">
        {messages.map(({ id, senderId, text }) => //map these props
          <Message  key={id} username={senderId} content={text} />
        )}
      </div>
    )
  }
}

export default MessageList;