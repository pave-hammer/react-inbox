import React, { Component } from 'react';

class Message extends Component {
  render() {
    const subject = this.props.sub.subject

    const classInfo = () => {
      let classDefault = "row message"
      const read = this.props.sub.read ? `${classDefault} read` : `${classDefault} unread`
      const selected = this.props.sub.selected ? `${read} selected` : `${read}`
      return selected
    }

    const labels = () => {
      const label = this.props.sub.labels.map((message, idx) => {
        return (
          <span key={idx} className="label label-warning">{message}</span>
        )
      })
      return label
    }

    const opened = () => {
      const style =
        <div className="row message-body">
          <div className="col-xs-11 col-xs-offset-1">
            {this.props.sub.body}
          </div>
        </div>
      return this.props.sub.opened !== true ? null : style
    }

    return (
      <div>
        <div className="col-xs-1">
          <div className="row">
            <div className="col-xs-2">
              <input type="checkbox" checked={this.props.sub.selected} onChange={() => this.props.selectedMessage(this.props.sub.id)} />
            </div>
            <div className="col-xs-2">
              <i className={this.props.sub.starred ? `star fa fa-star` : `star fa fa-star-o`} onClick={() => this.props.starredMessage(this.props.sub.id)}></i>
            </div>
          </div>
        </div>
        <div className={classInfo()} onClick={() => this.props.messageRead(this.props.sub.id)}>
          <div className="col-xs-11">
            {labels()}
            <a href="/#">
              {subject}
            </a>
          </div>
        </div>
        {opened()}
      </div>
    )
  }
}
export default Message