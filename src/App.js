import React, { Component } from 'react';
import './App.css';
import Board from './components/Board'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      player1: "Player 1",
      player2: "Player 2",
      board1: [
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
      ],
      board2: [
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,
      ],
    }

    this.newGame = this.newGame.bind(this)
    this.setPlayerOne = this.setPlayerOne.bind(this)
    this.setPlayerTwo = this.setPlayerTwo.bind(this)
    this.flip = this.flip.bind(this)
    this.checkStrike = this.checkStrike.bind(this)
  }

  newGame() {
    console.log("Inside newGame()")
    this.setPlayerOne()
    this.setPlayerTwo()
  }

  setPlayerOne() {
    let player1 = prompt("Enter Player 1's Name.")
    if (player1 === null || player1 === "") {
      return
    } else {
      this.setState({player1: player1})
    }
  }

  setPlayerTwo() {
    let player2 = prompt("Enter Player 2's Name.")
    if (player2 === null || player2 === "") {
      return
    } else {
      this.setState({player2: player2})
    }
  }

  flip() {
    let flipped = document.getElementById('boards').classList.contains('flip')
    if (flipped === true) {
      document.getElementById("boards").classList.remove("flip")
    } else {
      document.getElementById("boards").classList.add("flip")
    }
  }

  checkStrike(player, location) {
    let string = `${player} clicked ${location}!`
    console.log(string)
    setTimeout(() => this.flip(), 1000)
  }

  render() {
    return (
      <div className="App">

        <header className="header">
          <h1 className="title">BattleShipt</h1>
        </header>

        <div className="game-area">
          <button onClick={this.newGame}>New Game</button>
          <div id="boards">
            <Board name={this.state.player1} checkStrike={this.checkStrike} board={this.state.board1} boardColor="dodgerblue" player="one" />
            <Board name={this.state.player2} checkStrike={this.checkStrike} board={this.state.board2} boardColor="tomato" player="two" />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
