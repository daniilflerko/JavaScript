let nickname = document.getElementById('nickname').value;
const start = document.getElementById('start');
const best = document.getElementById('best');
const bestAll = document.getElementById('bestAll');
const clear = document.getElementById('clear');
const clearAll = document.getElementById('clearAll');
let click = document.getElementById('click');
const t = 3000;

start.addEventListener('click', function(){
    nickname = document.getElementById('nickname').value;
    try {
        if(nickname === '') {
            throw 'Empty nickname';
        }else {
            let clicks = 0;
            click.addEventListener('click', function(){
                clicks+=1;
            });
            setTimeout(function(){
                alert(`You clicked ${clicks} times`);
                let player=[nickname, clicks];
                if (sessionStorage.getItem('player') === null) {
                    sessionStorage.setItem('player', JSON.stringify(player));
                }
                if (localStorage.getItem('bestPlayer') === null) {
                    localStorage.setItem('bestPlayer', JSON.stringify(player));
                }
                let playerOld=sessionStorage.getItem('player');
                playerOld = JSON.parse(playerOld);
                if(player[1] > playerOld[1]){
                    sessionStorage.setItem('player', JSON.stringify(player));
                }
                let playerOldBest=localStorage.getItem('bestPlayer');
                playerOldBest= JSON.parse(playerOldBest);
                if(player[1] > playerOldBest[1]){
                    localStorage.setItem('bestPlayer', JSON.stringify(player));
                }
            }, t);
        }
    } catch(e){
        alert(e);
    }
});

best.addEventListener('click', function(){
    let yourBest = sessionStorage.getItem('player');
    yourBest = JSON.parse(yourBest);
    alert(`Best result is ${yourBest[1]}`);
});

bestAll.addEventListener('click',function(){
    let bestPlayer= localStorage.getItem('bestPlayer');
    bestPlayer = JSON.parse(bestPlayer);
    alert(`Best result for the whole time is ${bestPlayer[1]} by ${bestPlayer[0]}`);
});

clear.addEventListener('click', function(){
    sessionStorage.clear();
    alert('Best result is cleared');
});

clearAll.addEventListener('click',function(){
    localStorage.clear();
    alert('Best result for the whole time is cleared');
});