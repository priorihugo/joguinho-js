export default class Cena {
  ///responsavel por desenhar elementos em tela
  constructor(canvas = null, assets = null, input = null) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext("2d");
    this.assets = assets;
    this.input = input;
    this.game = null;
    this.preparar();
  }
  desenhar() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.heigh);
    this.mapa.desenhar(this.ctx);
    for (let s = 0; s < this.sprites.length; s++) {
      let sprt = this.sprites[s];
      sprt.calculaPosicao();
      sprt.aplicaRestricoes();
      sprt?.acao();
      sprt.desenhar(this.ctx);
    }
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
    this.desenhar();
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;
    if (this.assets.acabou()) {
      this.passo(this.dt);
      this.checarColisao();
      this.removerSprites();
      ///eu vi que existe um metodo que usa um new Date(), mas não sei qual melhor
      this.contagem += this.dt;
      if (this.contagem > 10) {
        this.event();
        this.contagem = 0;
      }
    }
    if (this.rodando) this.iniciar();

    this.aRemover = [];
    this.t0 = t;
  }
  iniciar() {
    this.rodando = true;
    this.idAnim = requestAnimationFrame((t) => {
      this.quadro(t);
    });
  }
  parar() {
    this.rodando = false;
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
  preparar() {
    this.sprites = [];
    this.aRemover = [];
    this.t0 = null;
    this.dt = null;
    this.idAnim = null;
    this.mapa = null;
    this.contagem = 0;
    this.event = () => {};
    this.rodando = true;
  }
}
