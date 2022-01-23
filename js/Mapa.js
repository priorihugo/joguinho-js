export default class Mapa {
  constructor(linhas = 10, colunas = 14, tamanho = 32) {
    this.LINHAS = linhas;
    this.COLUNAS = colunas;
    this.TAMANHO = tamanho;
    this.quadrados = [];
    this.cena = null;

    for (let i = 0; i < this.LINHAS; i++) {
      this.quadrados[i] = [];
      for (let j = 0; j < this.COLUNAS; j++) {
        this.quadrados[i][j] = 0;
      }
    }
  }
  carregaMapa(modelo) {
    this.LINHAS = modelo.length;
    this.COLUNAS = modelo[0]?.length ?? 0;
    this.quadrados = [];
    for (let l = 0; l < this.LINHAS; l++) {
      this.quadrados[l] = [];
      for (let c = 0; c < this.COLUNAS; c++) {
        this.quadrados[l][c] = modelo[l][c];
      }
    }
  }
  desenhar(ctx) {
    let img = this.cena.assets.getImg("piso");
    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        switch (this.quadrados[l][c]) {
          case 1:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            img = this.cena.assets.getImg("paredeL1");
            break;

          case 2:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            img = this.cena.assets.getImg("paredeL2");
            break;

          case 3:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            img = this.cena.assets.getImg("paredeL3");
            break;

          case 4:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            img = this.cena.assets.getImg("paredeF1");
            break;

          case 5:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            img = this.cena.assets.getImg("paredeF2");
            break;

          case 6:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            img = this.cena.assets.getImg("paredeF3");
            break;

          case 7:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            img = this.cena.assets.getImg("canto1");
            break;
          case 8:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            img = this.cena.assets.getImg("canto2");
            break;
          case 9:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            img = this.cena.assets.getImg("canto3");
            break;
          case 10:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            img = this.cena.assets.getImg("canto4");
            break;
          case 11:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            img = this.cena.assets.getImg("canto5");
            break;
          case 12:
            ctx.fillStyle = "grey";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            img = this.cena.assets.getImg("canto6");
            break;

          default:
            ctx.fillStyle = "black";
            ctx.lineWidth = 1;
            ctx.strokeStyle = "grey";
            img = this.cena.assets.getImg("piso");
            break;
        }

        ctx.fillRect(
          c * this.TAMANHO,
          l * this.TAMANHO,
          this.TAMANHO,
          this.TAMANHO
        );
        /*ctx.strokeRect(
          c * this.TAMANHO,
          l * this.TAMANHO,
          this.TAMANHO,
          this.TAMANHO
        );*/
        ctx.drawImage(
          img,
          c * this.TAMANHO,
          l * this.TAMANHO,
          this.TAMANHO,
          this.TAMANHO
        );
      }
    }
  }
}
