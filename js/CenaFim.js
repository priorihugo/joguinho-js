import Cena from "./Cena.js";

export default class CenaFim extends Cena {
  desenhar() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.font = "20px Impact";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText(
      "GAME OVER",
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    this.ctx.fillStyle = "yellow";
    this.ctx.fillText(
      "Aperte espaço pra continuar",
      this.canvas.width / 2,
      this.canvas.height / 2 + 40
    );
  }
  quadro(t) {
    this.desenhar();
    if (this.assets.acabou() && this.input.comandos.get("PROXIMA_CENA")) {
      this.game.selecionaCena("jogo");
      return;
    }
    this.iniciar();
    this.t0 = t;
  }
}
