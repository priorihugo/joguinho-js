import Sprite from "./Sprite.js";

export default class SpriteAtaque extends Sprite {
  ///so criei essa classe pra sprites se autodeletarem
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
    super({ x: x, y: y, h: h, w: w, color: color, vx: vx, vy: vy, tags: tags });
    ///
    this.quadro = 0;
    this.vQuadro = 7;
    this.spriteConfig = {
      img: null,
      sx: 0,
      sy: 0,
      sw: 0,
      sh: 0,
      w: 0,
      h: 0,
    };
  }

  setDuracao(duracao = 2) {
    this.duracao = duracao;
    this.tempo = 0;
    this.autodestruir = true;
  }
  acao(dt) {
    if (this.autodestruir) {
      this.tempo += dt;
      if (this.tempo > this.duracao) {
        this.cena.aRemover.push(this);
      }
    }
  }
  desenhar(ctx) {
    //super.desenhar(ctx);
    let maior = this.h;
    let menor = this.w;
    if (this.spriteConfig.img != null) {
      ctx.save();
      ctx.translate(this.x, this.y);
      if (this.h < this.w) {
        maior = this.w;
        menor = this.h;
        ctx.rotate(Math.PI / 2);
      }
      ctx.drawImage(
        this.spriteConfig.img,
        //
        this.spriteConfig.sx * this.spriteConfig.sw,
        this.spriteConfig.sy * this.spriteConfig.sh,
        this.spriteConfig.sw,
        this.spriteConfig.sh,
        //
        -(menor*(3/2)),
        -maior / 2,
        this.spriteConfig.sw,
        maior
      );
      ctx.restore();
    }
  }
}
