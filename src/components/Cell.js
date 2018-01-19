import React, { Component } from 'react'
import './Cell.css'

export default class Cell extends Component {
  render() {
    let i = this.props.location
    let p = this.props.player // Delete this variable later
    return(
      <button onClick={() => this.props.checkStrike(p, i)} className="coordinate" style={{backgroundColor: this.props.color}}>{this.props.value}</button>
    )
  }
}
