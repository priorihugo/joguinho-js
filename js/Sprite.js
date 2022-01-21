export default class Sprite{

    constructor({x = 0 , y = 0 , h = 40 , w = 40, color = "white", vx = 0, vy = 0 } = {}){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.cena = null;
        
    }
    desenhar(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect( this.x - this.w/2, this.y -this.h/2 , this.w , this.h);
    }
    passo(dt){
        this.x = this.x + this.vx * dt
        this.y = this.y + this.vy * dt
        //console.log("[dt] " + dt)
    }
    colisaoCom(outro){
        return !((this.x - this.w/2 > outro.x + outro.w/2 + outro.w) ||
                 (this.x + this.w/2 < outro.x - outro.w/2) ||
                 (this.y - this.h/2 > outro.y + outro.h/2) ||
                 (this.y + this.h/2 < outro.y - outro.h/2)
                )
    }
}