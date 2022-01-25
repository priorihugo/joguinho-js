import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js" ;
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import mapa1 from "../maps/mapa1.js";
import mapa2 from "../maps/mapa2.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";

///canvas config
const canvas = document.body.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 28*32;
canvas.height = 20*32;

const mixer = new Mixer(10);
const input = new InputManager();
const assets = new AssetManager(mixer);
const c1 = new Cena(canvas , assets);
const cenario01 = new Mapa();
const game = new Game(canvas, assets, input);

game.adicionarCena("jogo" , c1);
c1.configuraMapa(cenario01);
cenario01.carregaMapa(mapa2);
assets.carregaAudio("boom" , "assets/sons/boom.wav");
assets.carregaAudio("hurt" , "assets/sons/hurt.wav");

assets.carregaImagem("paredeL1" , "assets/terreno/paredeL1.png");
assets.carregaImagem("paredeL2" , "assets/terreno/paredeL2.png");
assets.carregaImagem("paredeL3" , "assets/terreno/paredeL3.png");
assets.carregaImagem("paredeF1" , "assets/terreno/paredeF1.png");
assets.carregaImagem("paredeF2" , "assets/terreno/paredeF2.png");
assets.carregaImagem("paredeF3" , "assets/terreno/paredeF3.png");
assets.carregaImagem("canto1" , "assets/terreno/canto1.png");
assets.carregaImagem("canto2" , "assets/terreno/canto2.png");
assets.carregaImagem("canto3" , "assets/terreno/canto3.png");
assets.carregaImagem("canto4" , "assets/terreno/canto4.png");
assets.carregaImagem("canto5" , "assets/terreno/canto5.png");
assets.carregaImagem("canto6" , "assets/terreno/canto6.png");
assets.carregaImagem("piso" , "assets/terreno/piso.png");
assets.carregaImagem("piso2" , "assets/terreno/piso2.png");

input.configurarTeclado({
   ArrowLeft : "MOVE_ESQUERDA",
   ArrowRight: "MOVE_DIREITA",
   ArrowDown : "MOVE_BAIXO",
   ArrowUp: "MOVE_CIMA"
   
});


const pc = new Sprite({x: 64 , y:64  , h : 32, w : 32});
const en = new Sprite({x: 26*32 , y:64 , color: "red" , h: 32 , w : 32});
const en2 = new Sprite({x: 300 , y:50 , color: "orange"});

en.controlar = persegue;
en2.controlar = persegue;

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
};

c1.adicionar(pc);
c1.event = novoInimigoAleatorio;
//c1.adicionar(en);
//c1.adicionar(en2);

///adicionando 3 inimigos aleatorios
for(let i = 0 ; i < 3 ; i++){
   novoInimigoAleatorio();
}
c1.iniciar(); 

function persegue(dt){
   this.vx = 50*Math.sign(pc.x - this.x);
   this.vy = 50*Math.sign(pc.y - this.y);
}

function novoInimigoAleatorio(){
   let nX;
   let nY;

   let ncor = Math.round(Math.random()*4);
   let cor;

   switch(ncor){
      case 0:
         cor = "yellow"
         break;
      case 1: 
         cor = "red"
         break;
      case 2:
         cor = "blue"
         break;
      case 3:
         cor = "green"
         break;
      case 4:
         cor = "orange"
         break;
   }
   do{
      nX = Math.floor(Math.random() * cenario01.COLUNAS)
      nY = Math.floor(Math.random() * cenario01.LINHAS)
      //console.log(nY , nX);
      //console.log(mapa2[nY][nX]);
   }while(mapa2[nY][nX] !== 0);

   nY = nY*32 + 32/2;
   nX = nX*32 + 32/2;

   const novoSprite = new Sprite({
      x: nX,
      y: nY,
      color: cor,
   });
   novoSprite.controlar = persegue;

   c1.adicionar(novoSprite);

}
/*
document.addEventListener("keydown" , (e)=>{

   console.log(e.key);
   switch(e.key){

      case "q":
        novoInimigoAleatorio();
   }
})*/
