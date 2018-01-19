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
      player1CarrierHits: [],
      player1BattleshipHits: [],
      player1DestroyerHits: [],
      player1SubmarineHits: [],
      player1PatrolBoatHits: [],
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
      player2CarrierHits: [],
      player2BattleshipHits: [],
      player2DestroyerHits: [],
      player2SubmarineHits: [],
      player2PatrolBoatHits: [],
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
    this.checkForWinner = this.checkForWinner.bind(this)
    this.announceWinner = this.announceWinner.bind(this)
  }

  newGame() {
    console.log("Starting new game")
    this.setState({inPlay: true})
    this.setPlayerOneName()
    this.setPlayerTwoName()
    this.setPlayerOneShips()
    this.setPlayerTwoShips()
  }

  reset() {
    console.log("Game reset")
    window.location.reload()
  }

  setPlayerOneName() {
    console.log("Set Player 1's name")
    let name = prompt("Enter Player 1's Name.")
    if (name === null || name === "") {
      name = "Player 1"
      this.setState({player1name: name})
    } else {
      this.setState({player1name: name})
    }
  }

  setPlayerTwoName() {
    console.log("Set Player 1's name")
    let name = prompt("Enter Player 2's Name.")
    if (name === null || name === "") {
      name = "Player 2"
      this.setState({player2name: name})
    } else {
      this.setState({player2name: name})
    }
  }

  setPlayerOneShips() {
    console.log("Start setting Player 1's ships")
    let player = 1
    this.setShipData(player)
  }

  setPlayerTwoShips() {
    console.log("Start setting Player 2's ships")
    let player = 2
    this.setShipData(player)
  }

  setShipData(player) {
    console.log("Setting up ship data")
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
    console.log("Function to conditionally decide if ship direction should be horizontal or vertial")
    if (direction === 'H') {
      this.generateHorizontalShip(player, ship)
    } else if (direction === 'V') {
      this.generateVerticalShip(player, ship)
    }
  }

  generateHorizontalShip(player, ship) {
    console.log("Logic to deploy a horizontal ship to the playing area with collision detection")
    let startingPoint = Math.floor((Math.random() * 100) + 1) + 1
    let shipMass = startingPoint + ship.hits
    let shipArray = []
    let rounded = (Math.round(startingPoint / 10) * 10)

    console.log(`Starting: ${startingPoint} / Ship: ${ship.name} / Mass: ${shipMass} / Rounded: ${rounded}`);

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

    console.log("Sorted: " + sortedShipArray)

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
    console.log("Logic to deploy a vertical ship to the playing area with collision detection")
    let startingPoint = Math.floor((Math.random() * 100) + 1) + 1
    let shipMass = ship.hits * 10
    let shipArray = []

    console.log(`Starting: ${startingPoint} / Ship: ${ship.name} / Mass: ${shipMass}`);

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

    console.log("Sorted: " + sortedShipArray)

    if (this.checkCollision(player, sortedShipArray) === true) {
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
    console.log("Logic to detection ship placement collisions for ship in both directions")
    let board
    if (player === 1) {
      board = this.state.player1board
    } else if (player === 2) {
      board = this.state.player2board
    }
    let distance = (shipArray[1] - shipArray[0])
    if (distance === 10) {
      for (let i = shipArray[0]; i < (shipArray[0] + (shipArray.length * 10));) {
        if (board[i-1] === 0) {
          i += 10
        } else {
          return false
        }
      }
      return true
    } else if (distance === 1) {
      for (let i = shipArray[0]; i < (shipArray[0] + shipArray.length);) {
        if (board[i-1] === 0) {
          i++
        } else {
          return false
        }
      }
      return true
    }
  }

  flip() {
    console.log("Function to flip the board")
    if (this.state.flipped === true) {
      document.getElementById("boards").classList.remove("flip")
    } else {
      document.getElementById("boards").classList.add("flip")
    }
    this.setState({flipped: !this.state.flipped})
  }

  checkStrike(player, location) {
    console.log("Function to determine a hit, miss or otherwise / Includes determining winner too")
    if (this.state.inPlay === false) {
      alert('Click "New Game" to begin.')
      return
    }
    let hitMsg
    if (player === "one") {
      let board = this.state.player2board
      let hits = this.state.player1hits
      let sorryCharlie = "Sorry Charlie, that's a miss."
      switch(board[location]) {
        case 0:
          let misses = this.state.player1misses
          if (misses.indexOf(location) === -1) {
            misses.push(location)
            this.setState({msg: sorryCharlie, player1misses: misses})
            setTimeout(() => this.flip(), 500)
          } else {
            hitMsg = `You already hit that spot. Try again.`
            this.setState({msg: hitMsg})
          }
          break
        case "C":
          let carrierHits = this.state.player1CarrierHits
          if (hits.indexOf(location) === -1) {
            hits.push(location)
            carrierHits.push(location)
            let score = this.state.player1score
            if (carrierHits.length === 5) {
              hitMsg = `You sunk ${this.state.player2name}'s carrier!'`
              score += 5
              this.setState({player1score: score})
            } else if (carrierHits.length < 5) {
              hitMsg = `You hit ${this.state.player2name}'s carrier!'`
            }
            this.setState({msg: hitMsg, player1CarrierHits: carrierHits, player1hits: hits})
            if (this.checkForWinner(player, score) === true) {
              this.announceWinner(player)
            } else {
              setTimeout(() => this.flip(), 500)
            }
          } else {
            hitMsg = `You already hit that spot. Try again.`
            this.setState({msg: hitMsg})
          }
          break
        case "B":
          let battleshipHits = this.state.player1BattleshipHits
          if (hits.indexOf(location) === -1) {
            hits.push(location)
            battleshipHits.push(location)
            let score = this.state.player1score
            if (battleshipHits.length === 4) {
              hitMsg = `You sunk ${this.state.player2name}'s battleship!'`
              score += 4
              this.setState({player1score: score})
            } else if (battleshipHits.length < 4) {
              hitMsg = `You hit ${this.state.player2name}'s battleship!'`
            }
            this.setState({msg: hitMsg, player1BattleshipHits: battleshipHits, player1hits: hits})
            if (this.checkForWinner(player, score) === true) {
              this.announceWinner(player)
            } else {
              setTimeout(() => this.flip(), 500)
            }
          } else {
            hitMsg = `You already hit that spot. Try again.`
            this.setState({msg: hitMsg})
          }
          break
        case "D":
          let destroyerHits = this.state.player1DestroyerHits
          if (hits.indexOf(location) === -1) {
            hits.push(location)
            destroyerHits.push(location)
            let score = this.state.player1score
            if (destroyerHits.length === 3) {
              hitMsg = `You sunk ${this.state.player2name}'s destroyer!'`
              score += 3
              this.setState({player1score: score})
            } else if (destroyerHits.length < 3) {
              hitMsg = `You hit ${this.state.player2name}'s destroyer!'`
            }
            this.setState({msg: hitMsg, player1DestroyerHits: destroyerHits, player1hits: hits})
            if (this.checkForWinner(player, score) === true) {
              this.announceWinner(player)
            } else {
              setTimeout(() => this.flip(), 500)
            }
          } else {
            hitMsg = `You already hit that spot. Try again.`
            this.setState({msg: hitMsg})
          }
          break
        case "S":
          let submarineHits = this.state.player1SubmarineHits
          if (hits.indexOf(location) === -1) {
            hits.push(location)
            submarineHits.push(location)
            let score = this.state.player1score
            if (submarineHits.length === 3) {
              hitMsg = `You sunk ${this.state.player2name}'s submarine!'`
              score += 3
              this.setState({player1score: score})
            } else if (submarineHits < 3) {
              hitMsg = `You hit ${this.state.player2name}'s submarine!'`
            }
            this.setState({msg: hitMsg, player1SubmarineHits: submarineHits, player1hits: hits})
            if (this.checkForWinner(player, score) === true) {
              this.announceWinner(player)
            } else {
              setTimeout(() => this.flip(), 500)
            }
          } else {
            hitMsg = `You already hit that spot. Try again.`
            this.setState({msg: hitMsg})
          }
          break
        case "P":
          let patrolboatHits = this.state.player1PatrolBoatHits
          if (hits.indexOf(location) === -1) {
            hits.push(location)
            patrolboatHits.push(location)
            let score = this.state.player1score
            if (patrolboatHits.length === 2) {
              hitMsg = `You sunk ${this.state.player2name}'s patrol boat!'`
              score += 2
              this.setState({player1score: score})
            } else if (patrolboatHits.length < 2) {
              hitMsg = `You hit ${this.state.player2name}'s patrol boat!'`
            }
            this.setState({msg: hitMsg, player1PatrolBoatHits: patrolboatHits, player1hits: hits})
            if (this.checkForWinner(player, score) === true) {
              this.announceWinner(player)
            } else {
              setTimeout(() => this.flip(), 500)
            }
          } else {
            hitMsg = `You already hit that spot. Try again.`
            this.setState({msg: hitMsg})
          }
          break
        default:
          console.log("That's not right!")
      }
    } else if (player === "two") {
      let board = this.state.player1board
      let hits = this.state.player2hits
      let ghostRider = "Negative Ghost Rider. It's a miss."
      switch(board[location]) {
        case 0:
          let misses = this.state.player2misses
          if (misses.indexOf(location) === -1) {
            misses.push(location)
            this.setState({msg: ghostRider, player2misses: misses})
            setTimeout(() => this.flip(), 500)
          } else {
            hitMsg = `You already hit that spot. Try again.`
            this.setState({msg: hitMsg})
          }
          break
        case "C":
          let carrierHits = this.state.player2CarrierHits
          if (hits.indexOf(location) === -1) {
            hits.push(location)
            carrierHits.push(location)
            let score = this.state.player2score
            if (carrierHits.length === 5) {
              hitMsg = `You sunk ${this.state.player1name}'s carrier!'`
              score += 5
              this.setState({player2score: score})
            } else if (carrierHits.length < 5) {
              hitMsg = `You hit ${this.state.player1name}'s carrier!'`
            }
            this.setState({msg: hitMsg, player2CarrierHits: carrierHits, player2hits: hits})
            if (this.checkForWinner(player, score) === true) {
              this.announceWinner(player)
            } else {
              setTimeout(() => this.flip(), 500)
            }
          } else {
            hitMsg = `You already hit that spot. Try again.`
            this.setState({msg: hitMsg})
          }
          break
        case "B":
          let battleshipHits = this.state.player2BattleshipHits
          if (hits.indexOf(location) === -1) {
            hits.push(location)
            battleshipHits.push(location)
            let score = this.state.player2score
            if (battleshipHits.length === 4) {
              hitMsg = `You sunk ${this.state.player1name}'s battleship!'`
              score += 4
              this.setState({player2score: score})
            } else if (battleshipHits.length < 4) {
              hitMsg = `You hit ${this.state.player1name}'s battleship!'`
            }
            this.setState({msg: hitMsg, player2BattleshipHits: battleshipHits, player2hits: hits})
            if (this.checkForWinner(player, score) === true) {
              this.announceWinner(player)
            } else {
              setTimeout(() => this.flip(), 500)
            }
          } else {
            hitMsg = `You already hit that spot. Try again.`
            this.setState({msg: hitMsg})
          }
          break
        case "D":
          let destroyerHits = this.state.player2DestroyerHits
          if (hits.indexOf(location) === -1) {
            hits.push(location)
            destroyerHits.push(location)
            let score = this.state.player2score
            if (destroyerHits.length === 3) {
              hitMsg = `You sunk ${this.state.player1name}'s destroyer!'`
              score += 3
              this.setState({player2score: score})
            } else if (destroyerHits.length < 3) {
              hitMsg = `You hit ${this.state.player1name}'s destroyer!'`
            }
            this.setState({msg: hitMsg, player2DestroyerHits: destroyerHits, player2hits: hits})
            if (this.checkForWinner(player, score) === true) {
              this.announceWinner(player)
            } else {
              setTimeout(() => this.flip(), 500)
            }
          } else {
            hitMsg = `You already hit that spot. Try again.`
            this.setState({msg: hitMsg})
          }
          break
        case "S":
          let submarineHits = this.state.player2SubmarineHits
          if (hits.indexOf(location) === -1) {
            hits.push(location)
            submarineHits.push(location)
            let score = this.state.player2score
            if (submarineHits.length === 3) {
              hitMsg = `You sunk ${this.state.player1name}'s submarine!'`
              score += 3
              this.setState({player2score: score})
            } else if (submarineHits < 3) {
              hitMsg = `You hit ${this.state.player1name}'s submarine!'`
            }
            this.setState({msg: hitMsg, player2SubmarineHits: submarineHits, player2hits: hits})
            if (this.checkForWinner(player, score) === true) {
              this.announceWinner(player)
            } else {
              setTimeout(() => this.flip(), 500)
            }
          } else {
            hitMsg = `You already hit that spot. Try again.`
            this.setState({msg: hitMsg})
          }
          break
        case "P":
          let patrolboatHits = this.state.player2PatrolBoatHits
          if (hits.indexOf(location) === -1) {
            hits.push(location)
            patrolboatHits.push(location)
            let score = this.state.player2score
            if (patrolboatHits.length === 2) {
              hitMsg = `You sunk ${this.state.player1name}'s patrol boat!'`
              score += 2
              this.setState({player2score: score})
            } else if (patrolboatHits.length < 2) {
              hitMsg = `You hit ${this.state.player1name}'s patrol boat!'`
            }
            this.setState({msg: hitMsg, player2PatrolBoatHits: patrolboatHits, player2hits: hits})
            if (this.checkForWinner(player, score) === true) {
              this.announceWinner(player)
            } else {
              setTimeout(() => this.flip(), 500)
            }
          } else {
            hitMsg = `You already hit that spot. Try again.`
            this.setState({msg: hitMsg})
          }
          break
        default:
          console.log("That's not right!")
      }
    }
  }

  checkForWinner(player, score) {
    console.log("Simple function that returns a boolean for whether or not there's a winner")
    if (player === "one" && score === 17) {
      return true
    } else {
      return false
    }
  }

  announceWinner(player) {
    console.log("Function that announces winner and resets the game");
    let msg
    if (player === "one") {
      let player1 = this.state.player1name
      msg = `${player1} wins!!!`
      alert(msg)
    } else if (player === "two") {
      let player2 = this.state.player2name
      msg = `${player2} wins!!!`
      alert(msg)
    }
    this.reset()
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
          </div>

          <div id="boards">
            <Board name={this.state.player1name} hits={this.state.player1hits} misses={this.state.player1misses} checkStrike={this.checkStrike} board={this.state.player2board} boardColor="dodgerblue" player="one" />
            <Board name={this.state.player2name} hits={this.state.player2hits} misses={this.state.player2misses} checkStrike={this.checkStrike} board={this.state.player1board} boardColor="tomato" player="two" />
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
