export default class Mixer{

    constructor(num_canais){
        this.canais = [];
        this.n_canais = 0;
        this.configuraCanais(num_canais);

    }
    configuraCanais(nCanais = 10){
        this.canais = [];
        this.n_canais = nCanais;
        for(let c = 0 ; c < this.n_canais ; c++){
            const canal = {
                audio: new Audio(),
                fim: new Date(),
            }
            this.canais[c] = canal;
        }
    }

    playMixer(audio){
        const agora = new Date().getTime()
        for(let c = 0 ; c < this.n_canais ; c++){
            const canal = this.canais[c];
            if(canal.fim < agora){
                canal.audio.src = audio.src;
                canal.audio.play();
                canal.fim = agora + audio.duration * 1000;
                break;
            }       
        }
    }
}