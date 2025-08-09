import React, { useRef, useEffect } from "react";

import bgbg from "/background.png";
import bar from "/Game Asset/lifebar full.png";
import drawimg from "/Game Asset/draw.png";
import winimg from "/Game Asset/win.png";
const fps = 60;
import loseimg from "/Game Asset/lose.png";
import {
  DrawImage,
  EnemyHp,
  HealthBar,
  HpBarContainer,
  MainHpContainer,
  PlayerHp,
  Timer,
} from "./GameComponent";
import idle1 from "/Game Asset/blast impulse/idle mirrored/idle 1.png";
import idle2 from "/Game Asset/blast impulse/idle mirrored/idle 2.png";
import idle3 from "/Game Asset/blast impulse/idle mirrored/idle 3.png";
import idle4 from "/Game Asset/blast impulse/idle mirrored/idle 4.png";
import idle5 from "/Game Asset/blast impulse/idle mirrored/idle 5.png";
import idle6 from "/Game Asset/blast impulse/idle mirrored/idle 6.png";

import idle1m from "/Game Asset/blast impulse/idle/idle 1.png";
import idle2m from "/Game Asset/blast impulse/idle/idle 2.png";
import idle3m from "/Game Asset/blast impulse/idle/idle 3.png";
import idle4m from "/Game Asset/blast impulse/idle/idle 4.png";
import idle5m from "/Game Asset/blast impulse/idle/idle 5.png";
import idle6m from "/Game Asset/blast impulse/idle/idle 6.png";

import walk1 from "/Game Asset/blast impulse/walking/1.png";
import walk2 from "/Game Asset/blast impulse/walking/2.png";
import walk3 from "/Game Asset/blast impulse/walking/3.png";

import backward1 from "/Game Asset/blast impulse/backward/1.png";
import backward2 from "/Game Asset/blast impulse/backward/2.png";
import backward3 from "/Game Asset/blast impulse/backward/3.png";

import jump from "/Game Asset/blast impulse/jump/1.png";

import frontkick1 from "/Game Asset/blast impulse/front kick/1.png";
import frontkick2 from "/Game Asset/blast impulse/front kick/2.png";
import frontkick3 from "/Game Asset/blast impulse/front kick/3.png";

import lowkick1 from "/Game Asset/blast impulse/low kick/1.png";
import lowkick2 from "/Game Asset/blast impulse/low kick/2.png";
import lowkick3 from "/Game Asset/blast impulse/low kick/3.png";

// Enemy
import e_idle1 from "/Game Asset/sword impulse/idle mirrored/sword-impulse_01.png";
import e_idle2 from "/Game Asset/sword impulse/idle mirrored/sword-impulse_02.png";
import e_idle3 from "/Game Asset/sword impulse/idle mirrored/sword-impulse_03.png";
import e_idle4 from "/Game Asset/sword impulse/idle mirrored/sword-impulse_04.png";
import e_idle5 from "/Game Asset/sword impulse/idle mirrored/sword-impulse_05.png";
import e_idle6 from "/Game Asset/sword impulse/idle mirrored/sword-impulse_06.png";

// Enemy
import e_idle1m from "/Game Asset/sword impulse/idle/sword-impulse_01.png";
import e_idle2m from "/Game Asset/sword impulse/idle/sword-impulse_02.png";
import e_idle3m from "/Game Asset/sword impulse/idle/sword-impulse_03.png";
import e_idle4m from "/Game Asset/sword impulse/idle/sword-impulse_04.png";
import e_idle5m from "/Game Asset/sword impulse/idle/sword-impulse_05.png";
import e_idle6m from "/Game Asset/sword impulse/idle/sword-impulse_06.png";

// import e_walk1 from "/Game Asset/sword impulse/backward/sword-impulse_1.png";
// import e_walk2 from "/Game Asset/sword impulse/backward/sword-impulse_2.png";
// import e_walk3 from "/Game Asset/sword impulse/backward/sword-impulse_3.png";
// import e_walk4 from "/Game Asset/sword impulse/backward/sword-impulse_4.png";
// import e_walk5 from "/Game Asset/sword impulse/backward/sword-impulse_5.png";
// import e_walk6 from "/Game Asset/sword impulse/backward/sword-impulse_6.png";
// import e_walk7 from "/Game Asset/sword impulse/backward/sword-impulse_7.png";
// import e_walk8 from "/Game Asset/sword impulse/backward/sword-impulse_8.png";
// import e_walk9 from "/Game Asset/sword impulse/backward/sword-impulse_9.png";
// import e_walk10 from "/Game Asset/sword impulse/backward/sword-impulse_10.png";

import e_backward1 from "/Game Asset/sword impulse/walking/sword-impulse_1.png";
import e_backward2 from "/Game Asset/sword impulse/walking/sword-impulse_2.png";
import e_backward3 from "/Game Asset/sword impulse/walking/sword-impulse_3.png";
import e_backward4 from "/Game Asset/sword impulse/walking/sword-impulse_4.png";
import e_backward5 from "/Game Asset/sword impulse/walking/sword-impulse_5.png";
import e_backward6 from "/Game Asset/sword impulse/walking/sword-impulse_6.png";
import e_backward7 from "/Game Asset/sword impulse/walking/sword-impulse_7.png";
import e_backward8 from "/Game Asset/sword impulse/walking/sword-impulse_8.png";
import e_backward9 from "/Game Asset/sword impulse/walking/sword-impulse_9.png";
import e_backward10 from "/Game Asset/sword impulse/walking/sword-impulse_10.png";

import e_jump1 from "/Game Asset/sword impulse/jumping/sword-impulse_jump_01.png";
import e_jump2 from "/Game Asset/sword impulse/jumping/sword-impulse_jump_02.png";
import e_jump3 from "/Game Asset/sword impulse/jumping/sword-impulse_jump_03.png";
import e_jump4 from "/Game Asset/sword impulse/jumping/sword-impulse_jump_04.png";
import e_jump5 from "/Game Asset/sword impulse/jumping/sword-impulse_jump_05.png";
import e_jump6 from "/Game Asset/sword impulse/jumping/sword-impulse_jump_06.png";

import e_frontkick1 from "/Game Asset/sword impulse/front kick mirrored/sword-impulse_01.png";
import e_frontkick2 from "/Game Asset/sword impulse/front kick mirrored/sword-impulse_02.png";
import e_frontkick3 from "/Game Asset/sword impulse/front kick mirrored/sword-impulse_03.png";
import e_frontkick4 from "/Game Asset/sword impulse/front kick mirrored/sword-impulse_04.png";

import e_lowkick1 from "/Game Asset/sword impulse/low kick mirrored/sword-impulse_01.png";
import e_lowkick2 from "/Game Asset/sword impulse/low kick mirrored/sword-impulse_02.png";
import e_lowkick3 from "/Game Asset/sword impulse/low kick mirrored/sword-impulse_03.png";
import { useNavigate } from "react-router-dom";

const gravity = 0.5;

const bgImage = new Image();
bgImage.src = bgbg;
const barImage = new Image();
barImage.src = bar;

let gameOver = false;
let player1Win = false;

let mirrored = true;

class Sprite {
  canvas: HTMLCanvasElement;
  c: CanvasRenderingContext2D;
  position: { x: number; y: number };
  height: number;
  width: number;
  velocity: { x: number; y: number };
  frontKick: boolean;
  lowKick: boolean;
  fkDamage: number;
  lkDamage: number;
  image: HTMLImageElement;
  animation: {
    idleAnim: string[];
    idleAnimMirrored: string[];
    walkAnim: string[];
    backwardAnim: string[];
    jumpAnim: string[];
    frontKickAnim: string[];
    lowKickAnim: string[];
  };
  maxFrame: {
    idleMaxFrame: number;
    walkMaxFrame: number;
    backwardMaxFrame: number;
    jumpMaxFrame: number;
    frontKickMaxFrame: number;
    lowKickMaxFrame: number;
  };

  now: number = 0;
  then: number = 0;
  elapsed: number = 0;
  fps: number = 0;
  startTime: number = 0;
  fpsInterval: number = 0;

  isWalking: boolean;
  isBackward: boolean;
  isJumping: boolean;
  isFrontKick: boolean;
  isLowKick: boolean;
  isOnGround: boolean;

  currentAnim: string[];
  currentMaxFrame: number;
  currentFrame: number;

  health: number;

  frameEllapsed: number;
  frameHold: number;

  lastUpdateTime: number;

  animationDuration: {
    frontKick: number;
    lowKick: number;
  };

  constructor(
    canvas: HTMLCanvasElement,
    c: CanvasRenderingContext2D,
    position: { x: number; y: number },
    velocity: { x: number; y: number },
    animation: {
      idleAnim: string[];
      idleAnimMirrored: string[];
      walkAnim: string[];
      backwardAnim: string[];
      jumpAnim: string[];
      frontKickAnim: string[];
      lowKickAnim: string[];
    },
    maxFrame: {
      idleMaxFrame: number;
      walkMaxFrame: number;
      backwardMaxFrame: number;
      jumpMaxFrame: number;
      frontKickMaxFrame: number;
      lowKickMaxFrame: number;
    }
  ) {
    this.fps = 30;
    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();
    this.startTime = this.then;
    this.canvas = canvas;
    this.c = c;
    this.position = position;
    this.height = 240;
    this.width = 160;
    this.velocity = velocity;
    this.frontKick = false;
    this.lowKick = false;
    this.health = 100;
    this.fkDamage = 10;
    this.lkDamage = 15;
    this.image = new Image();
    this.animation = animation;
    this.maxFrame = maxFrame;
    this.currentFrame = 0;

    this.frameEllapsed = 0;
    this.frameHold = 15;

    this.isWalking = false;
    this.isBackward = false;
    this.isJumping = false;
    this.isFrontKick = false;
    this.isLowKick = false;
    this.currentAnim = this.animation.idleAnim;
    this.currentMaxFrame = this.maxFrame.idleMaxFrame;
    this.isOnGround = false;

    this.lastUpdateTime = performance.now();

    this.animationDuration = { frontKick: 1000, lowKick: 1000 };
  }

  draw() {
    this.image.src = this.currentAnim[this.currentFrame];
    this.c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.frameEllapsed++;

    if (this.frameEllapsed % this.frameHold === 0) {
      this.currentFrame++;

      if (this.currentFrame >= this.currentMaxFrame) this.currentFrame = 0;
    }

    const currentTime = performance.now();
    this.lastUpdateTime = currentTime;

    if (
      this.position.y + this.height + this.velocity.y >=
      this.canvas.height - 120
    ) {
      this.isOnGround = true;
      this.velocity.y = 0;
    } else {
      this.isOnGround = false;
      this.velocity.y += gravity;
    }
  }

  frontKickAttack() {
    this.frontKick = true;
    this.isFrontKick = true;
    setTimeout(() => {
      this.frontKick = false;
      this.isFrontKick = false;
      setTimeout(() => {
        this.switchAnimation("idle");
      }, 1000);
    }, this.animationDuration.frontKick);
  }

  lowKickAttack() {
    this.lowKick = true;
    this.isLowKick = true;
    setTimeout(() => {
      this.lowKick = false;
      this.isLowKick = false;
      setTimeout(() => {
        this.switchAnimation("idle");
      }, 1000);
    }, this.animationDuration.lowKick);
  }

  switchAnimation(animationName: string) {
    if (!this.isOnGround) {
      this.currentAnim = this.animation.jumpAnim;
      this.currentMaxFrame = this.maxFrame.jumpMaxFrame - 1;
    } else {
      if (this.isFrontKick) {
        this.currentAnim = this.animation.frontKickAnim;
        this.currentMaxFrame = this.maxFrame.frontKickMaxFrame - 1;
      } else if (this.isLowKick) {
        this.currentAnim = this.animation.lowKickAnim;
        this.currentMaxFrame = this.maxFrame.lowKickMaxFrame - 1;
      } else {
        switch (animationName) {
          case "idle":
            if (mirrored) {
              this.currentAnim = this.animation.idleAnimMirrored;
              this.currentMaxFrame = this.maxFrame.idleMaxFrame - 1;
            } else {
              this.currentAnim = this.animation.idleAnim;
              this.currentMaxFrame = this.maxFrame.idleMaxFrame - 1;
            }
            break;
          case "backward":
            this.currentAnim = this.animation.walkAnim;
            this.currentMaxFrame = this.maxFrame.walkMaxFrame - 1;
            break;
          case "walk":
            this.currentAnim = this.animation.backwardAnim;
            this.currentMaxFrame = this.maxFrame.backwardMaxFrame - 1;
            break;
        }
      }
    }
  }
}
const GameFinal: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let runOnce = true;

  const idleAnim = [idle1, idle2, idle3, idle4, idle5, idle6];
  const walkAnim = [walk1, walk2, walk3];
  const backwardAnim = [backward1, backward2, backward3];
  const jumpAnim = [jump];
  const frontKickAnim = [frontkick1, frontkick2, frontkick3];
  const lowKickAnim = [lowkick1, lowkick2, lowkick3];

  // === MIRRORED ===

  const idleAnimMirrored = [idle1m, idle2m, idle3m, idle4m, idle5m, idle6m];
  const e_idleAnimMirrored = [
    e_idle1m,
    e_idle2m,
    e_idle3m,
    e_idle4m,
    e_idle5m,
    e_idle6m,
  ];

  // ================

  const e_idleAnim = [e_idle1, e_idle2, e_idle3, e_idle4, e_idle5, e_idle6];
  const e_walkAnim = [
    e_backward1,
    e_backward2,
    e_backward3,
    e_backward4,
    e_backward5,
    e_backward6,
    e_backward7,
    e_backward8,
    e_backward9,
    e_backward10,
  ];
  const e_jumpAnim = [e_jump1, e_jump2, e_jump3, e_jump4, e_jump5, e_jump6];
  const e_frontKick = [e_frontkick1, e_frontkick2, e_frontkick3, e_frontkick4];
  const e_lowKick = [e_lowkick1, e_lowkick2, e_lowkick3];

  const keys = {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext("2d");
    if (!c) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const playerRef = new Sprite(
      canvas,
      c,
      { x: 0 + 200, y: 50 },
      { x: 0, y: 0 },
      {
        idleAnim,
        idleAnimMirrored,
        walkAnim,
        backwardAnim,
        jumpAnim,
        frontKickAnim,
        lowKickAnim,
      },
      {
        idleMaxFrame: 6,
        walkMaxFrame: 3,
        backwardMaxFrame: 3,
        jumpMaxFrame: 1,
        frontKickMaxFrame: 3,
        lowKickMaxFrame: 3,
      }
    );
    const enemyRef = new Sprite(
      canvas,
      c,
      { x: canvas.width - 320, y: 50 },
      { x: 0, y: 0 },
      {
        idleAnim: e_idleAnim,
        idleAnimMirrored: e_idleAnimMirrored,
        walkAnim: e_walkAnim,
        backwardAnim: e_walkAnim,
        jumpAnim: e_jumpAnim,
        frontKickAnim: e_frontKick,
        lowKickAnim: e_lowKick,
      },
      {
        idleMaxFrame: 6,
        walkMaxFrame: 10,
        backwardMaxFrame: 10,
        jumpMaxFrame: 6,
        frontKickMaxFrame: 4,
        lowKickMaxFrame: 3,
      }
    );

    let timer = 100;
    function decreaseTimer() {
      if (timer > 0) {
        setTimeout(decreaseTimer, 1000);
        timer--;
        const timerElement = document.querySelector("#timer");
        if (timerElement) {
          timerElement.innerHTML = timer.toString();
        }
      }

      if (timer === 0) {
        console.log("Draw");
        if (playerRef.health === enemyRef.health) {
          document
            .querySelector("#drawimg")
            ?.setAttribute("style", "display: flex");
        }
      }
    }

    decreaseTimer();

    function checkWinner() {
      if (playerRef.health <= 0) {
        gameOver = true;
        playerRef.health = 0;
        console.log("Enemy Wins");
        document
          .querySelector("#loseimg")
          ?.setAttribute("style", "display: flex");
      }
      if (enemyRef.health <= 0) {
        gameOver = true;
        enemyRef.health = 0;
        console.log("Player Wins");
        document
          .querySelector("#winimg")
          ?.setAttribute("style", "display: flex");
        player1Win = true;
      }
    }

    function checkPosition() {
      if (playerRef.position.x > enemyRef.position.x) {
        mirrored = true;
      } else {
        mirrored = false;
      }
    }
    // console.log(playerRef.width);
    function animate() {
      requestAnimationFrame(animate);
      playerRef.now = Date.now();
      playerRef.elapsed = playerRef.now - playerRef.then;

      if (playerRef.elapsed < fps) return;
      c?.drawImage(bgImage, 0, 0, canvas?.width ?? 0, canvas?.height ?? 0);
      playerRef.update();
      enemyRef.update();

      if (!gameOver) {
        playerRef.switchAnimation("idle");
        playerRef.velocity.x = 0;
        if (keys.a.pressed) {
          playerRef.switchAnimation("walk");
          playerRef.velocity.x = -6;
        } else if (keys.d.pressed) {
          playerRef.switchAnimation("backward");
          playerRef.velocity.x = 6;
        }
      }

      if (
        playerRef.position.x + playerRef.width > enemyRef.position.x &&
        playerRef.position.x < enemyRef.position.x + enemyRef.width &&
        playerRef.position.y + playerRef.height > enemyRef.position.y &&
        playerRef.position.y < enemyRef.position.y + enemyRef.height
      ) {
        if (playerRef.frontKick) {
          playerRef.switchAnimation("frontKick");
          enemyRef.health -= playerRef.fkDamage;
          console.log(enemyRef.health);
          playerRef.frontKick = false;
          console.log("FrontKick");
        }
        if (playerRef.lowKick) {
          playerRef.switchAnimation("lowKick");
          enemyRef.health -= playerRef.lkDamage;
          playerRef.lowKick = false;
          console.log("Low Kick");
        }
      }

      document
        .querySelector("#playerhp")
        ?.setAttribute("style", "width: " + playerRef.health + "%");
      document
        .querySelector("#enemyhp")
        ?.setAttribute("style", "width: " + enemyRef.health + "%");

      if (player1Win) {
        navigate("/won-prize");
      } else if (gameOver) {
        return;
      }
      checkWinner();
      checkPosition();
    }

    animate();

    window.addEventListener("keydown", (event) => {
      if (event.key == "d") {
        keys.d.pressed = true;
      }
      if (event.key == "a") {
        keys.a.pressed = true;
      }
      if (event.key == "s") {
        keys.s.pressed = true;
      }
      if (event.key == "w") {
        playerRef.switchAnimation("jump");
        playerRef.velocity.y = -10;
      }
      if (event.key == " ") {
        event.preventDefault();
        if (keys.d.pressed) {
          playerRef.switchAnimation("frontkick");
          playerRef.frontKickAttack();
        } else if (keys.s.pressed) {
          playerRef.switchAnimation("lowkick");
          playerRef.lowKickAttack();
        }
      }
    });
    window.addEventListener("keyup", (event) => {
      if (event.key == "d") {
        keys.d.pressed = false;
      }
      if (event.key == "a") {
        keys.a.pressed = false;
      }
      if (event.key == "s") {
        playerRef.switchAnimation("idle");
        keys.s.pressed = false;
      }
    });
  }, []);

  return (
    <>
      <MainHpContainer>
        <HpBarContainer>
          <PlayerHp id="playerhp"></PlayerHp>
        </HpBarContainer>
        <HpBarContainer>
          <EnemyHp id="enemyhp"></EnemyHp>
        </HpBarContainer>
      </MainHpContainer>
      <HealthBar src={bar}></HealthBar>
      <Timer id="timer">50</Timer>
      <div>
        <canvas
          ref={canvasRef}
          style={{ width: "100vw", height: "70vh" }}
        ></canvas>
      </div>

      <DrawImage id="drawimg" src={drawimg}></DrawImage>
      <DrawImage id="winimg" src={winimg}></DrawImage>
      <DrawImage id="loseimg" src={loseimg}></DrawImage>
    </>
  );
};

export default GameFinal;
