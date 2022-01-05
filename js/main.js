import Cena from "./Cena.js" ;


///canvas config
const canvas = document.body.querySelector("canvas");
const ctx = canvas.getContext("2d")

const c1 = new Cena(canvas);

c1.desenhar();