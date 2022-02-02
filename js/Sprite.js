export default class Sprite {
  constructor({
    x = 0,
    y = 0,
    h = 30,
    w = 30,
    color = "white",
    vx = 0,
    vy = 0,
    img = null,
    tags = []
  } = {}) 
  
  {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.cena = null;
    this.mx = 0;
    this.my = 0;
    this.img = img
    this.tags = new Set();
    tags.forEach((tag)=>{
      this.tags.add(tag);
    });
  }
  desenhar(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
    ctx.strokeStyle = "blue";
    ctx.strokeRect(
      this.mx * this.cena.mapa.TAMANHO,
      this.my * this.cena.mapa.TAMANHO,
      this.cena.mapa.TAMANHO,
      this.cena.mapa.TAMANHO
    );
  }
  aplicaRestricoes(dt) {
    const t = this.cena.mapa.TAMANHO;

    this.restricoesDireita(t, this.mx + 1, this.my - 1);
    this.restricoesDireita(t, this.mx + 1, this.my);
    this.restricoesDireita(t, this.mx + 1, this.my + 1);

    this.restricoesEsquerda(t, this.mx - 1, this.my - 1);
    this.restricoesEsquerda(t, this.mx - 1, this.my);
    this.restricoesEsquerda(t, this.mx - 1, this.my + 1);

    this.restricoesBaixo(t, this.mx - 1, this.my + 1);
    this.restricoesBaixo(t, this.mx, this.my + 1);
    this.restricoesBaixo(t, this.mx + 1, this.my + 1);

    this.restricoesCima(t, this.mx - 1, this.my - 1);
    this.restricoesCima(t, this.mx, this.my - 1);
    this.restricoesCima(t, this.mx + 1, this.my - 1);
  }
  restricoesDireita(t, pmx, pmy) {
    //console.log("[pmx]" + pmx + "[pmy]" + pmy)
    if (this.vx > 0) {
      if (this.cena.mapa.quadrados[pmy][pmx] != 0) {
        const fantasma = { x: pmx * t + t / 2, y: pmy * t + t / 2, w: t, h: t };
        if (this.colisaoCom(fantasma)) {
          this.vx *= -1;
          this.x = fantasma.x - fantasma.w/2 - this.w/2 - 1;
        }
        this.cena.ctx.strokeStyle = "red";
        this.cena.ctx.strokeRect(fantasma.x - t/2, fantasma.y - t/2, t, t);
      }
    }
  }
  restricoesEsquerda(t, pmx, pmy) {
    //console.log("[pmx]" + pmx + "[pmy]" + pmy)
    if (this.vx < 0) {
      if (this.cena.mapa.quadrados[pmy][pmx] != 0) {
        const fantasma = { x: pmx * t + t / 2, y: pmy * t + t / 2, w: t, h: t };
        if (this.colisaoCom(fantasma)) {
          this.vx *= -1;
          this.x = fantasma.x + fantasma.w/2 + this.w/2 + 1;
        }
        this.cena.ctx.strokeStyle = "red";
        this.cena.ctx.strokeRect(fantasma.x - t / 2, fantasma.y - t / 2, t, t);
      }
    }
  }
  restricoesCima(t, pmx, pmy) {
    //console.log("[pmx]" + pmx + "[pmy]" + pmy)
    if (this.vy < 0) {
      if (this.cena.mapa.quadrados[pmy][pmx] != 0) {
        const fantasma = { x: pmx * t + t / 2, y: pmy * t + t / 2, w: t, h: t };
        if (this.colisaoCom(fantasma)) {
          this.vy *= -1;
          this.y = fantasma.y + fantasma.h/2 + this.h/2 + 1;
        }
        this.cena.ctx.strokeStyle = "red";
        this.cena.ctx.strokeRect(fantasma.x - t/2, fantasma.y - t / 2, t, t);
      }
    }
  }
  restricoesBaixo(t, pmx, pmy) {
    //console.log("[pmx]" + pmx + "[pmy]" + pmy)
    if (this.vy > 0) {
      if (this.cena.mapa.quadrados[pmy][pmx] != 0) {
        const fantasma = { x: pmx * t + t / 2, y: pmy * t + t / 2, w: t, h: t };
        if (this.colisaoCom(fantasma)) {
          this.vy *= -1;
          this.y = fantasma.y - fantasma.h/2 - this.h/2 - 1;
        }
        this.cena.ctx.strokeStyle = "red";
        this.cena.ctx.strokeRect(fantasma.x - t/2, fantasma.y - t/2, t, t);
      }
    }
  }
  controlar(dt){

  }
  mover(dt){
    this.x = this.x + this.vx * dt;
    this.y = this.y + this.vy * dt;
    this.mx = Math.floor(this.x/this.cena.mapa.TAMANHO);
    this.my = Math.floor(this.y/this.cena.mapa.TAMANHO);
  }

  passo(dt) {
    this.controlar(dt);
    this.mover(dt);
  }
  colisaoCom(outro) {
    return !(
      this.x - this.w / 2 > outro.x + outro.w / 2 ||
      this.x + this.w / 2 < outro.x - outro.w / 2 ||
      this.y - this.h / 2 > outro.y + outro.h / 2 ||
      this.y + this.h / 2 < outro.y - outro.h / 2
    );
  }
}
