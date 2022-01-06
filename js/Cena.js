export default class Cena {

    ///responsavel por desenhar elementos em tela
    constructor(canvas){
        console.log("Criando cena...")
        console.log(canvas)
        this.canvas = canvas;
        this.cw = canvas.width;
        this.ch = canvas.heigh;
        this.ctx = canvas.getContext("2d");

    }
    desenhar(){
        console.log("Desenhando cena...")
        //console.log(this.canvas)
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0 , 0 , this.cw , this.cw);
    }

}