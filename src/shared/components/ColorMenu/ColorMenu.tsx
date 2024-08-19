import React, { useEffect, useState } from 'react';

import styles from './ColorMenu.module.scss';

import { Hero } from '../../../entities/hero';

interface iColorMenuProps {
  Hero: Hero | null;
  closeColorMenu: () => void;
}

const ColorMenu: React.FC<iColorMenuProps> = (props) => {
  const { Hero, closeColorMenu } = props;

  if (!Hero) return null;

  const [spellColor, setSpellColor] = useState(Hero.spellColor);

  useEffect(()=> {
    setSpellColor(Hero.spellColor)
  }, [Hero])

  const handleSpellColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    Hero.spellColor = newValue;
    setSpellColor(newValue);
  };


  return (
      <div
        className={styles.settings}
      >
        <div className={styles.settings__title}>
          <h3>{Hero.name}</h3>
          <button onClick={closeColorMenu}>X</button>
        </div>
        <div className={styles.settings__item}>
          <label className={styles.item__label} htmlFor="colorPicker">
            Выберите цвет заклинания:
          </label>
          <input
            className={styles.item__input}
            type="color"
            id="colorPicker"
            value={spellColor}
            onChange={handleSpellColor}
          />
          <div className={styles.item__display} id="colorDisplay"></div>
        </div>
      </div>
  );
};

export default ColorMenu;
