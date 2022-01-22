import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js" ;
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import mapa1 from "../maps/mapa1.js";
import mapa2 from "../maps/mapa2.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";

///canvas config
const canvas = document.body.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 28*32;
canvas.height = 20*32;

const mixer = new Mixer();
const input = new InputManager();
const assets = new AssetManager(mixer);
const cenario01 = new Mapa();

assets.carregaAudio("boom" , "assets/sound.wav");
input.configurarTeclado({
   "ArrowLeft" : "MOVE_ESQUERDA",
   "ArrowRight": "MOVE_DIREITA"
})

const c1 = new Cena(canvas , assets);
c1.configuraMapa(cenario01);
cenario01.carregaMapa(mapa2);

const pc = new Sprite({x: 64 , y:64 , vx : 30 , h : 32, w : 32});
const en = new Sprite({x: 26*32 , y:64 , color: "red" , vx: -30 , h: 32 , w : 32})
const en2 = new Sprite({x: 300 , y:50 , color: "orange" ,vy: +50})

c1.adicionar(pc);
c1.adicionar(en);
c1.adicionar(en2);

c1.quadro(0);
if(c1.assets.acabou()){
   c1.iniciar(); 
}

/*document.addEventListener("keydown" , (e)=>{

   console.log(e.key);
   switch(e.key){

      case "q":
        assets.play("boom");
   }
})*/
