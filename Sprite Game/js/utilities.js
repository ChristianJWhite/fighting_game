function playerCollision(player1, player2) {    //function that detects collision between player's hitbox and their enemy
    return (
        player1.attackBox.position.x + player1.attackBox.width >= player2.position.x &&     //right side of attack box collide with left side of enemy
        player1.attackBox.position.x <= player2.position.x + player2.width &&               //left side of attack box collide with right side of enemy
        player1.attackBox.position.y + player1.attackBox.height >= player2.position.y &&    //attack box collide with top of enemy 
        player1.attackBox.position.y <= player2.position.y + player2.height                 //attack box collide with bottom of enemy
    )
}


//gets called when timer hits 0
function determineWinner(player, enemy, timerId){
    clearTimeout(timerId)
    document.querySelector('#displayWinner').style.display = 'flex'
    if (player.health == enemy.health) {
        document.querySelector('#displayWinner').innerHTML = 'Tie'
    }
    else if (player.health > enemy.health) {
        document.querySelector('#displayWinner').innerHTML = 'Player 1 Wins'
    }
    else if (player.health < enemy.health) {
        document.querySelector('#displayWinner').innerHTML = 'Player 2 Wins'
    }
}


//time function that calls on itself every 1000ms
let timer = 30
let timerId
function decreaseTimer(){
    if (timer > 0){
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('#timer').innerHTML = timer
    }

    if (timer == 0){
        determineWinner(player, enemy, timerId)
    }
}