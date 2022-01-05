import Cena from "./Cena.js" ;
import Sprite from "./Sprite.js";


///canvas config
const canvas = document.body.querySelector("canvas");
const ctx = canvas.getContext("2d")

const c1 = new Cena(canvas);
const pc = new Sprite();

c1.desenhar();