import React, { useEffect, useRef, useState } from 'react';

import styles from './GameField.module.scss';

import useActions from '../../hooks/useActions';

import { BASE_SHIFT, Hero1, Hero2 } from './GameField.config';

import { Duel } from '../../entities/duel';
import { Hero } from '../../entities/hero';
import SettingsMenu from '../../shared/components/SettingsMenu/SettingsMenu';

import ColorMenu from '../../shared/components/ColorMenu/ColorMenu';

interface iColorMenuState {
  isOpen: boolean;
  Hero: Hero | null;
  PositionLeft: number;
  PositionTop: number;
}

const GameField = () => {
  const { addScoreHero1, addScoreHero2 } = useActions();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [ColorMenuState, setColorMenuState] = useState<iColorMenuState>({
    isOpen: false,
    Hero: null,
    PositionLeft: 0,
    PositionTop: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const actions = { addScoreHero1, addScoreHero2 };

    Hero1.setContext(ctx);
    Hero1.y = canvas.height - BASE_SHIFT;

    Hero2.setContext(ctx);
    Hero2.x = canvas.width - BASE_SHIFT;

    const duel = new Duel(
      ctx,
      canvas.width,
      canvas.height,
      Hero1,
      Hero2,
      actions,
    );
    duel.start();

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      if (Hero1.isIntersection(clickX, clickY)) {
        setColorMenuState({
          isOpen: true,
          Hero: Hero1,
          PositionLeft: clickX,
          PositionTop: clickY,
        });
      } else if (Hero2.isIntersection(clickX, clickY)) {
        setColorMenuState({
          isOpen: true,
          Hero: Hero2,
          PositionLeft: clickX,
          PositionTop: clickY,
        });
      } else {
        setColorMenuState({
          isOpen: false,
          Hero: null,
          PositionLeft: 0,
          PositionTop: 0,
        });
      }
    };

    let canChangeDirection = true;
    const FREEZE_TIME = 300;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      /* Думаю, это костыли. Но костыли рабочие */
      const checkIntersection = () => {
        if (canChangeDirection && !ColorMenuState.isOpen) {
          if (Hero1.isIntersection(mouseX, mouseY)) {
            Hero1.reverseDirection();
            canChangeDirection = false;
          }

          if (Hero2.isIntersection(mouseX, mouseY)) {
            Hero2.reverseDirection();
            canChangeDirection = false;
          }

          /* Защита от "тримера" героя. Скорее всего тоже костыль*/
          setTimeout(() => {
            canChangeDirection = true;
          }, FREEZE_TIME);
        }
      };

      checkIntersection();
    };

    canvas.addEventListener('click', handleClick);
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      duel.stop();
      canvas.removeEventListener('click', handleClick);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section className={styles.container}>
      <ColorMenu
        Hero={ColorMenuState.Hero}
        closeColorMenu={() => {
          setColorMenuState({
            isOpen: false,
            Hero: null,
            PositionLeft: 0,
            PositionTop: 0,
          });
        }}
      />
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.settings}>
        <SettingsMenu
          Hero={Hero1}
          id="left"
          ColorMenuIsOpen={ColorMenuState.isOpen}
        />
        <SettingsMenu
          Hero={Hero2}
          id="right"
          ColorMenuIsOpen={ColorMenuState.isOpen}
        />
      </div>
    </section>
  );
};

export default React.memo(GameField);
