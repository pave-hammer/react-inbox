import React, { Component } from 'react';
import './App.css';
import Toolbar from './components/toolbar.js';
import MessageList from './components/messages-list.js';
import ComposeForm from './components/compose.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: [],
      active: false
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
          messages.read = messages.read || false
          messages.starred = messages.starred || false
          messages.selected = messages.selected || false
          messages.opened = messages.opened || false
          return messages
        })
        this.setState({
          messages: res
        })
      })
      .catch(error => console.error(error))
  }

  stateUpdate = (message) => {
    this.setState({
      messages: message
    })
  }

  messageRead = (id) => {
    const updatedMessage = this.state.messages.map(message => {
      if (message.id === id) {
        message.read = true
        message.opened = !message.opened
      }
      return message
    })

    this.stateUpdate(updatedMessage)
  }

  selectedMessage = (id) => {
    const updatedMessage = this.state.messages.map(message => {
      if (message.id === id) {
        message.selected = !message.selected
      }
      return message
    })

    this.stateUpdate(updatedMessage)
  }

  starredMessage = (id) => {
    const updatedMessage = this.state.messages.map(message => {
      if (message.id === id) {
        message.starred = !message.starred
      }
      return message
    })

    this.stateUpdate(updatedMessage)
  }

  markAsUnread = () => {
    const updatedMessage = this.state.messages.map(message => {
      if (message.selected && message.read) {
        message.read = false
      }
      return message
    })

    this.stateUpdate(updatedMessage)
  }

  markAsRead = () => {
    const updatedMessage = this.state.messages.map(message => {
      if (message.selected && !message.read) {
        message.read = true
      }
      return message
    })

    this.stateUpdate(updatedMessage)
  }

  selectAll = () => {
    const select = this.state.messages.filter(message => message.selected === true)
    const updatedMessage = this.state.messages.map(message => {
      select.length !== this.state.messages.length ? message.selected = true : message.selected = false
      return message
    })

    this.stateUpdate(updatedMessage)
  }

  addLabel = (event) => {
    const updatedMessage = this.state.messages.map(message => {
      const label = message.labels.includes(event.target.value)
      if (message.selected === true && !label) {
        message.labels = [...message.labels, event.target.value]
      }
      return message
    })

    this.stateUpdate(updatedMessage)
  }

  removeLabel = (event) => {
    const updatedMessage = this.state.messages.map(message => {
      const label = message.labels.includes(event.target.value)
      if (message.selected === true && label) {
        const index = message.labels.indexOf(event.target.value)
        message.labels.splice(index, 1)
      }
      return message
    })

    this.stateUpdate(updatedMessage)
  }

  deleteMessage = () => {
    const updatedMessage = this.state.messages.filter(message => message.selected)
    const ids = updatedMessage.map(message => message.id)
    const test = this.state.messages.filter(message => !message.selected)
    this.stateUpdate(test)
    this.updates(ids, "delete", "delete")
  }

  showCompose = () => {
    this.setState({
      active: !this.state.active
    })
  }

  composeMessage = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  sendMessage = (event) => {
    event.preventDefault()
    return fetch("http://localhost:8082/api/messages", {
      method: "POST",
      body: JSON.stringify({
        subject: this.state.subject,
        body: this.state.body
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({
          messages: [...this.state.messages, response]
        })
      })
      .catch(error => console.error(error))
  }

  updates = async (ids, command, prop, value) => {
    let message = {
      messageIds: ids,
      command: command,
      [prop]: value
    }
    await fetch("http://localhost:8082/api/messages", {
      method: "PATCH",
      body: JSON.stringify(message),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      }
    })
  }

  render() {
    return (
      <div className="container">
        <Toolbar
          state={this.state.messages}
          markAsUnread={this.markAsUnread}
          markAsRead={this.markAsRead}
          selectAll={this.selectAll}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          deleteMessage={this.deleteMessage}
          showCompose={this.showCompose}
          unreadCount={this.unreadCount} />
        {this.state.active === true ? <ComposeForm sendMessage={this.sendMessage} composeMessage={this.composeMessage} /> : null}
        <MessageList
          state={this.state.messages}
          messageRead={this.messageRead}
          selectedMessage={this.selectedMessage}
          starredMessage={this.starredMessage} />
      </div>
    );
  }
}
export default App;