const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.9

class Sprite {
    constructor({position, velocity, color = 'red', offset}) {
        this.position = position
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,                     //offset changes direction of the attack boxes
            width: 100,
            height: 50
        }
        this.color = color
        this.isAttacking
    }

    draw() {
        //characters
        c.fillStyle = this.color
        c.fillRect(
            this.position.x, 
            this.position.y, 
            this.width, 
            this.height
        )

        //attack box
        if (this.isAttacking) {
            c.fillStyle = 'green'
            c.fillRect(
                this.attackBox.position.x, 
                this.attackBox.position.y, 
                this.attackBox.width, 
                this.attackBox.height
            )
        }  
    }

    update() {
        this.draw()

        //attack box is placed on the characters
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
        else {
            this.velocity.y += gravity
        }
    }

    attack() {
        this.isAttacking = true
        setTimeout (() =>{
            this.isAttacking = false
        }, 100)
    }
}

const player = new Sprite({
    position:{
    x: 0,
    y: 0
    },
    velocity: {
        x:0,
        y:10
    },
    offset: {
        x: 0,
        y: 0
    }
})

const enemy = new Sprite({
    position:{
        x: 400,
        y: 100
    },
    velocity: {
        x:0,
        y:0
    },
    color: 'blue',
    offset: {
        x: -50,
        y: 0
    }
})


console.log(player)

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },

    //enemy keys
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    }
}

function playerCollision(player1, player2) {    //function that detects collision between player's hitbox and their enemy
    return (
        player1.attackBox.position.x + player1.attackBox.width >= player2.position.x &&     //right side of attack box collide with left side of enemy
        player1.attackBox.position.x <= player2.position.x + player2.width &&               //left side of attack box collide with right side of enemy
        player1.attackBox.position.y + player1.attackBox.height >= player2.position.y &&    //attack box collide with top of enemy 
        player1.attackBox.position.y <= player2.position.y + player2.height                 //attack box collide with bottom of enemy
    )
}


function animation(){
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    //player movement
    player.velocity.x = 0
    if (keys.a.pressed && player.lastKey == 'a'){
        player.velocity.x = -5
    }
    else if (keys.d.pressed && player.lastKey == 'd'){
        player.velocity.x = 5
    }

    //change offset of player based on direction keys
    if (keys.a.pressed && player.lastKey == 'a'){
        player.attackBox.offset.x = -50
    }
    else if (keys.d.pressed && player.lastKey == 'd'){
        player.attackBox.offset.x = 0
    }

    //change offset of enemy based on direction keys
    if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft'){
        enemy.attackBox.offset.x = -50
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight'){
        enemy.attackBox.offset.x = 0
    }

    //enemy movement
    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft'){
        enemy.velocity.x = -5
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight'){
        enemy.velocity.x = 5
    }

    // detect for collision for player's hitbox
    if (
        playerCollision(player, enemy) &&
        player.isAttacking
        ){
        player.isAttacking = false
        console.log('ATTACK BY Player')
    }
    
    // detects for collision for enemy's hitbox
    if (
        playerCollision(enemy, player) &&
        enemy.isAttacking
        ){
        enemy.isAttacking = false
        console.log('ATTACK BY Enemy')
    }
    
}

animation()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        //player pressed keys
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break
        case 'w':
            player.velocity.y = -18
            break
        case ' ':
            player.attack()
            break

        //enemy pressed keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowUp':
            enemy.velocity.y = -18
            break
        case 'Enter':
            enemy.attack()
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            player.lastKey = 'a'
            break
        case 'a':
            keys.a.pressed = false
            player.lastKey = 'd'
            break
        case 'w':
            keys.w.pressed = false
            break

        //enemy keyup keys
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            enemy.lastKey = 'ArrowLeft'
            break
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            enemy.lastKey = 'ArrowRight'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break

    }
})