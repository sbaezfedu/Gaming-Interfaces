//Constructor general, para poder cargar las imagenes y poder manipular el frame que se muestra
class Sprite {
    constructor({
                    position,
                    imageSrc,
                    scale = 1,
                    framesMax = 1,
                    offset = {x: 0, y: 0}
                }) {
        this.position = position
        this.width = 50
        this.height = 150
        this.image = new Image()
        this.image.src = imageSrc
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 5
        this.offset = offset
    }

    //Metodo para "dibujar"
    draw() {
        ctx.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )
    }

    //Funcion para determinar que frame esta, y poder ir aumentando restando el frame
    animateFrames() {
        this.framesElapsed++

        if (this.framesElapsed % this.framesHold === 0) {
            if (this.framesCurrent < this.framesMax - 1) {
                this.framesCurrent++
            } else {
                this.framesCurrent = 0
            }
        }
    }

    //Funcion para ir actualizando los frames
    update() {
        this.draw()
        this.animateFrames()
    }
}



//Clase basica para crear a los jugadores, la cual hereda de sprite para poder heredar sus metodos y poder dibujar
class Fighter extends Sprite {
    constructor({
                    position,
                    velocity,
                    color = 'red',
                    imageSrc,
                    scale = 1,
                    framesMax = 1,
                    offset = {x: 0, y: 0},
                    framesHold = 10,
                    sprites,
                    attackBox = {offset: {}, width: undefined, height: undefined}
                }) {
        super({
            position,
            imageSrc,
            scale,
            framesMax,
            offset
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
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.color = color
        this.isAttacking
        this.health = 100
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = framesHold
        this.sprites = sprites
        this.dead = false

        for (const sprite in this.sprites) {
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }

    update() {
        this.draw()
        if (!this.dead) this.animateFrames()

        // Hitbox
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y + this.attackBox.offset.y

        // Al desomitir esto, puedes mostrar el area de hitbox
        // ctx.fillRect(
        //     this.attackBox.position.x,
        //     this.attackBox.position.y,
        //     this.attackBox.width,
        //     this.attackBox.height
        // )


        //Se suma o resta la velocidad para determinar el movimiento
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        // Controlar la gravedad/velocidad de caida
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 120) {
            this.velocity.y = 0
            this.position.y = 330
        } else this.velocity.y += gravity
    }

    attack() {
        this.isAttacking = true
    }

    takeHit() {

        this.health -= 20

        if (this.health <= 0) {
            this.switchSprite('death')
        } else this.switchSprite('takeHit')
    }

    switchSprite(sprite) {
        //Controlar si la persona esta muerta
        if (this.image === this.sprites.death.image) {
            if (this.framesCurrent === this.sprites.death.framesMax - 1)
                this.dead = true
            return
        }

        // Hacer que la accion de ataque prevalezca ante todas
        if (
            (this.image === this.sprites.attack.image &&
                this.framesCurrent < this.sprites.attack.framesMax - 1) || this.image === this.sprites.attack_mirror.image &&
            this.framesCurrent < this.sprites.attack_mirror.framesMax - 1
        )
            return

        // Hacer que la accion de recibir golpe sea mas importante que las demas
        if (
            this.image === this.sprites.takeHit.image &&
            this.framesCurrent < this.sprites.takeHit.framesMax - 1
        )
            return


        //Control de las animaciones, para poder seleccionar la imagen que debe de mostrar, y el numero de frame que debe de hacer
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image
                    this.framesMax = this.sprites.idle.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'idle-mirror':
                if (this.image !== this.sprites.idle_mirror.image) {
                    this.image = this.sprites.idle_mirror.image
                    this.framesMax = this.sprites.idle_mirror.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image
                    this.framesMax = this.sprites.run.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'run-mirror':
                if (this.image !== this.sprites.run_mirror.image) {
                    this.image = this.sprites.run_mirror.image
                    this.framesMax = this.sprites.run_mirror.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image
                    this.framesMax = this.sprites.jump.framesMax
                    this.framesCurrent = 0
                }
                break
            case 'jump-mirror':
                if (this.image !== this.sprites.jump_mirror.image) {
                    this.image = this.sprites.jump_mirror.image
                    this.framesMax = this.sprites.jump_mirror.framesMax
                    this.framesCurrent = 0
                }
                break

            case 'fall':
                if (this.image !== this.sprites.fall.image) {
                    this.image = this.sprites.fall.image
                    this.framesMax = this.sprites.fall.framesMax
                    this.framesCurrent = 0
                }
                break

            case 'fall-mirror':
                if (this.image !== this.sprites.fall_mirror.image) {
                    this.image = this.sprites.fall_mirror.image
                    this.framesMax = this.sprites.fall_mirror.framesMax
                    this.framesCurrent = 0
                }
                break

            case 'attack':
                if (this.image !== this.sprites.attack.image) {
                    this.image = this.sprites.attack.image
                    this.framesMax = this.sprites.attack.framesMax
                    this.framesCurrent = 0
                }
                break

            case 'attack-mirror':
                if (this.image !== this.sprites.attack_mirror.image) {
                    this.image = this.sprites.attack_mirror.image
                    this.framesMax = this.sprites.attack_mirror.framesMax
                    this.framesCurrent = 0
                }
                break

            case 'takeHit':
                if (this.image !== this.sprites.takeHit.image) {
                    this.image = this.sprites.takeHit.image
                    this.framesMax = this.sprites.takeHit.framesMax
                    this.framesCurrent = 0
                }
                break

            case 'death':
                if (this.image !== this.sprites.death.image) {
                    this.image = this.sprites.death.image
                    this.framesMax = this.sprites.death.framesMax
                    this.framesCurrent = 0
                }
                break
        }
    }
}