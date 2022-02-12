
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
      img : this.cena?.assets.getImg("enemy1"),
      fatorCorrecao: 5,
      idle: 0,
      walk: 1,
      run: 2,
      turn: 3,
      hurt: 4,
      death: 5,
      offset: 24,
    };
  }
  desenhar(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.strokeStyle = "blue";
    ctx.strokeRect(
      this.mx * this.cena.mapa.TAMANHO,
      this.my * this.cena.mapa.TAMANHO,
      this.cena.mapa.TAMANHO,
      this.cena.mapa.TAMANHO
    );
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
      this.cena.assets.getImg("enemy1"),
      //
      Math.floor(this.quadro + direcao)*this.spriteConfig.offset + this.spriteConfig.fatorCorrecao,
      this.spriteConfig.offset*acao,
      this.spriteConfig.offset - 2*this.spriteConfig.fatorCorrecao,
      this.spriteConfig.offset,
      //
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
  }
}
