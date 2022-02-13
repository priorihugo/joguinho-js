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
    for (let l = 0; l < this.LINHAS; l++) {
      for (let c = 0; c < this.COLUNAS; c++) {
        let asx = 0,
          asy = 0,
          bsx = 0,
          bsy = 0,
          sh = 16,
          sw = 16;
        let img = this.cena.assets.getImg("floresta");
        let img2 = this.cena.assets.getImg("florestaDecoracao");
        ctx.fillStyle = "grey";
        ctx.drawImage(
          img,
          //
          2 * sw,
          30 * sh,
          sw,
          sh,
          c * this.TAMANHO,
          l * this.TAMANHO,
          this.TAMANHO,
          this.TAMANHO
        );

        switch (this.quadrados[l][c]) {
          case 1:
            img = this.cena.assets.getImg("paredeL1");
            break;
          case 2:
            img = this.cena.assets.getImg("paredeL2");
            break;
          case 3:
            img = this.cena.assets.getImg("paredeL3");
            break;
          case 4:
            img = this.cena.assets.getImg("paredeF1");
            break;
          case 5:
            img = this.cena.assets.getImg("paredeF2");
            break;
          case 6:
            img = this.cena.assets.getImg("paredeF3");
            break;
          case 7:
            img = this.cena.assets.getImg("canto1");
            break;
          case 8:
            img = this.cena.assets.getImg("canto2");
            break;
          case 9:
            img = this.cena.assets.getImg("canto3");
            break;
          case 10:
            img = this.cena.assets.getImg("canto4");
            break;
          case 11:
            img = this.cena.assets.getImg("canto5");
            break;
          case 12:
            img = this.cena.assets.getImg("canto6");
            break;
          case 14:
            img = this.cena.assets.getImg("floresta");
            asx = 2;
            asy = 2;
            break;
          case 15:
            img = this.cena.assets.getImg("floresta");
            asx = 3;
            asy = 1;
            break;
          case 16:
            img = this.cena.assets.getImg("floresta");
            asx = 2;
            asy = 1;
            break;
          case 17:
            img = this.cena.assets.getImg("floresta");
            asx = 5;
            asy = 2;
            break;
          case 18:
            img = this.cena.assets.getImg("floresta");
            asx = 3;
            asy = 2;
            break;
          case 19:
            img = this.cena.assets.getImg("floresta");
            asx = 1;
            asy = 1;
            break;

          case 20:
            img = this.cena.assets.getImg("floresta");
            asx = 1;
            asy = 2;
            break;
          case 21:
            img = this.cena.assets.getImg("floresta");
            asx = 6;
            asy = 2;
            break;
          case 22:
            //arvore 1 baixo
            img = this.cena.assets.getImg("florestaDecoracao");
            asx = 2;
            asy = 4;
            break;
          case 23:
            //arvore 1 cima
            img = this.cena.assets.getImg("florestaDecoracao");
            asx = 2;
            asy = 3;
            break;
          case 24:
            //pedra 1
            img = this.cena.assets.getImg("florestaDecoracao");
            asx = 4;
            asy = 5;
            break;
          case 25:
            //pedra 1
            img = this.cena.assets.getImg("florestaDecoracao");
            asx = 5;
            asy = 5;
            break;
          case 26:
            //pedra 1
            img = this.cena.assets.getImg("florestaDecoracao");
            asx = 4;
            asy = 6;
            break;

          case 27:
            //pedra 1
            img = this.cena.assets.getImg("florestaDecoracao");
            asx = 5;
            asy = 6;
            break;
        }
        ctx.drawImage(
          img,
          //
          asx * sw,
          asy * sh,
          sw,
          sh,
          //
          c * this.TAMANHO,
          l * this.TAMANHO,
          this.TAMANHO,
          this.TAMANHO
        );
      }
    }
  }
}
