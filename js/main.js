import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js" ;
import Mapa from "./Mapa.js";
import Sprite from "./Sprite.js";
import mapa1 from "../maps/mapa1.js";


///canvas config
const canvas = document.body.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 14*32;
canvas.height = 10*32;

const assets = new AssetManager();
const cenario01 = new Mapa();

const c1 = new Cena(canvas , assets);
c1.configuraMapa(cenario01);
cenario01.carregaMapa(mapa1);

const pc = new Sprite({x: 40 , y:50 , vx : 30 , h : 32, w : 32});
const en = new Sprite({x: 400 , y:50 , color: "red" , vx: -30 , h: 32 , w : 32})
const en2 = new Sprite({x: 300 , y:50 , color: "orange" ,vy: +50})

c1.adicionar(pc);
c1.adicionar(en);
c1.adicionar(en2);

c1.quadro(0);
c1.iniciar();
