import React, { Component } from 'react';

class Toolbar extends Component {

  markAsReadToggle = () => {
    const isDisabled = this.props.state.map(item => item.selected && !item.read ? true : false)
    const result = isDisabled.includes(true) ? false : true
    return (
      <button className="btn btn-default" disabled={(result)} onClick={() => this.props.markAsRead()}>Mark As Read</button>
    )
  }

  markAsUnreadToggle = () => {
    const isDisabled = this.props.state.map(item => item.read && item.selected ? true : false)
    const result = isDisabled.includes(true) ? false : true
    return (
      <button className="btn btn-default" disabled={(result)} onClick={() => this.props.markAsUnread()}>Mark As Unread</button>
    )
  }

  selectedAll = () => {
    let icon = "fa fa-square-o"
    const select = this.props.state.filter(message => message.selected === true)
    const updatedMessage = this.props.state.map(message => {
      if(select.length !== 0 && select.length !== this.props.state.length) {
        icon = "fa fa-minus-square-o"
      } else if(select.length !== 0 && select.length === this.props.state.length) {
        icon = "fa fa-check-square-o"
      } else {
        return icon
      }
      return message
    })
    return (
      <button className="btn btn-default" onClick={() => this.props.selectAll()}><i className={icon}></i></button>
    )
  }

  addLabel = () => {
    return (
      <select className="form-control label-select" onClick={(event) => this.props.addLabel(event)}>
       <option>Apply label</option>
       <option value="dev">dev</option>
       <option value="personal">personal</option>
       <option value="gschool">gschool</option>
     </select>
    )
  }

  removeLabel = () => {
    return (
      <select className="form-control label-select" onClick={(event) => this.props.removeLabel(event)}>
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>
    )
  }

  delete = () => {
    return (
      <a href="/#" value="false" className="btn btn-default" onClick={() => this.props.deleteMessage()}>
        <i className="fa fa-trash-o"></i>
      </a>
    )
  }

  compose = () => {
    return (
      <button className="btn btn-danger" onClick={() => this.props.showCompose()}><i className="fa fa-plus"></i></button>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                  <span className="badge badge">{this.props.unreadCount()}</span>
                  unread messages
                </p>

                {this.compose()}

                {this.selectedAll()}

                {this.markAsReadToggle()}

                {this.markAsUnreadToggle()}

                {this.addLabel()}

                {this.removeLabel()}

                {this.delete()}
            </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;