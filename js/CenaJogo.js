import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import mapa1 from "../maps/mapa1.js";
import mapa2 from "../maps/mapa2.js";
import SpritePersonagem from "./SpritePersonagem.js";
import SpriteInimigo from "./SpriteInimigo.js";
import SpriteAtaque from "./SpriteAtaque.js";
import mapa3 from "../maps/mapa3.js";

export default class CenaJogo extends Cena {
  constructor(canvas = null, assets = null, input = null) {
    super(canvas, assets, input);

    this.resetaLvl();
  }
  resetaLvl() {
    this.maxInimigos = 2;
    this.nInimigos = this.maxInimigos;
    this.intervalo = 2 / this.maxInimigos;
    this.nInimigosAtivos = this.maxInimigos;
    this.limite = 2*this.maxInimigos;

  }
  desenhar(dt){
    super.desenhar();
    this.ctx.fillStyle = "purple"
    this.ctx.font = "20px Impact"
    this.ctx.textAlign = "left"
    this.ctx.fillText("Pontuaçao: " + this.pontuacao , 20 , 20);

    this.ctx.textAlign = "left"
    this.ctx.fillText("LVL: " + this.lvl , 20 , 60);

    this.ctx.textAlign = "left"
    this.ctx.fillText("HP: " + this.pc.hp , 20 , 100);
  }
  quandoColide(a, b) {
    if (a.tags.has("ataquePc")) {
      if (b.tags.has("enemy")) {
        this.assets.play("hurt");
        b?.morre();
        this.nInimigosAtivos--;
        this.pontuacao++;
        //this.marcaRemocao(b);
      }
      if (b.tags.has("projetil")) {
        this.marcaRemocao(b);
      }
    }
    if (a.tags.has("pc") && (b.tags.has("enemy") || b.tags.has("projetil"))) {
      //this.marcaRemocao(a);
      //this.marcaRemocao(b);
      this.pc.hit();
    }
  }
  novoLvl() {
    this.maxInimigos *= 2;
    this.nInimigos = this.maxInimigos;
    this.nInimigosAtivos = this.maxInimigos;
    this.contagem = 0;
    this.lvl++;
  }
  passo(dt) {
    for (const sprite of this.sprites) {
      sprite.passo(dt);
    }
    this.evento(dt);

    if(this.pc.hp < 1){
      this.pc.morre();
    }
    if(this.pc.morreu){
      this.resetaLvl();
      this.game.selecionaCena("fim");
    }
  }
  evento(dt) {
    //funcoes

    const cena = this;

    function persegue(dt) {
      this.vx = this.vMax * Math.sign(cena.pc.x - this.x) * dt;
      this.vy = this.vMax * Math.sign(cena.pc.y - this.y) * dt;
    }
    function flecha(dt) {
      this.cooldown += dt;
      const v = 1600;
      if (this.cooldown >= 4) {
        const angulo = Math.atan2(
          cena.pc.y - this.y,
          cena.pc.x - this.x
        ).toPrecision(2);
        const vx = Math.cos(angulo).toPrecision(2) * v * dt;
        const vy = Math.sin(angulo).toPrecision(2) * v * dt;
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
        };
        cena.adicionar(projetil);
        this.cooldown = 0;
      }
    }
    function spawnaEsqueleto(dt){
      this.cooldown+=dt;
       
      if(this.cooldown >= 20){
        for(let i = 0 ; i < 4 ; i ++){
          const offset = 2;
          const novoSprite = new SpriteInimigo({
            x: this.x + offset,
            y: this.w + offset* i,
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
          novoSprite.controlar = evitar;
          novoSprite.acao = flecha;
          cena.adicionar(novoSprite);
        }
      }
    }
    function fireball(dt){
        this.cooldown += dt;
        const v = 800;
        if (this.cooldown >= 8) {
          const angulo = Math.atan2(
            cena.pc.y - this.y,
            cena.pc.x - this.x
          ).toPrecision(2);
          const vx = Math.cos(angulo).toPrecision(2) * v * dt;
          const vy = Math.sin(angulo).toPrecision(2) * v * dt;

          const projetil = new SpriteAtaque({
            color: "red",
            x: this.x,
            y: this.y,
            w: 32,
            h: 32,
            vx: vx,
            vy: vy,
            tags: ["projetil"],
          });
          projetil.spriteConfig = {
            img: cena.assets.getImg("fogo"),
            sx: 1,
            sy: 1,
            sw: 16,
            sh: 16,
            w: 32,
            h: 32,
          };
          cena.adicionar(projetil);
          this.cooldown = 0;
      }
    }
    function evitar(dt) {

      const a = Math.abs(cena.pc.x - this.x)
      const b = Math.abs(cena.pc.y - this.y)

      if (a < 200 && b < 200) {
        this.vx = -this.vMax * Math.sign(cena.pc.x - this.x) * dt;
        this.vy = -this.vMax* Math.sign(cena.pc.y - this.y) * dt;
      } else {
        this.vx = this.vMax * Math.sign(cena.pc.x - this.x) * dt;
        this.vy = this.vMax * Math.sign(cena.pc.y - this.y) * dt;
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
          //novoSprite.acao = fireball;
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
          novoSprite.controlar = evitar;
          novoSprite.acao = flecha;
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
          novoSprite.controlar = evitar;
          novoSprite.acao = spawnaEsqueleto;
          break;
      }
      cena.adicionar(novoSprite);
    }

    ///preparacao do evento
    if(this.pontuacao >= this.limite){
      this.pc.hp++;
      this.limite+=2;
    }
    this.contagem += dt;
    if (this.contagem > this.intervalo) {
      //console.log(this.nInimigos);
      if (this.nInimigos > 0) {
        novoInimigoAleatorio();
        this.nInimigos--;
        this.contagem = 0;
      } else {
        if (this.nInimigosAtivos === 0) {
          if (this.contagem > 10) {
            this.novoLvl();
          }
        } else {
          this.contagem = 0;
        }
      }
    }
  }
  preparar() {
    const cena = this;
    super.preparar();

    this.pontuacao = 0;
    this.lvl = 0; 
    this.limite = 2*this.maxInimigos;
    ///mapa
    const cenario01 = new Mapa();
    cena.configuraMapa(cenario01);
    cenario01.carregaMapa(mapa2);

    ///
    this.novoLvl();

    ///sprite personagem
    const pc = new SpritePersonagem({
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
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
        pc.vx = -pc.vMax;
        pc.direcao = "esquerda";
      } else if (cena.input.comandos.get("MOVE_DIREITA")) {
        pc.vx = +pc.vMax;
        pc.direcao = "direita";
      } else {
        pc.vx = 0;
      }
      //
      if (cena.input.comandos.get("MOVE_CIMA")) {
        pc.vy = -pc.vMax;
      } else if (cena.input.comandos.get("MOVE_BAIXO")) {
        pc.vy = +pc.vMax;
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
