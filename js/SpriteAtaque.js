import Sprite from "./Sprite.js";

export default class SpriteAtaque extends Sprite{
    ///so criei essa classe pra sprites se autodeletarem
    setDuracao(duracao = 2){
        this.duracao = duracao
        this.tempo = 0;
    }
    acao(dt){
        this.tempo+=dt;
        console.log(this.tempo)
        if(this.tempo>this.duracao){
            this.cena.aRemover.push(this);
        }      
    }
}