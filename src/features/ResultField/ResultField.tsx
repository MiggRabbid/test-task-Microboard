import { useSelector } from 'react-redux';

import styles from './ResultField.module.scss';

import { getScoreHero1, getScoreHero2 } from '../../selectors/gameSelectors';

const ResultField = () => {
  const scoreHero1 = useSelector(getScoreHero1);
  const scoreHero2 = useSelector(getScoreHero2);

  return (
    <section className={styles.results}>
      <div className={styles.results__title}>
        <h5>Результаты игры</h5>
      </div>
      <div className={styles.results__main}>
        <div className={styles.main__hero}>
          <p>левый герой</p>
          <p>{scoreHero1}</p>
        </div>
        <div className={styles.main__hero}>
          <p>правый герой</p>
          <p>{scoreHero2}</p>
        </div>
      </div>
    </section>
  );
};

export default ResultField;
