import React, { Component } from 'react';

class Toolbar extends Component {

  thisIsBullshit = () => {
    let disabled = false
    // console.log(this.props.state.map(item => item.id))
    const isDisabled = this.props.state.map(item => {
      if(item.selected){
        console.log("true")
        return true
      } else {
        console.log("false")
        return false
      }
    })
    const result = isDisabled.includes(true) ? false : true
    // const result = this.props.state.selected ? console.log("true") : console.log("false")
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

                {this.thisIsBullshit()}

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