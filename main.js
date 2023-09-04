const c = document.getElementById('c')
const ctx = c.getContext('2d')


const credits = document.getElementById("credits")
const board = document.getElementById("board")
const s = document.getElementById("score")
const btn = document.getElementById("btn-pause")
const btnback = document.getElementById("btn-back")

class Snack{
    constructor(x, y, grid){
        this.directionX = 1
        this.directionY = 0
        this.x = x
        this.y = y
        this.grid = grid
        this.length = 1
        this.tail = new Array(this.length).fill().map((_,i) => {
            return {x: this.x - this.grid * this.directionX * i, y: this.y - this.grid * this.directionY * i}
         });
    }
    draw(){
        this.tail.forEach((s,i)=>{
            ctx.fillStyle = "black";
            if(i === 0) ctx.fillStyle = 'pink' 
            ctx.fillRect(s.x, s.y, this.grid-1, this.grid-1)
        })
    }
    update(){
        ctx.clearRect(this.tail[this.tail.length-1].x, this.tail[this.tail.length-1].y, this.grid, this.grid)
        this.tail.unshift({x: this.x += this.directionX * this.grid, y: this.y += this.directionY * this.grid})
        this.tail.pop()
        this.draw()
        if(this.checkHitWall()) {
            // console.log("hitwall")
            this.reset()
        }
    }
    checkHitWall(){
        return this.x >= c.width || this.y >= c.height || this.x < 0 || this.y < 0;
    }
    checkHitBody(){
        this.tail.map((e, i)=>{
            if(i === 0){
                return
            }
            if(e.x === this.tail[0].x && e.y === this.tail[0].y) {
                // console.log("hitbody")
                this.reset()
            }
        })
    }
    reset(){
        ctx.clearRect(0, 0 , c.width, c.height)
        snack = new Snack(192, 192, this.grid);
        food = new Food()
        return {
            snack,
            food
        }
    }
}

class Food{
    constructor(){
        this.grid = 12
        this.x = this.getRandomInt(c.width/this.grid)
        this.y = this.getRandomInt(c.height/this.grid)
        this.color = "red"
        
        this.img = new Image()
        this.img.src = `./fruits/${this.getRandomImg()}.png`
    }
    draw(){
        ctx.fillStyle = this.color;
        ctx.drawImage(
            this.img,
             this.x, this.y, this.grid, this.grid
            )
    }
    eat(){
        if(snack.tail[0].x === this.x && snack.tail[0].y === this.y) {
            ctx.clearRect(this.x, this.y, this.grid, this.grid)
            ctx.fillStyle = "pink";
            ctx.fillRect(this.x, this.y, this.grid-1, this.grid-1)
            snack.tail.unshift({x: snack.x, y: snack.y})
            snack.length = snack.tail.length
            // console.log("ate +1")
            // console.log("clone food...")
            // food = new Food()
            return new Food()
        }
    }
    getRandomInt(max){
        return Math.floor(Math.random() * max) * this.grid;
    }
    getRandomImg(){
        // const imgs = {0: "banana", 1: "brine", 2: "orange", 3: "strawberry", 4: "apple__"}"apple__""banana","brine" ,"orange" ,"strawberry",
        const imgs = ["apple", "banana", "brine", "orange", "strawberry", "benhu2"]
        const ran = Math.floor(Math.random() * imgs.length)
        // console.log(imgs)
        return imgs[ran];
    }
    isFoodCoincideBody(){
        snack.tail.map((e)=>{
            if(this.x === e.x && this.y === e.y){
                // console.log("coincided")
                return food = new Food()
            }
        })
    }
}

let snack = new Snack(192, 192, 12)
let food = new Food()
let f = 0
let step;
function animate(){
    if(snack.checkHitWall()){
        cancelAnimationFrame(animate);
    }
    if(f % 10 === 0) {
        s.innerHTML = `Score: ${snack.length-1}`

        snack.draw()
        snack.update()
        
        snack.checkHitBody()
        
        // new Food().draw()
        // new Food().eat()
        // new Food().isFoodCoincideBody()
        food.draw()
        food.eat()
        food.isFoodCoincideBody()
    }
    f++
    step = requestAnimationFrame(animate)
    //console.log(f)
}
animate()




btn.addEventListener("click", () => {
    // console.log("btn")
    cancelAnimationFrame(step)
    requestAnimationFrame(textanimate)
    c.style.display = "none"
    board.style.display = "none"
    credits.style.display = "flex"
})
btnback.addEventListener('click', () => {
    cancelAnimationFrame(steptext)
    requestAnimationFrame(animate)
    c.style.display = "flex"
    board.style.display = "flex"
    credits.style.display = "none"
})

const mobile = document.getElementById("mobilecontrol")

let deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return "tablet";
    }
    else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return "mobile";
    }
    return "desktop";
};

function toggleDevice(){
if(deviceType() === "mobile"){
    mobile.style.display = "flex"
    const up = document.getElementById("up")
    const down = document.getElementById("down")
    const left = document.getElementById("left")
    const right = document.getElementById("right")

    up.addEventListener("click", () => {
        if(snack.directionX === 0 && snack.directionY === 1) return
        snack.directionX = 0
        snack.directionY = -1
    })
    down.addEventListener("click", () => {
        if(snack.directionX === 0 && snack.directionY === -1) return
        snack.directionX = 0
        snack.directionY = 1
    })
    left.addEventListener("click", () => {
        if(snack.directionX === 1 && snack.directionY === 0) return
        snack.directionX = -1
        snack.directionY = 0
    })
    right.addEventListener("click", () => {
        if(snack.directionX === -1 && snack.directionY === 0) return
        snack.directionX = 1
        snack.directionY = 0
    })
}else if(deviceType() == "desktop"){
    mobile.style.display = "none"
    mobile.remove()
    document.addEventListener("keydown", key =>{
        switch(key.key){
        case "s":
            if(snack.directionX === 0 && snack.directionY === -1) return
            snack.directionX = 0
            snack.directionY = 1
            break;
        case "w":
            if(snack.directionX === 0 && snack.directionY === 1) return
            snack.directionX = 0
            snack.directionY = -1
            break;
        case "a":
            if(snack.directionX === 1 && snack.directionY === 0) return
            snack.directionX = -1
            snack.directionY = 0
            break;
        case "d":
            if(snack.directionX === -1 && snack.directionY === 0) return
            snack.directionX = 1
            snack.directionY = 0
            break;
        }
    })
}
}
toggleDevice()