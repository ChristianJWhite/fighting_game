const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.9

const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    scale: 1,
    imageSrc: './img/background.png',
    framesMax: 1
})

const shop = new Sprite({
    position: {
        x:680,
        y:293
    },
    scale: 1.9,
    imageSrc: './img/shop.png',
    framesMax: 6
})




const player = new Fighter({
    position:{
    x: 50,
    y: 0
    },
    velocity: {
        x:0,
        y:10
    },
    offset: {
        x: 0,
        y: 0
    },
    imageSrc: './img/Knight/KnightIdle_strip.png',
    framesMax: 15,
    scale: 3 ,
    sprites: {
        idle:{
            imageSrc: './img/Knight/KnightIdle_strip.png',
            framesMax: 15
        },
        idleLeft:{
            imageSrc: './img/Knight/KnightIdleLeft.png',
            framesMax: 15
        },
        run:{
            imageSrc: './img/Knight/noBKG_KnightRun_strip.png',
            framesMax: 8
        },
        runLeft:{
            imageSrc: './img/Knight/KnightRunLeft.png',
            framesMax: 8
        },
        jump:{
            imageSrc: './img/Knight/KnightJumpUp.png',
            framesMax: 4
        },
        jumpLeft:{
            imageSrc: './img/Knight/KnightJumpUpLeft.png',
            framesMax: 4
        },
        fall:{
            imageSrc: './img/Knight/KnightFall.png',
            framesMax: 4
        },
        fallLeft:{
            imageSrc: './img/Knight/KnightFallLeft.png',
            framesMax: 4
        },
        attack:{
            imageSrc: './img/Knight/KnightAttack.png',
            framesMax: 6
        },
        attackLeft:{
            imageSrc: './img/Knight/KnightAttackLeft.png',
            framesMax: 6
        },
        takeHit:{
            imageSrc: './img/Knight/KnightHitRight.png',
            framesMax: 4
        },
        takeHitLeft:{
            imageSrc: './img/Knight/KnightHitLeft.png',
           framesMax: 4
        },
        death:{
            imageSrc: './img/Knight/KnightDeath.png',
           framesMax: 8
        },
        deathLeft:{
            imageSrc: './img/Knight/KnightDeathLeft.png',
           framesMax: 8
        }
        
    } 
})

const enemy = new Fighter({
    position:{
        x: 500,
        y: 0
    },
    velocity: {
        x:0,
        y:0
    },
    offset: {
        x: -50,
        y: 0
    },
    imageSrc: './img/Knight2/KnightIdleLeftBlue.png',
    framesMax: 15,
    scale: 3 ,
    sprites: {
        idle:{
            imageSrc: './img/Knight2/KnightIdleBlue.png',
            framesMax: 15
        },
        idleLeft:{
            imageSrc: './img/Knight2/KnightIdleLeftBlue.png',
            framesMax: 15
        },
        run:{
            imageSrc: './img/Knight2/KnightRunBlue.png',
            framesMax: 8
        },
        runLeft:{
            imageSrc: './img/Knight2/KnightRunLeftBlue.png',
            framesMax: 8
        },
        jump:{
            imageSrc: './img/Knight2/KnightJumpUpBlue.png',
            framesMax: 4
        },
        jumpLeft:{
            imageSrc: './img/Knight2/KnightJumpUpLeftBlue.png',
            framesMax: 4
        },
        fall:{
            imageSrc: './img/Knight2/KnightFallBlue.png',
            framesMax: 4
        },
        fallLeft:{
            imageSrc: './img/Knight2/KnightFallLeftBlue.png',
            framesMax: 4
        },
        attack:{
            imageSrc: './img/Knight2/KnightAttackBlue.png',
            framesMax: 6
        },
        attackLeft:{
            imageSrc: './img/Knight2/KnightAttackLeftBlue.png',
            framesMax: 6
        },
        takeHit:{
            imageSrc: './img/Knight2/KnightHitRightBlue.png',
            framesMax: 4
        },
        takeHitLeft:{
            imageSrc: './img/Knight2/KnightHitLeftBlue.png',
           framesMax: 4
        },
        death:{
            imageSrc: './img/Knight2/KnightDeathBlue.png',
           framesMax: 8
        },
        deathLeft:{
            imageSrc: './img/Knight2/KnightDeathLeftBlue.png',
           framesMax: 8
        }
    } 
})



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


decreaseTimer()


function animation(){
    window.requestAnimationFrame(animation)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)

    background.update()
    shop.update()

    // white opacity given to the canvas to help with contrast of players and background
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
    c.fillRect(0, 0, canvas.width, canvas.height)

    player.update()
    enemy.update()

    //player movement
    player.velocity.x = 0
    if (keys.a.pressed && player.lastKey == 'a'){
        player.velocity.x = -10
        player.switchSprite('runLeft')
    }
    else if (keys.d.pressed && player.lastKey == 'd'){
        player.velocity.x = 10
        player.switchSprite('run')
    }
    else{
        if (player.lastKey == 'd'){
            player.switchSprite('idleLeft')
        }
        else{
            player.switchSprite('idle')        //default movement is idle png facing right
        }
    }

    if (player.velocity.y < 0 ){
        if (player.attackBox.offset.x == 0){
            player.switchSprite('jump')
        }
        else if (player.attackBox.offset.x == -50){
            player.switchSprite('jumpLeft')
        }
    }
    else if (player.velocity.y > 0){
        if (player.attackBox.offset.x == 0){
            player.switchSprite('fall')
        }
        else if (player.attackBox.offset.x == -50){
            player.switchSprite('fallLeft')
        }
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


    /////////////////////////////////
    //enemy movement
    enemy.velocity.x = 0
    if (keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft'){
        enemy.velocity.x = -10
        enemy.switchSprite('runLeft')
    }
    else if (keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight'){
        enemy.velocity.x = 10
        enemy.switchSprite('run')
    }
    else{
        if (enemy.lastKey == 'ArrowLeft'){
            enemy.switchSprite('idle')
        }
        else{
            enemy.switchSprite('idleLeft')        //default movement is idle png facing right
        }
    }

    if (enemy.velocity.y < 0 ){
        if (enemy.attackBox.offset.x == 0){
            enemy.switchSprite('jump')
        }
        else if (enemy.attackBox.offset.x == -50){
            enemy.switchSprite('jumpLeft')
        }
    }
    else if (enemy.velocity.y > 0){
        if (enemy.attackBox.offset.x == 0){
            enemy.switchSprite('fall')
        }
        else if (enemy.attackBox.offset.x == -50){
            enemy.switchSprite('fallLeft')
        }
    }

    // detect for collision with player's hitbox
    if (
        playerCollision(player, enemy) &&
        player.isAttacking && player.framesCurrent == 3             // tracks the frame count so that damage is taken when frame number 4 is overlaying the sprite
        ){
        if (enemy.attackBox.offset.x < 0) {
            enemy.takeHitLeft()
        }
        else{
            enemy.takeHit()
        }
        player.isAttacking = false
        
        
        gsap.to('#enemyHealth', {width: enemy.health + '%'})
    }

    // if player misses
    if (player.isAttacking && player.framesCurrent == 4){
        player.isAttacking = false
    }

    
    // detects for collision with enemy's hitbox
    if (
        playerCollision(enemy, player) &&
        enemy.isAttacking && enemy.framesCurrent == 3 
        ){ 
        if (player.attackBox.offset.x < 0) {
            player.takeHitLeft()
        }
        else{
            player.takeHit()
        }
        enemy.isAttacking = false
        
        
        gsap.to('#playerHealth', {width: player.health + '%'})
    }

    // if player misses
    if (enemy.isAttacking && enemy.framesCurrent == 4){
        enemy.isAttacking = false
    }

    //game over before time runs out
    if (enemy.health <= 0 || player.health <= 0){
        determineWinner(player, enemy, timerId)
    }
    
}

animation()

window.addEventListener('keydown', (event) => {
    // prevents player from moving after death
    if (!player.dead){
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
                if (player.attackBox.offset.x == -50){
                    player.attackLeft()
                }
                else{
                    player.attack()
                }
                
                break
        }
    }
    // prevents enemy from moving after death
    if (!enemy.dead){
        switch (event.key){
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
                if (enemy.attackBox.offset.x == -50){
                    enemy.attackLeft()
                }
                else{
                    enemy.attack()
                }
                break
        }
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