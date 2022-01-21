export default class Mapa{
    constructor( linhas = 10 , colunas = 14, tamanho = 32){
        this.LINHAS = linhas;
        this.COLUNAS = colunas;
        this.TAMANHO = tamanho;
        this.quadrados = [];
        this.cena = null;

        for(let i = 0 ; i < this.LINHAS ; i++){
            this.quadrados[i] = [];
            for(let j = 0 ; j < this.COLUNAS ; j++){
                this.quadrados[i][j] = 0;
            }
        }
    }
    carregaMapa(modelo){

        this.LINHAS = modelo.length;
        this.COLUNAS = modelo[0]?.length ?? 0;
        this.quadrados = [];
        for(let l = 0 ; l < this.LINHAS ; l++){
            this.quadrados[l] = [];
            for(let c = 0 ; c < this.COLUNAS ; c++){
                this.quadrados[l][c] = modelo[l][c];
            }
        }

    }
    desenhar(ctx){
        for(let l = 0 ; l < this.LINHAS ; l++){
            for(let c = 0 ; c < this.COLUNAS ; c++){
                switch (this.quadrados[l][c]){

                    case 1:
                        ctx.fillStyle = "grey";
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "black";
                        break;

                    default:
                        ctx.fillStyle = "black";
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "grey";
                        break;
                }

                ctx.fillRect(c*this.TAMANHO , l* this.TAMANHO , this.TAMANHO , this.TAMANHO);
                ctx.strokeRect(c*this.TAMANHO , l* this.TAMANHO , this.TAMANHO , this.TAMANHO);
            }
        }
    }
}