class Game {
  constructor(level) {
    this.level = level;
    this.meteor = meteor;
    this.collector = collector;
    this.score = 0;
    this.gameload = true;
    this.heart = heart;

    this.meteor.resize(20, 60);
    this.collector.resize(35, 70);
    this.heart.resize(30, 18);

    let speed = this.getSpeedBasedOnLevel();
    this.container = new Jar(10, 350, 25, 70, 5);
    this.fallobj = new FallingObj(5, random(10, 400), 0);
    //change the first value to speed as speed is a different variable.
    //changed this value manually to test out the meteors speed.
  }

  getSpeedBasedOnLevel() {
    if (this.level === "easy") {
      return 2;
    } else if (this.level === "medium") {
      return 5;
    } else if (this.level === "hard") {
      return 8;
    }
  }

  update() {
    if (this.gameload) {
      this.fallobj.update();
      if (this.fallobj.checkCollision(this.container)) {
        this.score++;
        this.fallobj.reset();
        click.play();
      } else if (this.fallobj.posY >= 380) {
        this.gameload = false;

        music.stop();
        over.play();
        // getout.loop();
        // getout.play();
      }
    } else {
      if (keyIsPressed && keyCode === ENTER && game.gameload == false) {
        this.resetGame();
        music.play();
        sigma.stop();
      } else if (mouseIsPressed) {
        this.resetGame();
        music.play();
        
      }
    }
  }
  display() {
    background(220);
    textSize(18);
    bg.resize(400, 410);
    image(bg, 0, 0);

    // Set alignment for score and FPS
    textAlign(LEFT, TOP);
    text("Score: " + this.score, 10, 10);
    let fps = round(frameRate());
    text("FPS: " + fps, 10, 40);

    if (this.gameload) {
      imageMode(CENTER);
      this.fallobj.display();
      imageMode(CORNER);
      this.container.display();
    } else {
      fill(0, 0, 0);
      // Set alignment for Game Over message
      textAlign(CENTER, CENTER);
      text("Game Over", width / 2, height / 2);
      text("Press Enter to Restart.", width / 2, height / 1.7);

      // Reset alignment for future text
      textAlign(LEFT, TOP);
      if (keyCode === 49) {
        sigma.play();
      }
    }
  }

  // image(heart,350,10);
  // image(heart,330,10);
  // image(heart,370,10);
  //need to implemet millis function to keep track of time

  resetGame() {
    this.score = 0;
    this.gameload = true;
    this.fallobj.reset();
  }
}
class FallingObj {
  constructor(speed, posX, posY) {
    this.speed = speed;
    this.posX = posX;
    this.posY = posY;
    this.visible = true;
  }

  update() {
    if (this.visible) {
      if (this.posY < 420) {
        this.posY += this.speed;
      } else {
        this.reset();
      }
    }
  }

  display() {
    if (this.visible) {
      circle(this.posX, this.posY, 10);
      image(meteor, this.posX, this.posY - 17);
    }
  }

  checkCollision(container) {
    return (
      this.posY >= container.rectY &&
      this.posY <= container.rectY + 20 &&
      this.posX >= container.rectX &&
      this.posX <= container.rectX + container.rectW
    );
  }

  reset() {
    this.posY = 0;
    this.posX = random(0, 400);
    this.visible = true;
  }
}

class Jar {
  constructor(rectX, rectY, rectW, rectH, speed) {
    this.rectX = rectX;
    this.rectY = rectY;
    this.rectW = rectW;
    this.rectH = rectH;
    this.speed = speed;
    this.visible = true;
  }

  display() {
    if (this.visible) {
      rect(this.rectX, this.rectY, this.rectW, this.rectH);
      if (keyIsPressed) {
        if (keyCode == RIGHT_ARROW && this.rectX < 380) {
          this.rectX += this.speed;
        } else if (keyCode == LEFT_ARROW && this.rectX > 0) {
          this.rectX -= this.speed;
        }
      }
      image(collector, this.rectX - this.rectW / 4.5, this.rectY);
    }
  }
}
class Heart {
  constructor(heart) {
    this.heart = heart;
  }
}
