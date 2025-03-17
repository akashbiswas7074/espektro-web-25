import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const FireflyCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let X = (canvas.width = window.innerWidth);
    let Y = (canvas.height = window.innerHeight);
    let shapeNum = X < 768 ? 250 : 500; // Increased the number of fireflies
    let bamboos: Bamboo[] = [];
    let shapes: Shape[] = [];

    const style = {
      black: "black",
      white: "white",
      lineWidth: 4,
    };

    const rand = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    class Bamboo {
      ctx: CanvasRenderingContext2D;
      x!: number;
      y!: number;
      w!: number;
      h!: number;
      n!: number;
      d!: number;
      a!: number;
      rad!: number;
      random!: number;

      constructor(
        ctx: CanvasRenderingContext2D,
        x: number,
        y: number,
        w: number,
        h: number,
        n: number
      ) {
        this.ctx = ctx;
        this.init(x, y, w, h, n);
      }

      init(x: number, y: number, w: number, h: number, n: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.n = n;
        this.d = 3;
        this.a = rand(-5, 5) * Math.random();
        this.rad = (this.a * Math.PI) / 180;
        this.random = Math.random() * 2;
      }

      draw() {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = style.black;
        ctx.globalAlpha = this.random;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rad);
        ctx.translate(-this.x, -this.y);

        for (let i = 0; i < this.n; i++) {
          ctx.beginPath();
          ctx.moveTo(this.x - this.w / 2, this.y - this.h * i - this.d * i);
          ctx.quadraticCurveTo(
            this.x - this.w / 5,
            this.y - this.h * i - this.d * i - this.h / 2,
            this.x - this.w / 2,
            this.y - this.h * i - this.d * i - this.h
          );
          ctx.lineTo(
            this.x + this.w / 2,
            this.y - this.h * i - this.d * i - this.h
          );
          ctx.quadraticCurveTo(
            this.x + this.w / 5,
            this.y - this.h * i - this.d * i - this.h / 2,
            this.x + this.w / 2,
            this.y - this.h * i - this.d * i
          );
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      }

      render() {
        this.draw();
      }
    }

    class Shape {
      ctx: CanvasRenderingContext2D;
      x!: number;
      y!: number;
      r!: number;
      ga!: number;
      v!: { x: number; y: number };
      l!: number;
      sl!: number;
      c!: { r: number; g: number; b: number };

      constructor(ctx: CanvasRenderingContext2D, x: number, y: number) {
        this.ctx = ctx;
        this.init(x, y);
      }

      init(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.r = Math.random() < 0.9 ? rand(2, 10) : rand(60, 100);
        this.ga =
          this.r < 50 ? Math.random() * Math.random() : Math.random() / 30;
        this.v = {
          x: rand(-1, 1) * Math.random(),
          y: rand(-1, 1) * Math.random(),
        };
        this.l = rand(0, 200);
        this.sl = this.l;
        this.c = {
          r: rand(200, 255), // High red
          g: 0, // No green
          b: rand(200, 255), // High blue
        }; // Change color to bright purple
      }

      updateParams() {
        const ratio = this.l / this.sl;
        this.ga *= ratio * 1.1;
        this.l -= 1;
        if (this.l < 0) this.init(rand(0, X), rand(0, Y));
      }

      updatePosition() {
        this.x += this.v.x;
        this.y += this.v.y;
      }

      draw() {
        const ctx = this.ctx;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.globalAlpha = this.ga;
        ctx.fillStyle = `rgb(${this.c.r}, ${this.c.g}, ${this.c.b})`;
        // Removed shadow blur and shadow color
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      render() {
        this.updatePosition();
        this.updateParams();
        this.draw();
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, X, Y);
      shapes.forEach((shape) => shape.render());
      requestAnimationFrame(render);
    };

    const onResize = () => {
      X = canvas.width = window.innerWidth;
      Y = canvas.height = window.innerHeight;
      bamboos = [];
      shapes = [];
      shapeNum = X < 768 ? 250 : 500; // Increased the number of fireflies

      for (let xPos = 0; xPos < X; ) {
        const dist = rand(5, 20);
        const width = rand(10, 50);
        const height = rand(100, 300);
        const maxNum = Y / height;
        xPos += dist + width;
        bamboos.push(new Bamboo(ctx, xPos, Y, width, height, maxNum));
      }
      for (let i = 0; i < shapeNum; i++) {
        shapes.push(new Shape(ctx, rand(0, X), rand(0, Y)));
      }
    };

    window.addEventListener("resize", onResize);
    onResize();
    render();

    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <motion.canvas
        ref={canvasRef}
        id="canvas"
        className="z-[39] absolute top-0 left-0 w-full h-full "
      />
      <motion.div className="h-screen  overflow-hidden absolute top-0"></motion.div>
    </>
  );
};

export default FireflyCanvas;
