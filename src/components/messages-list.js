import React, { Component } from 'react';
import Message from './messages.js'

class MessageList extends Component {

    render(){
        // console.log("Props", this.props)
        return (
            <div>
                {this.props.state.map((subject, idx) => {
                  return <Message
                    key={ idx }
                    sub={ subject }
                    messageRead={ this.props.messageRead }/>
                })}
            </div>
        )
    }
}

export default MessageList