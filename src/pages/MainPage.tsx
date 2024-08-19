import styles from './MainPage.module.scss';

import GameField from '../features/GameField/GameField';
import ResultField from '../features/ResultField/ResultField';

const MainPage = () => {
  return (
    <main className={styles.container}>
      <GameField />
      <ResultField />
    </main>
  );
};

export default MainPage;
