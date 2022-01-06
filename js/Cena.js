export default class Cena {

    ///responsavel por desenhar elementos em tela
    constructor(canvas){
        console.log("Criando cena...")
        console.log(canvas)
        this.canvas = canvas;
        this.cw = canvas.width;
        this.ch = canvas.heigh;
        this.ctx = canvas.getContext("2d");
        this.sprites = [];

    }
    desenhar(){
        console.log("Desenhando cena...")
        //console.log(this.canvas)
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0 , 0 , this.cw , this.cw);
        for(let s = 0 ; s < this.sprites.length ; s++){
            let sprt = this.sprites[s];
            sprt.desenhar(this.ctx);
        }
    }
    adicionar(sprite){
        this.sprites.push(sprite);
    }

}