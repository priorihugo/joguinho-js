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
   ArrowLeft : "MOVE_ESQUERDA",
   ArrowRight: "MOVE_DIREITA",
   ArrowDown : "MOVE_BAIXO",
   ArrowUp: "MOVE_CIMA"
   
})

const c1 = new Cena(canvas , assets);
c1.configuraMapa(cenario01);
cenario01.carregaMapa(mapa2);

const pc = new Sprite({x: 64 , y:64  , h : 32, w : 32});
const en = new Sprite({x: 26*32 , y:64 , color: "red" , h: 32 , w : 32})
const en2 = new Sprite({x: 300 , y:50 , color: "orange" ,vy: +50})

pc.controlar = function(dt){
   if(input.comandos.get("MOVE_ESQUERDA")){
      pc.vx = - 100;
   }else if(input.comandos.get("MOVE_DIREITA")){
      pc.vx = + 100;
   }else{
      pc.vx = 0;
   }
   if(input.comandos.get("MOVE_CIMA")){
      pc.vy = - 100;
   }else if(input.comandos.get("MOVE_BAIXO")){
      pc.vy = + 100;
   }else{
      pc.vy = 0;
   }
}

en.controlar = persegue;

c1.adicionar(pc);
c1.adicionar(en);
c1.adicionar(en2);

c1.iniciar(); 

/*document.addEventListener("keydown" , (e)=>{

   console.log(e.key);
   switch(e.key){

      case "q":
        assets.play("boom");
   }
})*/
