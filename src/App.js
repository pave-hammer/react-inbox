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

  markAsUnread = () => {
    // console.log("id", id)
    const updatedMessage = this.state.messages.map(message => { 
      if(message.selected && message.read) {
        message.read = false
      }
      return message
    })

    this.setState({
      messages: updatedMessage
    })
  }

  markAsRead = () => {
    const updatedMessage = this.state.messages.map(message => {
      if(message.selected && !message.read) {
        message.read = true
      }
      return message
    })

    this.setState({
      messages: updatedMessage
    })
  }

  selectAll = () => {
    const select = this.state.messages.filter(message => message.selected === true)
    const updatedMessage = this.state.messages.map(message => {
      select.length !== this.state.messages.length ? message.selected = true : message.selected = false
      return message
    })

    this.setState({
      messages: updatedMessage
    })
  }

  addLabel = (event) => {
    const select = this.state.messages.filter(message => message.selected === true)
    const updatedMessage = this.state.messages.map(message => {
      select.length !== 0 ? console.log("true") : console.log("false")
    })
  }

  removeLabel = () => {
    console.log("removeLabel works")
  }

  render() {
    return (
      <div className="container">
        <Toolbar 
          state={ this.state.messages }
          markAsUnread={ this.markAsUnread }
          markAsRead={ this.markAsRead }
          selectAll={ this.selectAll }
          addLabel={ this.addLabel }
          removeLabel={ this.removeLabel }/>
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
