import React, { Component } from 'react'
import './Cell.css'

export default class Cell extends Component {
  render() {
    let i = this.props.location + 1
    let p = this.props.player
    return(
      <button onClick={() => this.props.checkStrike(p, i)} className="coordinate">{this.props.value}</button>
    )
  }
}
