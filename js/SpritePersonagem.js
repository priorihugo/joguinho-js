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
    this.cont = 0;
    this.estado = 0;
    this.armaconfig = {
      larguraSprite: 12,
      alturaSprite: 24,

    }

    //this.setaAtaque();

    this.quadro = 0;
    this.vQuadro = 7;

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
  acao(dt) {
    /*
    const pc = this;
    const config = {
      x: this.x,
      y: this.y,
    };
    switch (this.direcao) {
      case "esquerda":
        config.x = this.x - this.w;
        break;
      case "direita":
        config.x = this.x + this.w;
        break;
      case "cima":
        config.y = config.y - this.h;
        break;
      case "baixo":
        config.y = config.y + this.h;
        break;
    }
    function seguir(dt) {
      const config = {
        x: 0,
        y: 0,
      };
      switch (pc.direcao) {
        case "esquerda":
          config.x = -pc.w;
          break;
        case "direita":
          config.x = +pc.w;
          break;
        case "cima":
          config.y = -pc.h;
          break;
        case "baixo":
          config.y = +pc.h;
          break;
      }
      this.x = pc.x + config.x;
      this.y = pc.y + config.y;
    }
    const cena = this.cena;
    this.cooldownAtaque += dt;
    if (this.atacando) this.duracao += dt;
    const ataque = new SpriteAtaque({
      x: config.x,
      y: config.y,
      color: "red",
      tags: ["ataquePc"],
      w: this.w * 1.5,
      h: this.h * 1.5,
    });
    ataque.setDuracao(this.MAX_duracaoAtaque);
    ataque.controlar = seguir;
 
    if (cena.input.comandos.get("ATACAR")) {
      if (this.cooldownAtaque >= this.Max_cooldownAtaque) {
        cena.adicionar(ataque);
        this.cooldownAtaque = 0;
        //cena.aRemover.push(ataque);
      }
    }
    */
  }
  /*
  configuraAtaque({ MAX_duracaoAtaque = 0.5, Max_cooldownAtaque = 1 } = {}) {
    this.atacando = false;
    this.MAX_duracaoAtaque = MAX_duracaoAtaque;
    this.duracao = 0;
    this.Max_cooldownAtaque = Max_cooldownAtaque;
    this.cooldownAtaque = Max_cooldownAtaque;
  }
  */
  setaAtaque() {
    const numHitbox = 4;
    for (let i = 0; i < numHitbox; i++) {
      const xd = new Sprite({
        x: this.x,
        y: this.y,
        w: this.tamanhoEspada / numHitbox,
        h: this.tamanhoEspada / numHitbox,
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

    //this.angulo2 = this.angulo2 + this.va * dt;

    if (this.angulo > this.angulo2) {
      if (this.angulo - this.angulo2 > Math.PI) {
        this.angulo2 -= dt * 2;
      } else {
        this.angulo2 += dt * 2;
      }
    } else {
      if (this.angulo - this.angulo2 < -Math.PI) {
        this.angulo2 += dt * 2;
      } else {
        this.angulo2 -= dt * 2;
      }
    }
    if (this.angulo2 >= Math.PI) {
      this.angulo2 = -Math.PI;
    } else if (this.angulo2 < -Math.PI) {
      this.angulo2 = Math.PI;
    }
    const x0 = this.x + (Math.cos(this.angulo2).toPrecision(2) * this.w/4);
    const y0 = this.y + (Math.sin(this.angulo2).toPrecision(2) * this.h/4);
    const c = Math.cos(this.angulo2).toPrecision(2);
    const s = Math.sin(this.angulo2).toPrecision(2);
 
    const r = this.tamanhoEspada / this.hitbox.length;

    this.cena.ctx.save();
    for (let i = 0; i < this.hitbox.length; i++) {
      const hb = this.hitbox[i];
      hb.x = x0 + c * r * (i + 1);
      hb.y = y0 + s * r * (i + 1);
    }
    let x = this.angulo
    this.cena.ctx.translate(x0 , y0)
    this.cena.ctx.rotate(this.angulo2 - 3*Math.PI/2);
    this.cena.ctx.drawImage(this.cena.assets.getImg("armas"),
    ///source
    24,
    0,
    12,
    24,
    ///canvas
    -6,
    -this.tamanhoEspada*1.2,
    12,
    this.tamanhoEspada*1.2
    )
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
    if (this.vx > 0) {
      this.estado = 0;
      acao = this.spriteConfig.run;
    } else if (this.vx < 0) {
      this.estado = 4;
      acao = this.spriteConfig.run;
    } else if ((this.vx = 0)) {
      acao = this.spriteConfig.idle;
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

    this.desenhar = function(ctx) {
      
      /*ctx.fillStyle = this.color;
      ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
      ctx.strokeStyle = "blue";
      ctx.strokeRect(
        this.mx * this.cena.mapa.TAMANHO,
        this.my * this.cena.mapa.TAMANHO,
        this.cena.mapa.TAMANHO,
        this.cena.mapa.TAMANHO
      );
      */
      this.quadro += this.cena.dt * this.vQuadro;
      if (this.quadro >= 7) {
        this.cena.aRemover.push(this);
      }
      ////
      let acao = this.spriteConfig.death;
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
