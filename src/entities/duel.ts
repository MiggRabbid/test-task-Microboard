import { Hero } from './hero';
import { Spell } from './spell';

export class Duel {
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private spellHero1: Spell[];
  private spellHero2: Spell[];
  private intervalId?: number;
  private shootIntervalId1?: number;
  private shootIntervalId2?: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    private Hero1: Hero,
    private Hero2: Hero,
    private actions: { addScoreHero1: () => void; addScoreHero2: () => void },
  ) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.Hero1 = Hero1;
    this.Hero2 = Hero2;
    this.spellHero1 = [];
    this.spellHero2 = [];
  }

  start() {
    this.intervalId = window.setInterval(() => this.update(), 1000 / 60);

    this.shootIntervalId1 = window.setInterval(
      () => this.shoot(this.Hero1),
      1000,
    );
    this.shootIntervalId2 = window.setInterval(
      () => this.shoot(this.Hero2),
      1000,
    );
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    if (this.shootIntervalId1) {
      clearInterval(this.shootIntervalId1);
    }

    if (this.shootIntervalId2) {
      clearInterval(this.shootIntervalId2);
    }
  }

  update() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.Hero1.update();
    this.Hero2.update();

    this.spellHero1.forEach((spell, index) => {
      spell.update();

      const shouldRemove = spell.update();
      if (shouldRemove) {
        this.spellHero1.splice(index, 1);
        return;
      }

      if (spell.checkCollisionWithHero(this.Hero2.getCollisionParams())) {
        this.spellHero1.splice(index, 1);
        this.actions.addScoreHero1();
      }
    });

    this.spellHero2.forEach((spell, index) => {
      spell.update();

      const shouldRemove = spell.update();
      if (shouldRemove) {
        this.spellHero2.splice(index, 1);
        return;
      }

      if (spell.checkCollisionWithHero(this.Hero1.getCollisionParams())) {
        this.spellHero2.splice(index, 1);
        this.actions.addScoreHero2();
      }
    });
  }

  shoot(CurrHero: Hero) {
    const { x, y, spellColor, spellSpeed  } = CurrHero;
    const { ctx } = this;
    
    if (CurrHero === this.Hero1) {
      const direction = 1;
      const spell = new Spell(ctx, x, y, direction, spellColor, spellSpeed);
      this.spellHero1.push(spell);
    }

    if (CurrHero === this.Hero2) {
      const direction = -1;
      const spell = new Spell(ctx, x, y, direction, spellColor, spellSpeed);
      this.spellHero2.push(spell);
    }
  }
}
