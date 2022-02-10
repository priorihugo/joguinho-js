import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import mapa1 from "../maps/mapa1.js";
import mapa2 from "../maps/mapa2.js";
import SpritePersonagem from "./SpritePersonagem.js";

export default class CenaJogo extends Cena {
  quandoColide(a, b) {
    if (a.tags.has("ataquePc")) {
      if (b.tags.has("enemy")) {
        this.assets.play("hurt");
        this.marcaRemocao(b);
      }
    }
    if (a.tags.has("pc") && b.tags.has("enemy")) {
      this.marcaRemocao(a);
      this.marcaRemocao(b);
      this.game.selecionaCena("fim");
    }
  }
  preparar() {
    const cena = this;
    super.preparar();
    const cenario01 = new Mapa();
    this.configuraMapa(cenario01);
    cenario01.carregaMapa(mapa2);
    const pc = new SpritePersonagem({
      x: 64,
      y: 64,
      h: 32,
      w: 32,
      tags: ["pc"],
    });
    this.adicionar(pc);
    pc.setaAtaque();
    pc.configuraAtaque();
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
        pc.direcao = "cima";
      } else if (cena.input.comandos.get("MOVE_BAIXO")) {
        pc.vy = +200;
        pc.direcao = "baixo";
      } else {
        pc.vy = 0;
      }
      //
      const va_max = 4;
      if (cena.input.comandos.get("ATAQUE_ANTIHORARIO")) {
        pc.va = va_max;
      } else if (cena.input.comandos.get("ATAQUE_HORARIO")) {
        pc.va = -va_max;
      } else {
        // pc.va = 0;
      }
    };
    function persegue(dt) {
      this.vx = 600 * Math.sign(pc.x - this.x) * dt;
      this.vy = 600 * Math.sign(pc.y - this.y) * dt;
    }
    function perseguePonto(dt, alvo) {
      this.vx = 600 * Math.sign(alvo.x - this.x) * dt;
      this.vy = 600 * Math.sign(alvo.y - this.y) * dt;
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

      const novoSprite = new Sprite({
        x: nX,
        y: nY,
        color: cor,
        tags: ["enemy"],
      });
      novoSprite.controlar = persegue;
      cena.adicionar(novoSprite);
    }
    //this.event = novoInimigoAleatorio;

    this.ctx.canvas.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX - cena.ctx.canvas.offsetLeft;
      const mouseY = e.clientY - cena.ctx.canvas.offsetTop;
      const angulo = Math.atan2(mouseY - pc.y, mouseX - pc.x).toPrecision(2);
      pc.angulo = angulo;
    });
  }
}
