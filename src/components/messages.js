import React, { Component } from 'react';

class Message extends Component {
    
    render(){
        // console.log("child props -", this.props)
        const subject = this.props.sub.subject

        const classInfo = () => {
            let classDefault = "row message"
            const read = this.props.sub.read ? `${classDefault} read` : `${classDefault} unread`
            const selected = this.props.sub.selected ? `${read} selected` : `${read}`
            return selected
        }

        return (
            <div className="container">
                <div className="col-xs-1">
                  <div className="row">
                    <div className="col-xs-2">
                      <input type="checkbox" onClick={ () => this.props.selectedMessage(this.props.sub.id) }/>
                    </div>
                    <div className="col-xs-2">
                      <i className={ this.props.sub.starred ? `star fa fa-star` : `star fa fa-star-o` } onClick={ () => this.props.starredMessage(this.props.sub.id) }></i>
                    </div>
                  </div>
                </div>
                <div className={ classInfo() } onClick={ () => this.props.messageRead(this.props.sub.id) }>
                  <div className="col-xs-11">
                    <a href="/#">
                      { subject }
                    </a>
                  </div>
                </div>
            </div>
        )
    }
}

export default Message