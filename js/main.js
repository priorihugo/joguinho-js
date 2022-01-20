import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js" ;
import Sprite from "./Sprite.js";


///canvas config
const canvas = document.body.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.height = 300;
canvas.width = 500;

const assets = new AssetManager();

const c1 = new Cena(canvas , assets);
const pc = new Sprite({x: 20 , y:10 , vx : 300});
const en = new Sprite({x: 20 , y:80 , color: "red" , vx: 300})

c1.adicionar(pc);
c1.adicionar(en);

c1.quadro(0);
c1.iniciar();
