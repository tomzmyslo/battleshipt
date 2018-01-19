import React, { Component } from 'react'
import './Cell.css'

export default class Cell extends Component {
  render() {
    let location = this.props.location
    let player = this.props.player
    return(
      <button onClick={() => this.props.checkStrike(player, location)} className="coordinate" style={{backgroundColor: this.props.color}}>
        {
          // this.props.value
        }
      </button>
    )
  }
}
