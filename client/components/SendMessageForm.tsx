import * as React from 'react';

interface IState {
  message: string
}

interface IProps {
  sendMessage: (text: string)=> void //sendMessage is a funtcion takes text as input and return nothing

}

class SendMessageForm extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.message)
    this.props.sendMessage(this.state.message)//give acces to sendMessage from sendMessage in index.tsx 
    this.setState({ message: '' });
  }

  render() {
    return (
      <form//forms kinda keep their own state
        onSubmit={this.handleSubmit}
        className="send-message-form">
        <input
          value={this.state.message}
          onChange={event => this.setState({ message: event.target.value })}//when ever the value changes the message becasome the input value
          type="text"
          placeholder="Type message here"
        />
        <button>send</button>
      </form>
      
    )
  }
}

export default SendMessageForm;