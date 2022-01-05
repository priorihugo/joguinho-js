export default class Sprite{

    constructor(){
        this.x = 0;
        this.y = 0;
        this.h = 0;
        this.w = 0;
        
    }

    desenhar(ctx){
        ctx.fillStyle = "black";
        ctx.fillRect( this.x , this.y , this.w , this.h);
    }

}