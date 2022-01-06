export default class Sprite{

    constructor({x = 0 , y = 0 , h = 40 , w = 40, color = "white"} = {}){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.color = color;
        
    }
    desenhar(ctx){
        console.log("Desenhando sprite")

        ctx.fillStyle = this.color;
        ctx.fillRect( this.x , this.y , this.w , this.h);
    }

}