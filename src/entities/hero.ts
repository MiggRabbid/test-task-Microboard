export class Hero {
  private radius: number;
  private direction: number;

  constructor(
    private ctx: CanvasRenderingContext2D | null,
    public name: string,
    public x: number,
    public y: number,
    public color: string,
    public speed: number,
    public spellColor: string,
    public spellSpeed: number,
  ) {
    this.radius = 50;
    this.direction = 1;
    this.spellColor = spellColor;
    this.spellSpeed = spellSpeed;
  }
  
  setContext(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  isClicked(clickX: number, clickY: number): boolean {
    const distance = Math.sqrt(
      (clickX - this.x) ** 2 + (clickY - this.y) ** 2
    );
    return distance <= this.radius;
  }

  draw() {
    if (!!this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  }

  update() {
    this.y += this.speed * this.direction;

    if (
      (!!this.ctx && this.y + this.radius > this.ctx.canvas.height) ||
      this.y - this.radius < 0
    ) {
      this.direction *= -1;
    }

    this.draw();
  }

  getCollisionParams() {
    return {
      x: this.x,
      y: this.y,
      radius: this.radius,
    };
  }
}
