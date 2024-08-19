export class Spell {
  private radius: number;

  constructor(
    private ctx: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    private direction: number,
    public color: string,
    public speed: number,
  ) {
    this.radius = 30;
    this.speed = speed;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }

  update() {
    this.x += this.speed * this.direction;
    this.draw();

    if (
      this.x - this.radius > this.ctx.canvas.width ||
      this.x + this.radius < 0
    ) {
      return true;
    }

    return false;
  }

  checkCollisionWithHero(hero: { x: number; y: number; radius: number }) {
    const dist = Math.hypot(this.x - hero.x, this.y - hero.y);
    return dist < this.radius + hero.radius;
  }
}
