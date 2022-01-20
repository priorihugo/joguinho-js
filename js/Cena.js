export default class Cena {

    ///responsavel por desenhar elementos em tela
    constructor(canvas, assets = null){
        console.log("Criando cena...")
        console.log(canvas)
        this.canvas = canvas;
        this.cw = canvas.width;
        this.ch = canvas.heigh;
        this.ctx = canvas.getContext("2d");
        this.sprites = [];
        this.t0 = null;
        this.dt = null;
        this.idAnim = null;
        this.assets = assets;

    }
    desenhar(){
        //console.log("Desenhando cena...")
        //console.log(this.canvas)
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0 , 0 , this.cw , this.cw);
        for(let s = 0 ; s < this.sprites.length ; s++){
            let sprt = this.sprites[s];
            sprt.desenhar(this.ctx);
        }
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(this.assets.progresso(), 40 , 40)
    }
    adicionar(sprite){
        this.sprites.push(sprite);
    }
    passo(dt){
        for (const sprite of this.sprites) {
            sprite.passo(dt);        
        }
    }
    quadro(t){
        this.t0 = this.t0 ?? t;
        this.dt = ( t - this.t0) / 1000;

        this.passo(this.dt);
        this.desenhar();
        this.iniciar();

        this.t0 = t;
    }
    iniciar(){
        this.idAnim = requestAnimationFrame(
            (t)=>{this.quadro(t)
        });
    }
    parar(){
        cancelAnimationFrame(this.idAnim);
        this.t0 = null;
        this.dt = null;
    }

    colisao(){
        for(let a = 0 ; a < this.sprites.length - 1 ; a++){
            const sA = this.sprites[a];
            for(let b = a ; b < this.sprites.length ; b++){
                const sB = this.sprites[b];
                if(sA.colisaoCom(sB)){

                }

            }
        }
    }

}