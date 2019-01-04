import React, { Component } from 'react';

class Message extends Component {
    
    render(){
        console.log("child props -", this.props.sub.read)
        const subject = this.props.sub.subject
        // console.log(subject)
        return (
            <div className={this.props.sub.read ? "row message read" : "row message unread"} onClick={() => this.props.messageRead(this.props.sub.id)}>            
              <div className="col-xs-1">
                <div className="row">
                  <div className="col-xs-2">
                    <input type="checkbox" />
                  </div>
                  <div className="col-xs-2">
                    <i className="star fa fa-star-o"></i>
                  </div>
                </div>
              </div>
              <div className="col-xs-11">
                <a href="/#">
                  {subject}
                </a>
              </div>
            </div>
        )
    }
}

export default Message