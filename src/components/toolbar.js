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
    let test = "fa fa-square-o"
    const select = this.props.state.filter(message => message.selected === true)
    const updatedMessage = this.props.state.map(message => {
      if(select.length !== 0 && select.length !== this.props.state.length) {
        test = "fa fa-minus-square-o"
      } else if(select.length !== 0 && select.length === this.props.state.length) {
        test = "fa fa-check-square-o"
      } else {
        return test
      }
      return message
    })
    return (
      <button className="btn btn-default" onClick={() => this.props.selectAll()}><i className={test}></i></button>
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
      <select className="form-control label-select" >
        <option>Remove label</option>
        <option value="dev">dev</option>
        <option value="personal">personal</option>
        <option value="gschool">gschool</option>
      </select>
    )
  }

  render() {
    return (
      <div className="container">
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                  <span className="badge badge">2</span>
                  unread messages
                </p>

                {this.selectedAll()}

                {this.markAsReadToggle()}

                {this.markAsUnreadToggle()}

                {this.addLabel()}

                {this.removeLabel()}

                <button className="btn btn-default" disabled="disabled">
                  <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
      </div>
    );
  }
}

export default Toolbar;