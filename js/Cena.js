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
  desenhar(dt) {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.heigh);
    this.mapa.desenhar(this.ctx);
    for (let s = 0; s < this.sprites.length; s++) {
      let sprt = this.sprites[s];
      sprt.calculaPosicao();
      sprt?.acao(dt);
      sprt.aplicaRestricoes();
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
    this.t0 = this.t0 ?? t;
    this.dt = (t - this.t0) / 1000;
    this.desenhar(this.dt);
    if (this.assets.acabou()) {
      this.passo(this.dt);
      this.contagem += this.dt;
      if (this.contagem >= 5) {
        this.event(this.dt);
        this.contagem = 0;
      }
      this.checarColisao();
      this.removerSprites();
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
          this.quandoColide(sA, sB);
        }
      }
    }
  }
  quandoColide(a, b) {
    if (a.tags.has("pc") && b.tagas.has("enemy")) {
      console.log(a.tags[0], b.tags[0]);
      this.assets.play("hurt");
      this.marcaRemocao(a);
      this.marcaRemocao(b);
    }
  }
  marcaRemocao(sprite) {
    if (!this.aRemover.includes(sprite)){
      this.aRemover.push(sprite);
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
