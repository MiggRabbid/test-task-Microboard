import React, { useEffect, useRef, useState } from 'react';

import styles from './GameField.module.scss';

import useActions from '../../hooks/useActions';

import { BASE_SHIFT, initialState } from './GameField.config';

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

  const Hero1 = new Hero(
    null,
    initialState.Hero1.name,
    BASE_SHIFT,
    0,
    initialState.Hero1.heroColor,
    initialState.Hero1.heroSpeed,
    initialState.Hero1.spellColor,
    initialState.Hero1.spellSpeed,
  );

  const Hero2 = new Hero(
    null,
    initialState.Hero2.name,
    0,
    BASE_SHIFT,
    initialState.Hero2.heroColor,
    initialState.Hero2.heroSpeed,
    initialState.Hero2.spellColor,
    initialState.Hero2.spellSpeed,
  );

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

      if (Hero1.isClicked(clickX, clickY)) {
        setColorMenuState({
          isOpen: true,
          Hero: Hero1,
          PositionLeft: clickX,
          PositionTop: clickY,
        });
      } else if (Hero2.isClicked(clickX, clickY)) {
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

    canvas.addEventListener('click', handleClick);

    return () => {
      duel.stop();
      canvas.removeEventListener('click', handleClick);
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
        <SettingsMenu Hero={Hero1} id="left" />
        <SettingsMenu Hero={Hero2} id="right" />
      </div>
    </section>
  );
};

export default React.memo(GameField);
