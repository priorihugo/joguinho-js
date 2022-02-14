import mapa2 from "../maps/mapa2.js";
import Sprite from "./Sprite.js";
import SpriteAtaque from "./SpriteAtaque.js";

export default class SpritePersonagem extends Sprite {
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

    this.hitbox = [];
    this.tamanhoEspada = 40;
    this.angulo = 0;
    this.angulo2 = 0;
    this.va = 8;
    this.vMax = 200;
    this.cont = 0;
    this.estado = 0;
    this.armaconfig = {
      larguraSprite: 12,
      alturaSprite: 24,
    };
    this.hp = 1;
    this.executando = false;
    this.morreu = false

    this.vQuadro = 7;
    this.quadro = 0;

    this.spriteConfig = {
      img: this.cena?.assets.getImg("enemy1"),
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
  acao(dt) {}
  hit() {
    if (!this.executando) {
      this.executando = true;
      this.quadro = 0;
      const aux = this.gerenciadorDeSprite;
      this.gerenciadorDeSprite = function (ctx) {
        this.quadro += this.cena.dt * this.vQuadro;
        if (this.quadro >= 4) {
          this.quadro = 0;
          this.hp--;
          this.gerenciadorDeSprite = aux;
          this.executando = false
          return;
        }
        ////
        let acao = this.spriteConfig.hurt;
        if (this.vx > 0) {
          this.estado = 0;
        } else if (this.vx < 0) {
          this.estado = 4;
        }
        ctx.drawImage(
          this.cena.assets.getImg("pc"),
          //
          Math.floor(this.quadro + this.estado) * this.spriteConfig.offset +
            this.spriteConfig.fatorCorrecao,
          this.spriteConfig.offset * acao,
          this.spriteConfig.offset - 2 * this.spriteConfig.fatorCorrecao,
          this.spriteConfig.offset,
          //
          this.x - this.w / 2,
          this.y - this.h / 2,
          this.w,
          this.h
        );
      };
    }
  }
  setaAtaque() {
    const numHitbox = 4;
    for (let i = 0; i < numHitbox; i++) {
      const xd = new Sprite({
        x: this.x,
        y: this.y,
        w: 4 + this.tamanhoEspada / numHitbox,
        h: 4 + this.tamanhoEspada / numHitbox,
        color: "red",
        tags: ["ataquePc"],
      });
      this.cena.adicionar(xd);
      this.hitbox.push(xd);
    }
    this.angulo = 0;
  }
  mover(dt) {
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
    this.calculaPosicao();

    //this.angulo2 = this.angulo2 + this.va * dt;)

    {
      if (this.angulo > this.angulo2) {
        if (this.angulo - this.angulo2 > Math.PI) {
          this.angulo2 -= dt * 7;
        } else {
          this.angulo2 += dt * 7;
        }
      } else {
        if (this.angulo - this.angulo2 < -Math.PI) {
          this.angulo2 += dt * 7;
        } else {
          this.angulo2 -= dt * 7;
        }
      }
      if (this.angulo2 >= Math.PI) {
        this.angulo2 = -Math.PI;
      } else if (this.angulo2 < -Math.PI) {
        this.angulo2 = Math.PI;
      }
    }
    const x0 = this.x + (Math.cos(this.angulo).toPrecision(2) * this.w) / 4;
    const y0 = this.y + (Math.sin(this.angulo).toPrecision(2) * this.h) / 4;
    const c = Math.cos(this.angulo).toPrecision(2);
    const s = Math.sin(this.angulo).toPrecision(2);

    const r = this.tamanhoEspada / this.hitbox.length;

    this.cena.ctx.save();
    for (let i = 0; i < this.hitbox.length; i++) {
      const hb = this.hitbox[i];
      hb.x = x0 + c * r * (i + 1);
      hb.y = y0 + s * r * (i + 1);
    }
    this.cena.ctx.translate(x0, y0);
    this.cena.ctx.rotate(this.angulo - (3 * Math.PI) / 2);
    this.cena.ctx.drawImage(
      this.cena.assets.getImg("armas"),
      ///source
      24,
      0,
      12,
      24,
      ///canvas
      -6,
      -this.tamanhoEspada * 1.2,
      12,
      this.tamanhoEspada * 1.2
    );
    this.cena.ctx.restore();
  }
  desenhar(ctx) {
    //super.desenhar(ctx);
    this.gerenciadorDeSprite(ctx);
  }
  gerenciadorDeSprite(ctx) {
    this.quadro += this.cena.dt * this.vQuadro;
    if (this.quadro >= 4) {
      this.quadro = 0;
    }
    ////
    let acao = this.spriteConfig.idle;

    if (this.vx != 0 || this.vy != 0) {
      acao = this.spriteConfig.run;
      if (this.vx > 0) {
        this.estado = 0;
      } else if (this.vx < 0) {
        this.estado = 4;
      }
    }
    ctx.drawImage(
      this.cena.assets.getImg("pc"),
      //
      Math.floor(this.quadro + this.estado) * this.spriteConfig.offset +
        this.spriteConfig.fatorCorrecao,
      this.spriteConfig.offset * acao,
      this.spriteConfig.offset - 2 * this.spriteConfig.fatorCorrecao,
      this.spriteConfig.offset,
      //
      this.x - this.w / 2,
      this.y - this.h / 2,
      this.w,
      this.h
    );
  }
  morre() {
    this.controlar = (dt) => {};
    this.acao = (dt) => {};
    this.mover = (dt) => {};

    this.desenhar = function (ctx) {
      this.quadro += this.cena.dt * this.vQuadro;
      let c = (this.quadro += this.cena.dt * this.vQuadro/2)%4;
      if (this.quadro >= 7) {
        this.morreu = true;
      }
      ////
      let acao = this.spriteConfig.death;
      ctx.drawImage(
        this.cena.assets.getImg("pc"),
        //
        Math.floor(c + this.estado) * this.spriteConfig.offset +
          this.spriteConfig.fatorCorrecao,
        this.spriteConfig.offset * acao,
        this.spriteConfig.offset - 2 * this.spriteConfig.fatorCorrecao,
        this.spriteConfig.offset,
        //
        this.x - this.w / 2,
        this.y - this.h / 2,
        this.w,
        this.h
      );
    };
  }
}
