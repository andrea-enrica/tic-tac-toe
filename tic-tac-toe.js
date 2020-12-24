//Players factory
const playerFactory = (name, mark) => {
    return {name, mark};
}

//Board Game Module
const gameBoard = (() => {
    let boardMatrix;

    //Create game grid 
    document.getElementById('board-game').style.setProperty('--grid-rows', 3);
    document.getElementById('board-game').style.setProperty('--grid-columns', 3);
    for (var i=0; i<9; i++) {
        boardMatrix = document.createElement('div');
        boardMatrix.innerText = " ";
        boardMatrix.setAttribute('class', "empty" + " " + i);
        document.getElementById('board-game').appendChild(boardMatrix).setAttribute('id', 'board-item');
    }

    //Open popUp form
    document.getElementsByClassName('new-game')[0].addEventListener('click', function() {
        document.getElementById("popUpName").style.display = "block";
    });

    //Board items click event listener and check for winners
    document.querySelectorAll('#board-item').forEach(item => {
        item.addEventListener('click', () => {
            twoPlayersGame.playRound(item);
        }); 
    });
    
    //Restart button
    document.getElementsByClassName('restart')[0].addEventListener('click', () => {
        twoPlayersGame.clearBoardGame();
    });

    return{boardMatrix};
})();

//Functions game module
const game = (() => {
    //declare players
    let player1 = playerFactory("", "X");
    let player2 = playerFactory("", "O");

    //initial state
    let playerTurn = player1;
    let countBoardItem = 0;
    let winnerBolean = false;

    //submit botton event listener
    document.getElementById('submit').addEventListener('click', ()=> {
        clearBoardGame();
        getPlayerName();
        document.getElementById("popUpName").style.display = "none";
        document.getElementById("left-title").style.display = "block";
        document.getElementById("right-title").style.display = "block";
        document.getElementById('player-turn').innerText = "";
    });

    //get player's name
    function getPlayerName() {
        player1.name= document.getElementById("player-1").value;
        player2.name= document.getElementById("player-2").value;
        document.getElementById('left-name').innerText = document.getElementById("player-1").value;
        document.getElementById('right-name').innerText = document.getElementById("player-2").value;
        document.getElementById("player-1").value = "";
        document.getElementById("player-2").value = "";
        return {player1, player2}
    }
    
    //fill the squares of the board game with curent value of players and check for winner
    function playRound(boardItem){
        if (playerTurn == player1 && playerTurn.name !== "" && boardItem.innerText == "" && winnerBolean === false){
            boardItem.innerText = `${player1.mark}`;
            boardItem.className = `${player1.mark}`;
            countBoardItem++;
            document.getElementById('player-turn').innerText = "It's " + `${player2.name}'s` + " turn!";
            checkWinner();
            playerTurn = player2;
        } else if(playerTurn == player2 && playerTurn.name !== "" && boardItem.innerText == "" && winnerBolean === false) {
            boardItem.innerText = `${player2.mark}`;
            boardItem.className = `${player2.mark}`;
            countBoardItem++;
            document.getElementById('player-turn').innerText = "It's " + `${player1.name}'s` + " turn!";
            checkWinner();
            playerTurn = player1;
        } else if (winnerBolean == true) {
            document.getElementById('player-turn').innerText = "The round is over, please restart the game!";
        } else {
            document.getElementById('player-turn').innerText = "You must enter the player names!";
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
        let boardContentArray = checkBoardContent();
        const winningCondition = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
       
        winningCondition.forEach((item, index) => {
            //check winning condition
            if (countBoardItem<9) {
                if(
                    boardContentArray[item[0]] === playerTurn.mark && 
                    boardContentArray[item[1]] === playerTurn.mark &&
                    boardContentArray[item[2]] === playerTurn.mark 
                ){
                    document.getElementById('player-turn').innerText = "Congratulation " + `${playerTurn.name}` + ", you won!";
                    item.forEach((gridTransformIndex) =>{
                        var gridItems = document.getElementById('board-game').childNodes;
                        for(var i = 0; i < gridItems.length; i++) {
                            gridItems[gridTransformIndex].setAttribute('class', `${playerTurn.mark}` + ' playing');
                        }
                    });
                    winnerBolean = true;
                }
            //check for tie
            } else {
                if(
                    boardContentArray[item[0]] === playerTurn.mark && 
                    boardContentArray[item[1]] === playerTurn.mark &&
                    boardContentArray[item[2]] === playerTurn.mark 
                ){
                    document.getElementById('player-turn').innerText = "Congratulation " + `${playerTurn.name}` + ", you won!";
                    item.forEach((gridTransformIndex) =>{
                        var gridItems = document.getElementById('board-game').childNodes;
                        for(var i = 0; i < gridItems.length; i++) {
                            gridItems[gridTransformIndex].setAttribute('class', `${playerTurn.mark}` + ' playing');
                        }
                    });
                    winnerBolean = true;
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
        winnerBolean = false;
        playerTurn = player1;
        document.getElementById('player-turn').innerText = " ";
        
        //get every item from grid  and put initial state
        var gridItems = document.getElementById('board-game').childNodes;
        for(var i=0; i<gridItems.length; i++) {
            gridItems[i].innerText = " ";
            gridItems[i].setAttribute('class', 'empty');
        }
    }

    return {playerTurn, countBoardItem, playRound, clearBoardGame};
});

//create a game object
const twoPlayersGame = game();