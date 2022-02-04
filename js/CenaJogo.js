import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import mapa1 from "../maps/mapa1.js";
import mapa2 from "../maps/mapa2.js";
import SpritePersonagem from "./SpritePersonagem.js";

export default class CenaJogo extends Cena {
  quandoColide(a, b) {
    this.assets.play("hurt");
    if (!this.aRemover.includes(a)) {
      this.aRemover.push(a);
    }
    if (!this.aRemover.includes(b)) {
      this.aRemover.push(b);
    }
    if(a.tags.has("pc")){
      this.game.selecionaCena("fim");
    }
  }

  preparar() {
    super.preparar();

    const cenario01 = new Mapa();
    this.configuraMapa(cenario01);
    cenario01.carregaMapa(mapa2);
    const pc = new SpritePersonagem({ x: 64, y: 64, h: 32, w: 32, tags: ["pc"] });
    const en = new Sprite({ x: 26 * 32, y: 64, color: "red", h: 32, w: 32 });
    const en2 = new Sprite({ x: 300, y: 50, color: "orange" });

    en.controlar = persegue;
    en2.controlar = persegue;

    const cena = this;

    pc.controlar = function (dt) {
      if (cena.input.comandos.get("MOVE_ESQUERDA")) {
        pc.vx = -200;
      } else if (cena.input.comandos.get("MOVE_DIREITA")) {
        pc.vx = +200;
      } else {
        pc.vx = 0;
      }
      if (cena.input.comandos.get("MOVE_CIMA")) {
        pc.vy = -200;
      } else if (cena.input.comandos.get("MOVE_BAIXO")) {
        pc.vy = +200;
      } else {
        pc.vy = 0;
      }
    };
    function persegue(dt) {
      this.vx = 50 * Math.sign(pc.x - this.x);
      this.vy = 50 * Math.sign(pc.y - this.y);
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
        //console.log(nY , nX);
        //console.log(mapa2[nY][nX]);
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
      this.adicionar(novoSprite);
    }
    this.adicionar(pc);
    this.event = novoInimigoAleatorio;
  }
}
