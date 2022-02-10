import mapa2 from "../maps/mapa2.js";
import Sprite from "./Sprite.js";
import SpriteAtaque from "./SpriteAtaque.js";

export default class SpritePersonagem extends Sprite {
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
    this.hitbox = [];
    this.tamanhoEspada = 80;
    this.angulo = 0;
    this.va = 8;
    this.cont = 0;
    const numHitbox = 5;
    //const cena = this.cena;
    for (let i = 0; i < numHitbox; i++) {
      const xd = new Sprite({
        w: this.tamanhoEspada / numHitbox,
        h: this.tamanhoEspada / numHitbox,
        color: "blue",
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

    /*if (this.angulo < 0) {
      this.angulo = 0;
      this.va = 0;
    } else if (this.angulo > Math.PI) {
      this.angulo = Math.PI;
      this.va = 0;
    }

    this.angulo = this.angulo + this.va * dt;
*/
    const c = Math.cos(this.angulo).toPrecision(2);
    const s = Math.sin(this.angulo).toPrecision(2);

    const r = this.tamanhoEspada / this.hitbox.length;
    for (let i = 0; i < this.hitbox.length; i++) {
      const hb = this.hitbox[i];
      hb.x = this.x + c * r * (i + 1);
      hb.y = this.y + s * r * (i + 1);
      //hb.vx = 40 * Math.sign(this.x + c * r * (i + 1) - hb.x) * dt;
      //hb.vy = 40 * Math.sign(this.y + s * r * (i + 1) - hb.y) * dt;
    }
  }
}
