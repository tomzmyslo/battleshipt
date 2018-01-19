import React, { Component } from 'react'
import './Board.css';
import Cell from './Cell'

export default class Board extends Component {
  render() {
    return(
      <div className={this.props.player} style={{backgroundColor: this.props.boardColor, borderColor: this.props.boardColor}}>
        <p className="player-label">{this.props.name}</p>
        {this.props.board.map((cell, i) => {
          if (this.props.hits.indexOf(i) >= 0) {
            return (
              <Cell key={i} value={cell} location={i} color="red" player={this.props.player} checkStrike={this.props.checkStrike} />
            )
          } else if (this.props.misses.indexOf(i) >= 0) {
            return (
              <Cell key={i} value={cell} location={i} color="white" player={this.props.player} checkStrike={this.props.checkStrike} />
            )
          } else {
            return (
              <Cell key={i} value={cell} location={i} color="" player={this.props.player} checkStrike={this.props.checkStrike} />
            )
          }

        })}
      </div>
    )
  }
}
