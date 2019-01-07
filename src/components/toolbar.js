import React, { Component } from 'react';

class Toolbar extends Component {

  markAsReadToggle = () => {
    const isDisabled = this.props.state.map(item => item.selected ? true : false)
    const result = isDisabled.includes(true) ? false : true
    return (
      <button className="btn btn-default" disabled={(result)}>Mark As Read</button>
    )
  }

  render() {

    return (
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                  <span className="badge badge">2</span>
                  unread messages
                </p>

                <button className="btn btn-default">
                  <i className="fa fa-square-o"></i>
                </button>

                {this.markAsReadToggle()}

                <button className="btn btn-default" disabled="disabled">
                  Mark As Unread
                </button>

                <select className="form-control label-select" disabled="disabled">
                  <option>Apply label</option>
                  <option value="dev">dev</option>
                  <option value="personal">personal</option>
                  <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select" disabled="disabled">
                  <option>Remove label</option>
                  <option value="dev">dev</option>
                  <option value="personal">personal</option>
                  <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" disabled="disabled">
                  <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    );
  }
}

export default Toolbar;