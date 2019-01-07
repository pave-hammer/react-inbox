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

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    return await fetch("http://localhost:8082/api/messages")
    .then(response => response.json())
    .then(res => {
      res.map(messages => {
        messages.read = false
        messages.starred = false
        messages.selected = false
        return messages
      })
      this.setState({
        messages: res
      })
    })
    .catch(error => console.error(error))
  }

  messageRead = (id) => {
    const updatedMessage = this.state.messages.map(message => { 
      if(message.id === id) {
        message.read = true
      }
      return message
    })

    this.setState({
      messages: updatedMessage
    })
  }

  selectedMessage = (id) => {
    const updatedMessage = this.state.messages.map(message => {
      if(message.id === id) {
        message.selected = !message.selected
      }
      return message
    })

    this.setState({
      messages: updatedMessage
    })
  }

  starredMessage = (id) => {
    const updatedMessage = this.state.messages.map(message => {
      if(message.id === id) {
        message.starred = !message.starred
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
        <Toolbar 
          state={ this.state.messages }/>
        <MessageList 
          state={ this.state.messages } 
          messageRead={ this.messageRead }
          selectedMessage={ this.selectedMessage }
          starredMessage={ this.starredMessage }/>
      </div>
    );
  }
}

export default App;
