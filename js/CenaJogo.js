import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import mapa1 from "../maps/mapa1.js";
import mapa2 from "../maps/mapa2.js";
import SpritePersonagem from "./SpritePersonagem.js";
import SpriteInimigo from "./SpriteInimigo.js";
import SpriteAtaque from "./SpriteAtaque.js";

export default class CenaJogo extends Cena {
  constructor(canvas = null, assets = null, input = null) {
    super(canvas, assets, input);

    this.maxInimigos = 2;
    this.nInimigos = this.maxInimigos;
    this.intervalo = 2 / this.maxInimigos;
    this.nInimigosAtivos = this.maxInimigos;
  }

  quandoColide(a, b) {
    if (a.tags.has("ataquePc")) {
      if (b.tags.has("enemy")) {
        this.assets.play("hurt");
        b?.morre();
        this.nInimigosAtivos--;
        //this.marcaRemocao(b);
      }
      if(b.tags.has("projetil")){
        this.marcaRemocao(b)
      }
    }
    if (a.tags.has("pc") && b.tags.has("enemy")) {
      //this.marcaRemocao(a);
      //this.marcaRemocao(b);
      //this.game.selecionaCena("fim");
    }
  }
  passo(dt) {
    for (const sprite of this.sprites) {
      sprite.passo(dt);
    }
    this.evento(dt);
  }
  evento(dt) {
    //funcoes

    const cena = this;

    function persegue(dt) {
      this.vx = 600 * Math.sign(cena.pc.x - this.x) * dt;
      this.vy = 600 * Math.sign(cena.pc.y - this.y) * dt;
    }
    function atirar(dt) {
      this.cooldown += dt;
      const v = 200;
      if (this.cooldown >= 4) {
        const angulo = Math.atan2(
          cena.pc.y - this.y,
          cena.pc.x - this.x
        ).toPrecision(2);
        const vx = Math.cos(angulo).toPrecision(2)*v *dt;
        const vy = Math.sin(angulo).toPrecision(2)*v *dt;
        let ww = 0,
          hh = 0;
        if (Math.abs(this.x - cena.pc.x) > Math.abs(this.y - cena.pc.y)) {
          ww = 40;
          hh = 4;
        } else {
          ww = 4;
          hh = 40;
        }
        const projetil = new SpriteAtaque({
          color: "red",
          x: this.x,
          y: this.y,
          w: ww,
          h: hh,
          vx: vx,
          vy: vy,
          tags: ["projetil"],
        });
        projetil.spriteConfig = {
          img: cena.assets.getImg("arco"),
          sx: 0,
          sy: 0,
          sw: 12,
          sh: 24,
          w: ww,
          h: hh,
        }
        cena.adicionar(projetil);
        this.cooldown = 0;
      }
    }
    function novoInimigoAleatorio() {
      let nX;
      let nY;
      let novoSprite;
      do {
        nX = Math.floor(Math.random() * cena.mapa.COLUNAS);
        nY = Math.floor(Math.random() * cena.mapa.LINHAS);
      } while (mapa2[nY][nX] !== 0);

      nY = nY * cena.mapa.TAMANHO + cena.mapa.TAMANHO / 2;
      nX = nX * cena.mapa.TAMANHO + cena.mapa.TAMANHO / 2;

      let nImg = Math.round(Math.random() * 4);
      switch (nImg) {
        case 0:
          novoSprite = new SpriteInimigo({
            x: nX,
            y: nY,
            w: 20,
            tags: ["enemy"],
          });
          novoSprite.spriteConfig = {
            img: cena.assets.getImg("orc"),
            fatorCorrecao: 5,
            idle: 0,
            walk: 1,
            run: 2,
            turn: 3,
            hurt: 4,
            death: 5,
            offset: 24,
          };
          novoSprite.armaConfig = {
            img: cena.assets.getImg("armas"),
            tipo: 2,
            qualidade: 2,
            larguraSprite: 12,
            alturaSprite: 24,
          };
          novoSprite.controlar = persegue;
          break;
        case 1:
          novoSprite = new SpriteInimigo({
            x: nX,
            y: nY,
            w: 20,
            tags: ["enemy"],
          });
          novoSprite.spriteConfig = {
            img: cena.assets.getImg("demon"),
            fatorCorrecao: 5,
            idle: 0,
            walk: 1,
            run: 2,
            turn: 3,
            hurt: 4,
            death: 5,
            offset: 24,
          };
          novoSprite.armaConfig = {
            img: cena.assets.getImg("armas"),
            tipo: 1,
            qualidade: 2,
            larguraSprite: 12,
            alturaSprite: 24,
          };
          novoSprite.controlar = persegue;
          break;
        case 2:
          novoSprite = new SpriteInimigo({
            x: nX,
            y: nY,
            w: 20,
            tags: ["enemy"],
          });
          novoSprite.spriteConfig = {
            img: cena.assets.getImg("skeleton"),
            fatorCorrecao: 5,
            idle: 1,
            walk: 2,
            run: 3,
            turn: 4,
            hurt: 5,
            death: 6,
            offset: 24,
          };
          novoSprite.armaConfig = {
            img: cena.assets.getImg("arco"),
            tipo: 0,
            qualidade: 1,
            larguraSprite: 12,
            alturaSprite: 24,
          };
          novoSprite.controlar = persegue;
          novoSprite.acao = atirar;
          break;
        case 3:
          novoSprite = new SpriteInimigo({
            x: nX,
            y: nY,
            w: 20,
            tags: ["enemy"],
          });
          novoSprite.spriteConfig = {
            img: cena.assets.getImg("goblin"),
            fatorCorrecao: 5,
            idle: 0,
            walk: 1,
            run: 2,
            turn: 3,
            hurt: 4,
            death: 5,
            offset: 24,
          };
          novoSprite.armaConfig = {
            img: cena.assets.getImg("armas"),
            tipo: 1,
            qualidade: 2,
            larguraSprite: 12,
            alturaSprite: 24,
          };
          novoSprite.controlar = persegue;

          break;
        case 4:
          novoSprite = new SpriteInimigo({
            x: nX,
            y: nY,
            w: 20,
            tags: ["enemy"],
          });
          novoSprite.spriteConfig = {
            img: cena.assets.getImg("necromancer"),
            fatorCorrecao: 5,
            idle: 0,
            walk: 1,
            run: 1,
            turn: 2,
            hurt: 3,
            death: 4,
            offset: 24,
          };
          novoSprite.armaConfig = {
            img: cena.assets.getImg("armas"),
            tipo: 3,
            qualidade: 2,
            larguraSprite: 12,
            alturaSprite: 24,
          };
          novoSprite.controlar = persegue;
          //novoSprite.acao = atirar;
          break;
      }
      cena.adicionar(novoSprite);
    }

    ///preparacao do evento
    this.contagem += dt;
    if (this.contagem > this.intervalo) {
      //console.log(this.nInimigos);
      if (this.nInimigos > 0) {
        novoInimigoAleatorio();
        this.nInimigos--;
        this.contagem = 0;
      } else {
        if(this.nInimigosAtivos === 0 ){
          this.preparar();
        }
      }
    }
  }
  preparar() {
    const cena = this;

    super.preparar();
    ///mapa
    const cenario01 = new Mapa();
    cena.configuraMapa(cenario01);
    cenario01.carregaMapa(mapa2);

    ///
    this.maxInimigos *= 2;
    this.nInimigos = this.maxInimigos;
    this.nInimigosAtivos = this.maxInimigos;
    this.contagem = 0;

    ///sprite personagem
    const pc = new SpritePersonagem({
      x: this.canvas.height / 2,
      y: this.canvas.width / 2,
      h: this?.mapa.TAMANHO,
      w: 20,
      tags: ["pc"],
    });
    this.pc = pc;
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
    this.ctx.canvas.addEventListener("mousemove", (e) => {
      const mouseX = e.clientX - cena.ctx.canvas.offsetLeft;
      const mouseY = e.clientY - cena.ctx.canvas.offsetTop;
      const angulo = Math.atan2(mouseY - pc.y, mouseX - pc.x).toPrecision(2);
      cena.pc.angulo = angulo;
    });
  }
}
