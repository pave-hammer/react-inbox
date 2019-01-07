import React, { Component } from 'react';
import Message from './messages.js'

class MessageList extends Component {

    render(){
        // console.log("Props", this.props.state)

        return (
            <div>
                {this.props.state.map((subject, idx) => {
                  return <Message
                    key={ idx }
                    sub={ subject }
                    messageRead={ this.props.messageRead }
                    selectedMessage={ this.props.selectedMessage }
                    starredMessage={ this.props.starredMessage }/>
                })}
            </div>
        )
    }
}

export default MessageList