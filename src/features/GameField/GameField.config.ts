import { iHeroState } from '../../models/interface';

const BASE_HERO_SPEED = 5;
const BASE_SPELL_SPEED = 10;

const BASE_HERO1_COLOR = '#FF652F';
const BASE_HERO2_COLOR = '#14A76C';
export const BASE_SHIFT = 60;

interface iInitialState {
  Hero1: iHeroState;
  Hero2: iHeroState;
}

export const initialState: iInitialState = {
  Hero1: {
    name: 'Hero 1',
    heroSpeed: BASE_HERO_SPEED,
    heroColor: BASE_HERO1_COLOR,
    spellSpeed: BASE_SPELL_SPEED,
    spellColor: BASE_HERO1_COLOR,
  },
  Hero2: {
    name: 'Hero 2',
    heroSpeed: BASE_HERO_SPEED,
    heroColor: BASE_HERO2_COLOR,
    spellSpeed: BASE_SPELL_SPEED,
    spellColor: BASE_HERO2_COLOR,
  },
};