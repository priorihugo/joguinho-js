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
    desenhar(ctx){
        for(let l = 0 ; l < this.LINHAS ; l++){
            for(let c = 0 ; c < this.COLUNAS ; c++){
                switch (this.quadrados[l][c]){

                    case 1:
                        ctx.fillStyle = "grey";
                        ctx.fillRect(c*this.TAMANHO , l* this.TAMANHO , this.TAMANHO , this.TAMANHO);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = 'black';
                        ctx.strokeRect(c*this.TAMANHO , l* this.TAMANHO , this.TAMANHO , this.TAMANHO);
                        break;

                    default:
                        ctx.fillStyle = "black";
                        ctx.fillRect(c*this.TAMANHO , l* this.TAMANHO , this.TAMANHO , this.TAMANHO);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = 'red';
                        ctx.strokeRect(c*this.TAMANHO , l* this.TAMANHO , this.TAMANHO , this.TAMANHO);
                        break;
                }
            }
        }
    }
}