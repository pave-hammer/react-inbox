import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/toolbar.js';
import MessageList from './components/messages-list.js';

class App extends Component {

  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  getData = async () => {
    let result = await fetch("http://localhost:8082/api/messages")
    .then(response => response.json())
    .then(res => {
      this.setState({
        messages: res
      })
    })
    .catch(error => console.error(error))
    return result
  }

  componentDidMount() {
    this.getData()
  }

  messageRead = (id) => {
    const updatedMessage = this.state.messages.map(message => {
      if(message.id === id) {
        message.read = !message.read
      }
      return message
    })

    this.setState({
      messages: updatedMessage
    })
  }

  render() {
    return (
      <div className="container">
        <Toolbar />
        <MessageList state={ this.state.messages } messageRead={ this.messageRead } />
      </div>
    );
  }
}

export default App;
