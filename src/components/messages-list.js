import React, { Component } from 'react';
import Message from './messages.js'

class MessageList extends Component {
  render() {
    return (
      <div>
        {this.props.state.map((subject, idx) => {
          return <Message
            key={idx}
            sub={subject}
            messageRead={this.props.messageRead}
            selectedMessage={this.props.selectedMessage}
            starredMessage={this.props.starredMessage}
            onClick={this.props.showBody} />
        })}
      </div>
    )
  }
}
export default MessageList