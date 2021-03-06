let gameArea = document.getElementById('game-area')
const computedStyle = getComputedStyle(gameArea)
const height = computedStyle.height
const width = computedStyle.width
gameArea.height = height.replace('px', '')
gameArea.width = width.replace('px', '')

let level = 1

function heroImg(x, y){
const imgPath = "media/hero.png"
let imgObj = new Image();
imgObj.src = imgPath
imgObj.onload = function(){
    ctx.drawImage(imgObj, x, y)
}}
function grassImg(x, y){
const imgPath = "media/grass.png"
let imgObj = new Image();
imgObj.src = imgPath
imgObj.onload = function(){
    ctx.drawImage(imgObj, x, y)
}}
function enemyImg(x, y){
const imgPath = 'media/enemy.png'
let imgObj = new Image();
imgObj.src = imgPath
imgObj.onload = function(){
    ctx.drawImage(imgObj, x, y)
}}


const ctx = gameArea.getContext('2d')
ctx.fillStyle = 'white';
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;

class Humanoid {
    constructor(name, x, y, color, width, height) {
        this.name = name
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.gravity = 2.5
        this.gravitySpeed = 0
        this.speedX = 2
        this.alive = true
        this.win = false
    }

    render() {
        if (this.name === 'hero'){
            heroImg(this.x, this.y)
        } else { enemyImg(this.x, this.y)}
    }
}

class Obstacle {
    constructor(x, y, color, width, height) {
        this.name = name
        this.x = x
        this.y = y
        this.color = color
        this.width = width
        this.height = height
        this.solid = true
        this.speedX = 20
        this.alive = false
    }
    render() {
        if (this.name === 'floor'){
            grassImg(this.x, this.y)
        } else {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height, this.gravitySpeed += this.gravity)
        }
    }
}
function levelUpdate() {
    let domLevel = document.getElementById('level')
    domLevel.innerText = `Level: ${level}`
}
function floorCollision(obj) {
    if (obj.y > 330) {
        obj.y = 330;
        obj.gravity = 0;
    } else {
        obj.gravity = 2.5;}      
    } 

function repaint(){
    ctx.clearRect(0,0, gameArea.width, gameArea.height)
    ctx.fillStyle = 'white';
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    levelUpdate()
    hero.render()
    renderEnemy()
    floor.render()
    flag.render()
    hero.y += hero.gravity
    bullet.x += bullet.speedX
    floorCollision(hero)
    flagCollision(hero)
    momentum(hero)
    for (let i = 0; i < enemies.length; i++) {
        playerHit(enemies[i])
        enemyHit(enemies[i])
        moveEnemy(enemies[i])
    }
    bulletRender()
    lose()
}
function moveEnemy(obj) {
    if (obj.x > hero.x) {
    obj.x =  obj.x - obj.speedX - 5
    }
    if (obj.x - 50 < hero.x) {
    obj.x =  obj.x + obj.speedX // tweak this if it becomes too hard
    }
}

function momentum(obj) {
    if (obj.y > 330) {
        obj.x += obj.speedX
    }
}
function flagCollision() {
    if (hero.x < flag.x + flag.width &&
        hero.x + hero.width > flag.x && 
        hero.y < flag.y + flag.height && 
        hero.y + hero.y > flag.y) {
        let gameWin = true
        if (gameWin === true) {
            hero = new Humanoid('hero', 50, 330, "red", 40, 80)
            level = level + 1;
            activateEnemies()
            if (gameWin === true && level === 5) {
                ctx.font = "30px Arial";
                ctx.textAlign = "center";
                ctx.fillText("YOU WIN!", 800, 100)
                clearInterval(running)
            }
        } 
    }}

function renderEnemy(){
    if (level === 1) {
        if (enemy.alive === true){
        enemy.render()
        }
    }
    if (level === 2) {
        if (enemy.alive === true){
        enemy.render()
    }
    if (enemy1.alive === true){
        enemy1.render()
    }
    if (enemy2.alive === true){
        enemy2.render()
    }
    }
    if (level === 3) {
        if (enemy.alive === true){
            enemy.render()
        }
        if (enemy1.alive === true){
            enemy1.render()
        }
        if (enemy2.alive === true){
            enemy2.render()
        }
        if (enemy3.alive === true){
            enemy3.render()
        }
    }
    if (level === 4) {
        if (enemy.alive === true){
            enemy.render()
        }
        if (enemy1.alive === true){
            enemy1.render()
        }
        if (enemy2.alive === true){
            enemy2.render()
        }
        if (enemy3.alive === true){
            enemy3.render()
        }
        if (enemy4.alive === true){
            enemy4.render()
        }
    }
}
document.addEventListener('keydown', function(evt) {
    if (evt.key === ' ') {
        if (hero.y > 300){
        hero.y -= 250}
        //
    } else if (evt.key === 'a') {
        hero.x -= 10
    } else if (evt.key === 'd') {
        hero.x += 10
    }
})

function randomNumber(min, max) {
    return Math.random() * (max - min) + min
}
const floor = new Obstacle(0, 400, "green", 1600, 100)
floor.name = "floor"
let hero = new Humanoid('hero', 50, 280, "red", 10, 50)
let enemy = new Humanoid('enemy', randomNumber(80, 1400), 325, "red", 20, 50)
let enemy1 = new Humanoid('enemy1', randomNumber(100, 1400), 325, "red", 20, 50)
let enemy2 = new Humanoid('enemy2', randomNumber(250, 1400), 325, "red", 20, 50)
let enemy3 = new Humanoid('enemy3', randomNumber(350, 1400), 325, "red", 20, 50)
let enemy4 = new Humanoid('enemy4', randomNumber(500, 1400), 325, "red", 20, 50)
const flag = new Obstacle(1400, 0, "gold", 10, 500)
let bullet = new Obstacle(hero.x, hero.y+30, "orange", 20, 3)
enemy.alive = true
enemy1.alive = false
enemy2.alive = false
enemy3.alive = false
enemy4.alive = false
const enemies = [enemy, enemy1, enemy2, enemy3, enemy4] 


function activateEnemies(){
if (level === 1) {
    enemy.alive = true
}
if (level === 2) {
    enemy.alive = true
    enemy1.alive = true
    enemy2.alive = true
}
if (level === 3) {
    enemy.alive = true
    enemy1.alive = true
    enemy2.alive = true
    enemy3.alive = true
}
if (level === 4) {
    enemy.alive = true
    enemy1.alive = true
    enemy2.alive = true
    enemy3.alive = true
    enemy4.alive = true
}
}


document.addEventListener('keyup', function(evt) {
    if (evt.key === 'f') {
        bullet = new Obstacle(hero.x, (hero.y+30), "red", 20, 3)
        bullet.alive = true
        bullet.render()
        bulletFired.play()
    }
})



function playerHit(enemynum){
    if (enemynum.alive === true){
    if (hero.x < enemynum.x + enemynum.width &&
        hero.x + hero.width > enemynum.x &&
        hero.y < enemynum.y + enemynum.height &&
        hero.y + hero.height > enemynum.y) {
         hero.alive = false
         playerHitSound.play()
         myMusic.stop()
         clearInterval(running)
        }
    }}

function enemyHit(enemynum){
    if (bullet.x < enemynum.x + enemynum.width &&
    bullet.x + bullet.width > enemynum.x &&
    bullet.y < enemynum.y + enemynum.height &&
    bullet.y + bullet.height > enemynum.y &&
    enemynum.alive === true && bullet.alive === true){
     bullet.alive = false
     enemynum.alive = false
     enemyHitSound.play()
    }
}

function bulletRender(){
    if (bullet.alive === true) {
        bullet.render()
    }
}

function lose() {
    if (hero.alive === false) {
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.color = 'blue'
        ctx.fillText("YOU LOSE!", 800, 100)
    }
}

let running = ''
let gameLive = true
function gameOn(){
    if (gameLive === true){
    running = setInterval(repaint, 500/30)
    } if (gameLive === false && hero.alive === false) {
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillText("YOU LOSE!", 800, 100)
        clearInterval(running)
    }
}

document.getElementById("reset").addEventListener('click', function() {
    level = 1
    hero.alive = true;
    gameLive = true;
    hero.x = 20;
    hero.y = 300;
    for (let i = 0; i < enemies; i++) {
        enemies[i].x = randomNumber(500, 1400)
    }
    enemy.alive = true
    enemy1.alive = false
    enemy2.alive = false
    enemy3.alive = false
    enemy4.alive = false
    gameLive = true
    gameOn()
    
})

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
const myMusic = new sound("media/background.mp3")
const enemyHitSound = new sound("media/enemyhit.mp3")
const playerHitSound = new sound("media/playerhit.mp3")
const bulletFired = new sound("media/shot.mp3")
const playButton = document.getElementById("play")
document.getElementById('play').addEventListener('click', function() {
    myMusic.play()
    gameOn()
})

document.getElementById("stop").addEventListener('click', function(){
    myMusic.stop()
})