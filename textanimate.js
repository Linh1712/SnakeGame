const text = document.getElementById("text")
const t = text.getContext('2d')

const align = 45
let textframe = 0
let column = -70
let firstcolumn = column
let dr = 0
let steptext
let xcontent = text.width / 2 - align
let ycontent = text.height / 2
t.font = "15px Arial"

cleartext = () => {
    t.clearRect(0, 0, text.width, text.height)
}
class Text{
    static dr = 0
    constructor(content, x, y){
        Text.dr++
        this.content = content
        this.x = x
        this.y = y
        t.fillText(this.content, this.x, this.y * Text.dr)        
    }
    render(ytext){
        t.fillText(this.content, this.x, ytext)        
    }
}
text1 = new Text("Dev", xcontent, ycontent)
text2 = new Text("Linh1712", xcontent, ycontent)
// console.log(text1)
text3 = new Text("Art", xcontent, ycontent)
text4 = new Text("Linh1712", xcontent, ycontent)
text1.render()
text2.render()
console.log(Text.dr)
text3.render()
text4.render()

function textanimate(){
    let ytext = text.height/2 - column
    if(textframe % 5 == 0){
        
        cleartext()
        text1.render(ytext)
        text2.render(ytext + 25)
        text3.render(ytext + 50)
        text4.render(ytext + 75)

        if(ytext + 75 <= 0){
            cleartext()
            column = firstcolumn
        }
        // console.log(ytext)
        column++
    }
    textframe++
    //console.log(textframe)
    steptext = requestAnimationFrame(textanimate)
}