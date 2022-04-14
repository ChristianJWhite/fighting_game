class Sprite {                      //background
    constructor({position, imageSrc, scale = 1, framesMax = 1}) {                   
        this.position = position
        this.width = 1024
        this.height = 576
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
    }

    draw() { 
        c.drawImage(this.image, 
            //draws an animated image
            this.framesCurrent * (this.image.width / this.framesMax), 
            0, 
            this.image.width/this.framesMax, 
            this.image.height,
            //draws image onto the screen using canvas
            this.position.x, this.position.y, (this.image.width / this.framesMax) * this.scale, this.image.height * this.scale
            )
        
        ////////////////RECTANGLES///////////////////// 
        //c.fillStyle = 'blue'
        //c.fillRect(this.position.x, this.position.y, 50, 150)
    }

    animateFrames(){
        this.framesElapsed ++
        if (this.framesElapsed % this.framesHold == 0){
            if (this.framesCurrent < this.framesMax - 1){
                this.framesCurrent++
            }
            else{
                this.framesCurrent = 0
            }
        }
    }

    update() {
        this.draw()
        this.animateFrames()
    }

}

class Fighter extends Sprite {
    constructor({
        position, velocity, color = 'red', offset = {x:0, y:0}, imageSrc, scale = 1, framesMax = 1, sprites
    }) {
        super({   
            position,                   //properties used by call to parent constructor
            imageSrc,
            scale,      /////////////////
            framesMax,
        })
       
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.lastKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset  ,                   //offset changes direction of the attack boxes
            width: 100,
            height: 70
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 10
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites){
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }


    update() {
        this.draw()
        if (!this.dead){
            this.animateFrames()
        }
        
        //attack box is placed on the characters
        if (this.attackBox.offset.x < 0){
            this.attackBox.position.x = this.position.x + this.attackBox.offset.x - 15
        }
        else{
            this.attackBox.position.x = this.position.x + this.attackBox.offset.x + 15
        }
        
        this.attackBox.position.y = this.position.y + 40

        ////////////////RECTANGLES/////////////////////
        //c.fillStyle = this.color
        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        //gravity of sprites
        if (this.position.y + this.height + this.velocity.y >= canvas.height -20){
            this.velocity.y = 0
            this.position.y = 406         //forces the character's position to be at y coord in order to stop sprite from glitching when touching the ground
        }
        else {
            this.velocity.y += gravity
        }
        //console.log(enemy.position.y)

    }

    attack() {
        this.switchSprite('attack')
        this.isAttacking = true
        
    }

    attackLeft() {
        this.switchSprite('attackLeft')
        this.isAttacking = true
    }

    takeHit(){
        this.health -= 20
        if (this.health <= 0){
            this.switchSprite('death')
        }
        else{
            this.switchSprite('takeHit')
        }
    }

    takeHitLeft(){
        this.health -= 20
        if (this.health <= 0){
            this.switchSprite('deathLeft')
        }
        else{
            this.switchSprite('takeHitLeft')
        }
    }

    switchSprite(sprite){
        // death animation
        if (this.image === this.sprites.death.image){
            if (this.framesCurrent === this.sprites.death.framesMax - 1){
                this.dead = true
            }
            return
        }

        if (this.image === this.sprites.deathLeft.image){
            if (this.framesCurrent === this.sprites.deathLeft.framesMax - 1){
                this.dead = true
            }
            return
        }

        // overriding all other animations with the attack animation
        if (this.image === (this.sprites.attack.image )
            && this.framesCurrent < (this.sprites.attack.framesMax  ) - 1   //Stops the character from using other sprites while attack animation is active
            ){
                return
            }
        
        if (this.image === (this.sprites.attackLeft.image )
            && this.framesCurrent < (this.sprites.attackLeft.framesMax  ) - 1   //Stops the character from using other sprites while attack animation is active
            ){
                return
            }

        if (this.image === this.sprites.takeHit.image && this.framesCurrent < (this.sprites.takeHit.framesMax - 1)){
            return
        }

        if (this.image === this.sprites.takeHitLeft.image && this.framesCurrent < (this.sprites.takeHitLeft.framesMax - 1)){
            return
        }



        switch(sprite){
            case 'idle':
                if (this.image !== this.sprites.idle.image){
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'idleLeft':
                if (this.image !== this.sprites.idleLeft.image){
                    this.image = this.sprites.idleLeft.image
                    this.framesMax = this.sprites.idleLeft.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image){
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'runLeft':
                if (this.image !== this.sprites.runLeft.image){
                    this.image = this.sprites.runLeft.image
                    this.framesMax = this.sprites.runLeft.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image){
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jumpLeft':
                if (this.image !== this.sprites.jumpLeft.image){
                    this.image = this.sprites.jumpLeft.image
                    this.framesMax = this.sprites.jumpLeft.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fall':
                if (this.image !== this.sprites.fall.image){
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'fallLeft':
                if (this.image !== this.sprites.fallLeft.image){
                    this.image = this.sprites.fallLeft.image
                    this.framesMax = this.sprites.fallLeft.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attack':
                if (this.image !== this.sprites.attack.image){
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'attackLeft':
                if (this.image !== this.sprites.attackLeft.image){
                    this.image = this.sprites.attackLeft.image
                    this.framesMax = this.sprites.attackLeft.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image){
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'takeHitLeft':
                if (this.image !== this.sprites.takeHitLeft.image){
                    this.image = this.sprites.takeHitLeft.image
                    this.framesMax = this.sprites.takeHitLeft.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'death':
                if (this.image !== this.sprites.death.image){
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'deathLeft':
                if (this.image !== this.sprites.deathLeft.image){
                    this.image = this.sprites.deathLeft.image
                    this.framesMax = this.sprites.deathLeft.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}