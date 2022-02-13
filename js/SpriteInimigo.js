
import Sprite from "./Sprite.js";
export default class SpriteInimigo extends Sprite {
  constructor({
    x = 0,
    y = 0,
    h = 32,
    w = 20,
    color = "white",
    vx = 0,
    vy = 0,
    tags = [],
  } = {}) {
    super({x:x, y:y ,h:h, w:w, color:color, vx:vx, vy:vy, tags:tags,  })
    ///
    this.quadro = 0;
    this.vQuadro = 7;
    this.spriteConfig = {
      img : null,
      fatorCorrecao: 5,
      idle: 0,
      walk: 1,
      run: 2,
      turn: 3,
      hurt: 4,
      death: 5,
      offset: 24,
    };

    this.armaConfig = {
    }
  }
  desenhar(ctx) {
    //super.desenhar(ctx);
    this.gerenciadorDeSprite(ctx);
  }
  gerenciadorDeSprite(ctx) {
    this.quadro+=this.cena.dt * this.vQuadro;
    if(this.quadro >= 4){
      this.quadro = 0;
    }
    let direcao = 0;
    let acao = this.spriteConfig.idle;
    if(this.vx > 0 ){
      direcao = 0;
      acao = this.spriteConfig.run;
    }else if(this.vx < 0){
      direcao = 4;
      acao = this.spriteConfig.run
    }else if(this.vx = 0){
      acao = this.spriteConfig.idle;
    }
    ctx.drawImage(
      this.spriteConfig.img,
      //
      Math.floor(this.quadro + direcao)*this.spriteConfig.offset + this.spriteConfig.fatorCorrecao,
      this.spriteConfig.offset*acao + this.spriteConfig.fatorCorrecao,
      this.spriteConfig.offset - 2*this.spriteConfig.fatorCorrecao,
      this.spriteConfig.offset - this.spriteConfig.fatorCorrecao,
      //
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
    this.desenhaArma(ctx)
  }
  desenhaArma(ctx){
    const posicao = this.vx>0? this.w/2 : -this.w

    
    ctx.drawImage(
      this.armaConfig.img,
      //
      this.armaConfig.qualidade*this.armaConfig.larguraSprite,
      this.armaConfig.tipo*this.armaConfig.alturaSprite,
      this.armaConfig.larguraSprite,
      this.armaConfig.alturaSprite,
      //
      this.x + posicao,
      this.y - this.h / 2,
      this.armaConfig.larguraSprite,
      this.armaConfig.alturaSprite
    );
  }
  morre() {
    const direcao = this.vx > 0 ? 0 : 4;

    this.controlar = (dt) => {};
    this.acao = (dt) => {};
    this.mover = (dt) => {};
    this.desenhaArma = (ctx) =>{};
    this.tags.clear();

    this.quadro = 0;
    this.desenhar = (ctx) => {
      /*
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
      ctx.strokeStyle = "blue";
      ctx.strokeRect(
        this.mx * this.cena.mapa.TAMANHO,
        this.my * this.cena.mapa.TAMANHO,
        this.cena.mapa.TAMANHO,
        this.cena.mapa.TAMANHO
      );
      */
      this.quadro += this.cena.dt * (this.vQuadro -2);  
      ////
      let acao = this.spriteConfig.death;
      ctx.drawImage(
        this.spriteConfig.img,
        //
        Math.floor(this.quadro + direcao)*this.spriteConfig.offset + this.spriteConfig.fatorCorrecao,
        this.spriteConfig.offset*acao + this.spriteConfig.fatorCorrecao,
        this.spriteConfig.offset - 2*this.spriteConfig.fatorCorrecao,
        this.spriteConfig.offset - this.spriteConfig.fatorCorrecao,
        //
        this.x - this.w / 2,
        this.y - this.h / 2,
        this.w,
        this.h
      );

      if (this.quadro > 3) {
        this.cena.aRemover.push(this);
      }
    };
  }
}
