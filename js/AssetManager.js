export default class AssetManager{

    constructor(){
        this.carregadas = 0;
        this.aCarregar = 0;
        this.imagens = new Map();
    }
    progresso(){
        if(this.aCarregar>0){
            return `${((this.carregadas/this.aCarregar)*100).toFixed(2)}`;
        }else{
            return "nada a carregar";
        }
    }
    carregaImagem(chave , src){

        const img = new Image();
        img.src = src;
        this.imagens.set(chave, img);
        this.aCarregar++;
    }
    getImg(chave){
        return this.imagens.get(chave);
    }

}