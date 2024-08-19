import React, { useEffect, useState } from 'react';

import styles from './SettingsMenu.module.scss';

import { Hero } from '../../../entities/hero';

interface iSettingsMenuProps {
  Hero: Hero;
  id: string;
}

const SettingsMenu: React.FC<iSettingsMenuProps> = (props) => {
  const { Hero, id } = props;

  const [heroSpeed, setHeroSpeed] = useState(Hero.speed);
  const [spellSpeed, setSpellSpeed] = useState(Hero.spellSpeed);

  useEffect(()=> {
    setHeroSpeed(Hero.speed)
    setSpellSpeed(Hero.spellSpeed)
  }, [Hero])


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
          max="20"
          value={heroSpeed}
          onChange={handleHeroSpeedChange}
          className={styles.item__input}
        />
      </div>
      <div className={styles.settings__item}>
        <label className={styles.item__label}>Spell Speed: {spellSpeed}</label>
        <input
          type="range"
          min="3"
          max="30"
          value={spellSpeed}
          onChange={handleSpellSpeedChange}
          className={styles.item__input}
        />
      </div>
    </div>
  );
};

export default SettingsMenu;
