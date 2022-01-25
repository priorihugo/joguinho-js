export default class Cena {
  ///responsavel por desenhar elementos em tela
  constructor(canvas, assets = null) {
    this.canvas = canvas;
    this.cw = canvas.width;
    this.ch = canvas.heigh;
    this.ctx = canvas.getContext("2d");
    this.sprites = [];
    this.aRemover = [];
    this.t0 = null;
    this.dt = null;
    this.idAnim = null;
    this.assets = assets;
    this.mapa = null;
    this.contagem = 0;
    this.game = null;
    this.event = () => {};
  }
  desenhar() {
    //console.log("Desenhando cena...")
    //console.log(this.canvas)
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.cw, this.cw);
    this.mapa.desenhar(this.ctx);
    for (let s = 0; s < this.sprites.length; s++) {
      let sprt = this.sprites[s];
      sprt.aplicaRestricoes();
      sprt.desenhar(this.ctx);
    }
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(this.assets.progresso(), 10, 20);
  }
  adicionar(sprite) {
    sprite.cena = this;
    this.sprites.push(sprite);
  }
  passo(dt) {
    for (const sprite of this.sprites) {
      sprite.passo(dt);
    }
  }
  quadro(t) {
    if (this.assets.acabou()) {
      this.t0 = this.t0 ?? t;
      this.dt = (t - this.t0) / 1000;

      this.passo(this.dt);
      this.desenhar();
      this.checarColisao();
      this.removerSprites();

      ///eu vi que existe um metodo que usa um new Date(), mas não sei qual melhor
      this.contagem += this.dt;
      //console.log(this.contagem)

      if(this.contagem > 10){
        this.event();
        this.contagem = 0;

      }
    }
    


    this.iniciar();
    this.aRemover = [];
    this.t0 = t;
  }
  iniciar() {
    this.idAnim = requestAnimationFrame((t) => {
      this.quadro(t);
    });
  }
  parar() {
    cancelAnimationFrame(this.idAnim);
    this.t0 = null;
    this.dt = null;
  }
  checarColisao() {
    for (let a = 0; a < this.sprites.length - 1; a++) {
      const sA = this.sprites[a];
      for (let b = a + 1; b < this.sprites.length; b++) {
        const sB = this.sprites[b];
        if (sA.colisaoCom(sB)) {
          //console.log("colisão");
          this.quandoColide(sA, sB);
        }
      }
    }
  }
  quandoColide(a, b) {
    this.assets.play("hurt");
    if (!this.aRemover.includes(a)) {
      this.aRemover.push(a);
    }
    if (!this.aRemover.includes(b)) {
      this.aRemover.push(b);
    }
  }
  removerSprites() {
    for (const alvo of this.aRemover) {
      const idx = this.sprites.indexOf(alvo);
      if (idx >= 0) {
        this.sprites.splice(idx, 1);
      }
    }
  }

  configuraMapa(mapa) {
    this.mapa = mapa;
    this.mapa.cena = this;
  }
}
