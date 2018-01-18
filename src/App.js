import React, { Component } from 'react';
import './App.css';
import Board from './components/Board'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      flipped: false,
      inPlay: false,
      msg: "",
      player1name: "Player 1",
      player1score: 0,
      player1hits: [],
      player1misses: [],
      player1board: [
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
      player2name: "Player 2",
      player2score: 0,
      player2hits: [],
      player2misses: [],
      player2board: [
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
    this.reset = this.reset.bind(this)
    this.setPlayerOneName = this.setPlayerOneName.bind(this)
    this.setPlayerTwoName = this.setPlayerTwoName.bind(this)
    this.setPlayerOneShips = this.setPlayerOneShips.bind(this)
    this.setPlayerTwoShips = this.setPlayerTwoShips.bind(this)
    this.setShipData = this.setShipData.bind(this)
    this.determineShips = this.determineShips.bind(this)
    this.generateHorizontalShip = this.generateHorizontalShip.bind(this)
    this.generateVerticalShip = this.generateVerticalShip.bind(this)
    this.checkCollision = this.checkCollision.bind(this)
    this.flip = this.flip.bind(this)
    this.checkStrike = this.checkStrike.bind(this)
  }

  newGame() {
    console.log("Starting New Game")
    this.setState({inPlay: true})
    this.setPlayerOneName()
    this.setPlayerTwoName()
    this.setPlayerOneShips()
    this.setPlayerTwoShips()
  }

  reset() {
    window.location.reload()
  }

  setPlayerOneName() {
    let name = prompt("Enter Player 1's Name.")
    if (name === null || name === "") {
      name = "Player 1"
      this.setState({player1name: name})
    } else {
      this.setState({player1name: name})
    }
  }

  setPlayerTwoName() {
    let name = prompt("Enter Player 2's Name.")
    if (name === null || name === "") {
      name = "Player 2"
      this.setState({player2name: name})
    } else {
      this.setState({player2name: name})
    }
  }

  setPlayerOneShips() {
    let player = 1
    this.setShipData(player)
  }

  setPlayerTwoShips() {
    let player = 2
    this.setShipData(player)
  }

  setShipData(player) {
    let carrier = {
      name: "Carrier",
      hits: 5,
      abbr: "C",
    }
    let battleship = {
      name: "Battleship",
      hits: 4,
      abbr: "B",
    }
    let destroyer = {
      name: "Destroyer",
      hits: 3,
      abbr: "D",
    }
    let submarine = {
      name: "Submarine",
      hits: 3,
      abbr: "S",
    }
    let patrol = {
      name: "Patrol Boat",
      hits: 2,
      abbr: "P",
    }
    let directions = [ 'H', 'V']
    let ships = [ carrier, battleship, destroyer, submarine, patrol ]
    for (let i = 0; i < ships.length; i++) {
      let direction = directions[Math.floor(Math.random() * directions.length)]
      this.determineShips(player, direction, ships[i])
    }
  }

  determineShips(player, direction, ship) {
    if (direction === 'H') {
      this.generateHorizontalShip(player, ship)
    } else if (direction === 'V') {
      this.generateVerticalShip(player, ship)
    }
  }

  generateHorizontalShip(player, ship) {
    let startingPoint = Math.floor((Math.random() * 100) + 1) + 1
    let shipMass = startingPoint + ship.hits
    let shipArray = []
    let rounded = (Math.round(startingPoint / 10) * 10)

    // console.log(`Starting: ${startingPoint} / Ship: ${ship.name} / Mass: ${shipMass} / Rounded: ${rounded}`);

    if ((shipMass - rounded) > ship.hits) {
      for (let i = startingPoint; i < startingPoint + ship.hits; i++) {
        shipArray.push(i)
      }
    } else if ((shipMass - rounded) < ship.hits || shipMass - rounded === ship.hits) {
      for (let i = startingPoint; i > startingPoint - ship.hits; i--) {
        shipArray.push(i)
      }
    }

    let sortedShipArray = shipArray.sort((a, b) => {return a - b})

    // console.log("Sorted: " + sortedShipArray)

    if (this.checkCollision(player, sortedShipArray) === true) {
      // console.log("sortedShipArray[0] = " + sortedShipArray[0]);
      // console.log("sortedShipArray.length = " + sortedShipArray.length);
      let updatedBoard = []
      if (player === 1) {
        updatedBoard = this.state.player1board
      } else if (player === 2) {
        updatedBoard = this.state.player2board
      }

      for (let i = sortedShipArray[0]; i < (sortedShipArray[0] + sortedShipArray.length); i++) {
        updatedBoard[i-1] = ship.abbr
      }

      if (player === 1) {
        this.setState({player1board: updatedBoard})
      } else if (player === 2) {
        this.setState({player2board: updatedBoard})
      }

    } else {
      this.generateHorizontalShip(player, ship)
    }
  }

  generateVerticalShip(player, ship) {
    let startingPoint = Math.floor((Math.random() * 100) + 1) + 1
    let shipMass = ship.hits * 10
    let shipArray = []

    // console.log(`Starting: ${startingPoint} / Ship: ${ship.name} / Mass: ${shipMass}`);

    if ((startingPoint + shipMass) > 101) {
      for (let i = startingPoint; i > (startingPoint - shipMass); i -= 10) {
        shipArray.push(i)
      }
    } else if ((startingPoint + shipMass) < 101 || (startingPoint - shipMass) < 1) {
      for (let i = startingPoint; i < (startingPoint + shipMass); i += 10) {
        shipArray.push(i)
      }
    }

    let sortedShipArray = shipArray.sort((a, b) => {return a - b})

    // console.log("Sorted: " + sortedShipArray)

    if (this.checkCollision(player, sortedShipArray) === true) {
      // console.log("sortedShipArray[0] = " + sortedShipArray[0]);
      // console.log("sortedShipArray.length = " + sortedShipArray.length);
      let updatedBoard
      if (player === 1) {
        updatedBoard = this.state.player1board
      } else if (player === 2) {
        updatedBoard = this.state.player2board
      }

      for (let i = sortedShipArray[0]; i < (sortedShipArray[0] + (sortedShipArray.length * 10)); i += 10) {
        updatedBoard[i-1] = ship.abbr
      }

      if (player === 1) {
        this.setState({player1board: updatedBoard})
      } else if (player === 2) {
        this.setState({player2board: updatedBoard})
      }

    } else {
      this.generateVerticalShip(player, ship)
    }
  }

  checkCollision(player, shipArray) {
    let board
    if (player === 1) {
      board = this.state.player1board
    } else if (player === 2) {
      board = this.state.player2board
    }
    // console.log(board);
    let distance = (shipArray[1] - shipArray[0])
    if (distance === 10) {
      for (let i = shipArray[0]; i < (shipArray[0] + (shipArray.length * 10));) {
        // console.log(board[i] + " == 0");
        if (board[i] === 0) {
          i += 10
        } else {
          return false
        }
      }
      return true
    } else if (distance === 1) {
      for (let i = shipArray[0]; i < (shipArray[0] + shipArray.length);) {
        // console.log(board[i] + " == 0");
        if (board[i] === 0) {
          i++
        } else {
          return false
        }
      }
      return true
    }
  }

  flip() {
    if (this.state.flipped === true) {
      document.getElementById("boards").classList.remove("flip")
    } else {
      document.getElementById("boards").classList.add("flip")
    }
    this.setState({flipped: !this.state.flipped})
  }

  checkStrike(player, location) {
    let string = `${player} clicked ${location + 1}!`
    console.log(string)
    if (player === "one") {
      let board = this.state.player2board
      let hitMsg = `You hit ${this.state.player2name}'s '`
      let sorryCharlie = "Sorry Charlie, that's a miss."
      switch(board[location]) {
        case 0:
          this.setState({msg: sorryCharlie})
          break
        case "C":
          let hitMsg = `You hit ${this.state.player2name}'s carrier!'`
          this.setState({msg: hitMsg})
          break
        case "B":
          alert("Battleship Hit")
          break
        case "D":
          alert("Destroyer Hit")
          break
        case "S":
          alert("Submarine Hit")
          break
        case "P":
          alert("Patrol Boat")
          break
        default:
          console.log("That's not right!")
      }
    } else if (player === "two") {
      let board = this.state.player1board
      let hitMsg = `You hit ${this.state.player1name}'s '`
      let ghostRider = "Negative Ghost Rider. It's a miss."
      switch(board[location]) {
        case 0:
          this.setState({msg: ghostRider})
          break
        case "C":
          alert("Carrier Hit")
          break
        case "B":
          alert("Battleship Hit")
          break
        case "D":
          alert("Destroyer Hit")
          break
        case "S":
          alert("Submarine Hit")
          break
        case "P":
          alert("Patrol Boat")
          break
        default:
          console.log("That's not right!")
      }
    }
    setTimeout(() => this.flip(), 500)
  }

  render() {
    return (
      <div className="App">

        <header className="header">
          <h1 className="title">BattleShipt</h1>
        </header>

        <div className="game-area">

          <div className="game-controls">
            <button hidden={this.state.inPlay} className="button" onClick={this.newGame}>New Game</button>
            <button hidden={!this.state.inPlay} className="button" onClick={this.reset}>Reset</button>
            <button className="button" onClick={this.flip}>Flip</button>
          </div>

          <div id="boards">
            <Board name={this.state.player1name} checkStrike={this.checkStrike} board={this.state.player2board} boardColor="dodgerblue" player="one" />
            <Board name={this.state.player2name} checkStrike={this.checkStrike} board={this.state.player1board} boardColor="tomato" player="two" />
          </div>

        </div>

        <div id="message-area">
          {this.state.msg}
        </div>

      </div>
    );
  }
}

export default App;
