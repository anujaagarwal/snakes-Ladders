//Create a `snakesAndLadders` object to represent game state.

const snakesAndLadders = {
    board: new Array(101).fill(0), //Initialize the board with 101 cells.
    players: [
        { name: "Player One", position: 1 },
        { name: "Players Two", position: 1 },
    ] ,
};

let currentPlayerIndex = 0; // Start with the first player (index 0) as the current player
let consecutiveSixCount = 0;
// Define Snakes and ladder positions

const snakes = {28:10, 37:3, 48:16, 75:32, 94:71, 96:42 };
const ladders = {4:56, 12:50, 14:55, 22:58, 41:79, 54:88};

for (const snake in snakes){
    snakesAndLadders.board[snake] = snakes[snake];
}

for (const ladder in ladders){
    snakesAndLadders.board[ladder] = ladders[ladder];
}


const rollDice = () => {
    return Math.floor((Math.random() * 6) + 1);
}

const switchPlayer = () => {
    currentPlayerIndex = (currentPlayerIndex + 1) % snakesAndLadders.players.length;
  }

const movePlayer = (player) => {
    let diceRoll;

    do {
        diceRoll = rollDice();
        if (diceRoll === 6){
            const dicer = rollDice();
            diceRoll = diceRoll + dicer;
            consecutiveSixCount++;
            if(consecutiveSixCount === 3){
                diceRoll = 0; // Nullify the dice
                consecutiveSixCount = 0;
            }
        } else {
            consecutiveSixCount=0;
        }
        } while (diceRoll === 0);
        let newPosition = player.position + diceRoll;
    
        if (newPosition <= 100) {
            player.position = snakesAndLadders.board[newPosition] || newPosition;

            if(player.position === 100) {
             return `${player.name} has won the game!`;
            } else {
                return `${player.name} rolled a ${diceRoll} and is now at position ${player.position}.`;
              }
        }

        return `${player.name} rolled a ${diceRoll} but cannot move beyond 100.`;
    }


    function playGame() {
        while (true) {
          const currentPlayer = snakesAndLadders.players[currentPlayerIndex];
          console.log(`It's ${currentPlayer.name}'s turn.`);
          
          const result = movePlayer(currentPlayer);
          console.log(result);
      
          if (currentPlayer.position === 100) {
            console.log(`${currentPlayer.name} has won the game!`);
            break; // End the game
          }
      
          switchPlayer();
        }
      }
playGame();

    
    
   
