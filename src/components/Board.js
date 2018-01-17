import React, { Component } from 'react'
import './Board.css';
import Cell from './Cell'

export default class Board extends Component {
  render() {
    return(
      <div className={this.props.player} style={{backgroundColor: this.props.boardColor, borderColor: this.props.boardColor}}>
        <p className="player-label">{this.props.name}</p>
        {this.props.board.map((cell, i) => {
          return (
            <Cell key={i} value={cell} location={i} player={this.props.name} checkStrike={this.props.checkStrike} />
          )
        })}
      </div>
    )
  }
}
