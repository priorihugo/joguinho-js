import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import mapa1 from "../maps/mapa1.js";
import mapa2 from "../maps/mapa2.js";
import SpritePersonagem from "./SpritePersonagem.js";
import SpriteInimigo from "./SpriteInimigo.js";

export default class CenaJogo extends Cena {
  quandoColide(a, b) {
    if (a.tags.has("ataquePc")) {
      if (b.tags.has("enemy")) {
        this.assets.play("hurt");
        b?.morre();
        //this.marcaRemocao(b);
      }
    }
    if (a.tags.has("pc") && b.tags.has("enemy")) {
      //this.marcaRemocao(a);
      //this.marcaRemocao(b);
      //this.game.selecionaCena("fim");
    }
  }
  preparar() {
    const cena = this;
    super.preparar();
    const cenario01 = new Mapa();
    cena.configuraMapa(cenario01);
    cenario01.carregaMapa(mapa2);
    const pc = new SpritePersonagem({
      x: this.canvas.height/2,
      y: this.canvas.width/2,
      h: this?.mapa.TAMANHO,
      w: 20,
      tags: ["pc"],
    });
    this._pc = pc;
    cena.adicionar(pc);
    pc.setaAtaque();
    //pc.configuraAtaque();
    pc.controlar = function (dt) {
      if (cena.input.comandos.get("MOVE_ESQUERDA")) {
        pc.vx = -200;
        pc.direcao = "esquerda";
      } else if (cena.input.comandos.get("MOVE_DIREITA")) {
        pc.vx = +200;
        pc.direcao = "direita";
      } else {
        pc.vx = 0;
      }
      //
      if (cena.input.comandos.get("MOVE_CIMA")) {
        pc.vy = -200;
      } else if (cena.input.comandos.get("MOVE_BAIXO")) {
        pc.vy = +200;
      } else {
        pc.vy = 0;
      }
      const va_max = 4;
      if (cena.input.comandos.get("ATAQUE_ANTIHORARIO")) {
        pc.va = va_max;
      } else if (cena.input.comandos.get("ATAQUE_HORARIO")) {
        pc.va = -va_max;
      } else {
        //pc.va = 0;
      }
    };
    function persegue(dt) {
      this.vx = 600 * Math.sign(pc.x - this.x) * dt;
      this.vy = 600 * Math.sign(pc.y - this.y) * dt;
    }
    function atirar(dt) {
      this.cooldown += dt;
      const v = 800;
      if (this.cooldown >= 4) {
        const angulo = Math.atan2(pc.y - this.y, pc.x - this.x).toPrecision(2);
        const vx = Math.cos(angulo).toPrecision(2) * v;
        const vy = Math.sin(angulo).toPrecision(2) * v;
        let ww = 0,
          hh = 0;
        if (Math.abs(this.x - pc.x) > Math.abs(this.y - pc.y)) {
          ww = 40;
          hh = 4;
        } else {
          ww = 4;
          hh = 40;
        }
        const projetil = new Sprite({
          color: "red",
          x: this.x,
          y: this.y,
          w: ww,
          h: hh,
          vx: vx,
          vy: vy,
          tags: ["projetil"],
        });
        cena.adicionar(projetil);
        this.cooldown = 0;
      }
    }
    function novoInimigoAleatorio() {
      let nX;
      let nY;
      let ncor = Math.round(Math.random() * 4);
      let cor;

      switch (ncor) {
        case 0:
          cor = "yellow";
          break;
        case 1:
          cor = "red";
          break;
        case 2:
          cor = "blue";
          break;
        case 3:
          cor = "green";
          break;
        case 4:
          cor = "orange";
          break;
      }
      do {
        nX = Math.floor(Math.random() * cenario01.COLUNAS);
        nY = Math.floor(Math.random() * cenario01.LINHAS);
      } while (mapa2[nY][nX] !== 0);

      nY = nY * 32 + 32 / 2;
      nX = nX * 32 + 32 / 2;

      const novoSprite = new SpriteInimigo({
        x: nX,
        y: nY,
        color: cor,
        w: 20,
        tags: ["enemy"],
      });
      novoSprite.controlar = persegue;
      //novoSprite.acao = atirar;
      cena.adicionar(novoSprite);
    }
    //this.event = novoInimigoAleatorio;

    this.ctx.canvas.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX - cena.ctx.canvas.offsetLeft;
      const mouseY = e.clientY - cena.ctx.canvas.offsetTop;
      const angulo = Math.atan2(mouseY - pc.y, mouseX - pc.x).toPrecision(2);
      pc.angulo = angulo ;
    });
  }
}
