//Players factory
const playerFactory = (name, mark) => {
    return {name, mark};
}

//Game Board Module
const gameBoard = (() => {
    let firstPlayer;
    let secondPlayer;
    let boardMatrix;
    document.getElementById('board-game').style.setProperty('--grid-rows', 3);
    document.getElementById('board-game').style.setProperty('--grid-columns', 3);
    for (var i=0; i<9; i++) {
        boardMatrix = document.createElement('div');
        boardMatrix.innerText = " ";
        boardMatrix.setAttribute('class', "empty");
        document.getElementById('board-game').appendChild(boardMatrix).setAttribute('id', 'board-item');
    }

    //TO-DO
    //Get player's name
    document.getElementById('submit').addEventListener('submit', ()=> {
        console.log(document.getElementById("player-1").value);
        firstPlayer = document.getElementById("player-1").value;
        secondPlayer = document.getElementById("player-2").value;
    });

    //Add board click event listener and chek for winners
    document.querySelectorAll('#board-item').forEach(item => {
        item.addEventListener('click', () => {
            twoPlayersGame.playRound(item);
        }); 
    });
    
    //Restart button
    document.getElementsByClassName('restart')[0].addEventListener('click', () => {
        twoPlayersGame.clearBoardGame();
        var nodes = document.getElementById('board-game').childNodes;
        for(i=0; i<nodes.length; i++) {
           nodes[i].innerText = " ";
           nodes[i].setAttribute('class', 'empty');
        }
    });

    return{boardMatrix, firstPlayer, secondPlayer};
})();

//Game Module functions
const game = (() => {

    //declare players
    const player1= playerFactory(gameBoard.firstPlayer, "X");
    const player2= playerFactory(gameBoard.secondPlayer, "O");
    console.log(player1);
    
    //initial points
    let playerTurn = player1;
    let countBoardItem = 0;

    //fill the squares of the board game with curent value of players and check for winner
    function playRound(boardItem){
        if (playerTurn == player1 && boardItem.innerText == ""){
            boardItem.innerText = `${player1.mark}`;
            boardItem.className = `${player1.mark}`;
            countBoardItem++;
            document.getElementById('player-turn').innerText = "It's " + `${player2.name}'s` + " turn!";
            checkWinner();
            playerTurn = player2;
        } else if(playerTurn == player2 && boardItem.innerText == "") {
            boardItem.innerText = `${player2.mark}`;
            boardItem.className = `${player2.mark}`;
            countBoardItem++;
            document.getElementById('player-turn').innerText = "It's " + `${player1.name}'s` + " turn!";
            checkWinner();
            playerTurn = player1;
        }
        return countBoardItem;
    }
    
    //check for content
    function checkBoardContent() {
        let boardContent = [];
        let boardItemText = [];
        boardItemText.push(document.querySelectorAll("#board-item")); //add nodelist
        let boardItemArray = [...boardItemText[0]]; //transform nodelist to array
        boardItemArray.forEach(element => {
            boardContent.push(element.innerText);
        });
        return boardContent;
    }

    //winning condition and function
    function checkWinner() {
        const winningCondition = [
            [0,1,2], 
            [3,4,5], 
            [6,7,8], 
            [0,3,6], 
            [1,4,7], 
            [2,5,8], 
            [0,4,8], 
            [2,4,6]
        ];
        let boardContentArray = checkBoardContent();

        winningCondition.forEach((item, index) => {
            //check winning condition
            if (countBoardItem<9) {
                if(
                    boardContentArray[item[0]] === playerTurn.mark && 
                    boardContentArray[item[1]] === playerTurn.mark &&
                    boardContentArray[item[2]] === playerTurn.mark
                ){
                    document.getElementById('player-turn').innerText = `${playerTurn.name}` + " wins!";
                }
            } else {
                if(
                    boardContentArray[item[0]] === playerTurn.mark && 
                    boardContentArray[item[1]] === playerTurn.mark &&
                    boardContentArray[item[2]] === playerTurn.mark
                ){
                    document.getElementById('player-turn').innerText = `${playerTurn.name}` + " wins!";
                } else {
                    document.getElementById('player-turn').innerText = "It's tie!";
                }
            }
       });
    }

    //restart the board game 
    function clearBoardGame() {
        countBoardItem=0;
        checkBoardContent.boardContent = [];
        document.getElementById('player-turn').innerText = " ";
        playerTurn = player1;
    }

    return {playerTurn, countBoardItem, playRound, clearBoardGame};
});

//create a game object
const twoPlayersGame = game();