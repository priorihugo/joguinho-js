export default class Mapa{
    constructor( linhas = 8 , colunas = 12 , tamanho = 32){
        this.LINHAS = linhas;
        this.COLUNAS = colunas;
        this.TAMANHO = tamanho;
        this.quadrados = [];

        for(let i = 0 ; i < this.LINHAS ; i++){
            this.quadrados[i] = [];
            for(let j = 0 ; j < this.COLUNAS ; j++){
                this.quadrados[i][j] = 0;
            }
        }
    }
}