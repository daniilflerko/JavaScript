window.addEventListener('DOMContentLoaded', function(){
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const displayPlayer = document.querySelector('.display-player');
    const reset = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let game = true;

    const xWon = 'xWon';
    const oWon = 'oWon';
    const tie = 'Tie';

    const winningNeeds = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    function whoWon(){
        let round = false;
        for(let i=0; i<=7; i++){
            const winNeed = winningNeeds[i];
            const a = board[winNeed[0]];
            const b = board[winNeed[1]];
            const c = board[winNeed[2]];
            if(a === '' || b === '' || c === ''){
                continue;
            }
            if(a === b && b === c){
                round = true;
                break;
            }
        }
        if(round){
            announce(currentPlayer === 'X' ? xWon : oWon);
            game = false;
            return
        }
        if(!board.includes('')){
            announce(tie)
        }
    } 

    const announce =(type) => {
        switch(type){
            case xWon:
                announcer.innerHTML = 'Player <span class="display-player playerX">X</span> won';
                break;
            case oWon:
                announcer.innerHTML = 'Player <span class="display-player playerO">O</span> won';
                break;
            case tie:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    }

    const update = (index) => {
        board[index] = currentPlayer;
    }

    const isValid = (tile) => {
        if(tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }
        return true;
    }

    const nextPlayer = () => {
        displayPlayer.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        displayPlayer.innerText = currentPlayer;
        displayPlayer.classList.add(`player${currentPlayer}`);
    }

    const move = (tile, index) => {
        if(isValid(tile) && game){
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            update(index);
            whoWon();
            nextPlayer();
        }
    }

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        game = true;
        announcer.classList.add('hide');
        if(currentPlayer === 'O'){
            nextPlayer();
        }
        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX')
            tile.classList.remove('playerO')
        })
    }

    tiles.forEach((tile,index) => {
        tile.addEventListener('click', () => move(tile,index))
    });
    reset.addEventListener('click', resetGame);

    const avatarContainer = document.querySelector('.avatar-container');
    const avatarIconsContainer = document.querySelector('.icons');
    const icon1 = document.querySelector('#icon1');
    const icon2 = document.querySelector('#icon2');
    const icon3 = document.querySelector('#icon3');
    const icon4 = document.querySelector('#icon4');

    avatarContainer.ondragover = allowDrag;
    avatarIconsContainer.ondragover = allowDrag;
    
    function allowDrag(event){
        event.preventDefault();
    }

    icon1.ondragstart = drag;
    icon2.ondragstart = drag;
    icon3.ondragstart = drag;
    icon4.ondragstart = drag;

    function drag(event){
        event.dataTransfer.setData('id', event.target.id)
    }

    avatarContainer.ondrop = drop;
    avatarIconsContainer.ondrop = drop;

    function drop(event){
        let item = event.dataTransfer.getData('id');
        event.target.append(document.getElementById(item));
    }

    tiles.tabIndex = 0;

    tiles.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft' && event.key !== 'Enter'){
            return;
        }
    });
});
