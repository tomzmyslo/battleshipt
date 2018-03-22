# BattleShipt

BattleShipt is the resulting MVP of my "Code Challenge" for a Web Development position with Shipt. I chose React to build BattleShipt due to it's excellent state management and reusable components.

While I kept true to the rules of Battleship, I decided to enhance and speed up the game experience by utilizing a "Ship Placement Engine" with collision detection, that lets the "computer" place each player's ships. This removes any issues of one player seeing where the other player placed his ship, as well as, eliminating any awkward passing of a laptop back and forth. Plus, it just gets you to playing the game faster.

As with any MVP, BattleShipt includes a few items that had to be put on the back burner. The following is a list of those items:

* Use Redux to manage state
* Use Flow for type checking
* Implement Jest for testing
* Potential of Stateless Components for Board.js and Cell.js
* Refactoring of heftier functions
  - Reduce the "setupShipData()", "determineShips()", "generateHorizontalShip()" and "generateVerticalShip()" into fewer functions. Ideally just one function.
  - Break apart the "checkStrike()" function into smaller, more succinct functions.

To see more of the inner workings of BattleShipt, navigate to https://tomzmyslo.github.io/battleshipt/ and try it out. You can also see log output of what's happening, including the "Ship Placement Engine", in the console.

Thanks for the opportunity and you can contact me at tom@zmyslo.com
