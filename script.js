const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = 1920);
const CANVAS_HEIGHT = (canvas.height = 1080);
let gameSpeed = 5;
// let gameFrame = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "/assets/Layers/BG_Decor.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "/assets/Layers/Foreground.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "/assets/Layers/Ground.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "/assets/Layers/Middle_decor.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "/assets/Layers/Sky.png";

window.addEventListener("load", function () {
  const slider = document.getElementById("slider");
  slider.value = gameSpeed;
  const showGameSpeed = document.getElementById("showGameSpeed");
  showGameSpeed.innerHTML = gameSpeed;
  slider.addEventListener("change", function (e) {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
  });

  class Layer {
    constructor(image, speedModifier) {
      this.x = 0;
      this.y = 0;
      this.width = 1920;
      this.height = 1080;

      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * this.speedModifier;
    }
    update() {
      this.speed = gameSpeed * this.speedModifier;
      if (this.x <= -this.width) {
        this.x = 0;
      }

      this.x = Math.floor(this.x - this.speed);
      // this.x = (gameFrame * this.speed) % this.width;
    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }

  const layer5 = new Layer(backgroundLayer5, 0.2);
  const layer1 = new Layer(backgroundLayer1, 0.4);
  const layer4 = new Layer(backgroundLayer4, 0.6);
  const layer2 = new Layer(backgroundLayer2, 0.8);
  const layer3 = new Layer(backgroundLayer3, 1);

  const gameObjects = [layer5, layer1, layer4, layer2, layer3];

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach((object) => {
      object.update();
      object.draw();
    });
    //   gameFrame--;
    requestAnimationFrame(animate);
  }

  animate();
});
