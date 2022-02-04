import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import CenaJogo from "./CenaJogo.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaFim from "./CenaFim.js";

///canvas config
const canvas = document.body.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 28 * 32;
canvas.height = 20 * 32;

const mixer = new Mixer(10);
const input = new InputManager();
const assets = new AssetManager(mixer);
const c0 = new CenaCarregando();
const c1 = new CenaJogo();
const c2 = new CenaFim();
const game = new Game(canvas, assets, input);

game.adicionarCena("carregando" , c0);
game.adicionarCena("jogo", c1);
game.adicionarCena("fim" , c2);

assets.carregaAudio("boom", "assets/sons/boom.wav");
assets.carregaAudio("hurt", "assets/sons/hurt.wav");

assets.carregaImagem("paredeL1", "assets/terreno/paredeL1.png");
assets.carregaImagem("paredeL2", "assets/terreno/paredeL2.png");
assets.carregaImagem("paredeL3", "assets/terreno/paredeL3.png");
assets.carregaImagem("paredeF1", "assets/terreno/paredeF1.png");
assets.carregaImagem("paredeF2", "assets/terreno/paredeF2.png");
assets.carregaImagem("paredeF3", "assets/terreno/paredeF3.png");
assets.carregaImagem("canto1", "assets/terreno/canto1.png");
assets.carregaImagem("canto2", "assets/terreno/canto2.png");
assets.carregaImagem("canto3", "assets/terreno/canto3.png");
assets.carregaImagem("canto4", "assets/terreno/canto4.png");
assets.carregaImagem("canto5", "assets/terreno/canto5.png");
assets.carregaImagem("canto6", "assets/terreno/canto6.png");
assets.carregaImagem("piso", "assets/terreno/piso.png");
assets.carregaImagem("piso2", "assets/terreno/piso2.png");

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowDown: "MOVE_BAIXO",
  ArrowUp: "MOVE_CIMA",
  " ": "PROXIMA_CENA",
  e: "ATACAR"
});
game.iniciar();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "s":
      game.iniciar();
      break;
    case "S":
      game.parar();
      break;
  }
});
