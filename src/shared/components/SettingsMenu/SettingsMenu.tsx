import React, { useState } from 'react';

import styles from './SettingsMenu.module.scss';

import { Hero } from '../../../entities/hero';

interface iSettingsMenuProps {
  Hero: Hero;
  id: string;
  ColorMenuIsOpen: boolean;
}

const SettingsMenu: React.FC<iSettingsMenuProps> = (props) => {
  const { Hero, id, ColorMenuIsOpen } = props;

  const [heroSpeed, setHeroSpeed] = useState(Hero.speed);
  const [spellSpeed, setSpellSpeed] = useState(Hero.spellSpeed);

  const handleHeroSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    Hero.speed = Number(newValue);
    setHeroSpeed(newValue);
  };

  const handleSpellSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    Hero.spellSpeed = Number(newValue);
    setSpellSpeed(newValue);
  };
  const title = id === 'left' ? 'левый герой' : 'правый герой';

  return (
    <div className={styles.settings} id={id}>
      <div className={styles.settings__title}>
        <h3>{title}</h3>
      </div>
      <div className={styles.settings__item}>
        <label className={styles.item__label}>Hero Speed: {heroSpeed}</label>
        <input
          type="range"
          min="2"
          max="10"
          value={heroSpeed}
          onChange={handleHeroSpeedChange}
          className={styles.item__input}
          disabled={ColorMenuIsOpen}
        />
      </div>
      <div className={styles.settings__item}>
        <label className={styles.item__label}>Spell Speed: {spellSpeed}</label>
        <input
          type="range"
          min="3"
          max="20"
          value={spellSpeed}
          onChange={handleSpellSpeedChange}
          className={styles.item__input}
          disabled={ColorMenuIsOpen}
        />
      </div>
    </div>
  );
};

export default SettingsMenu;
