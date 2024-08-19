import { Provider } from 'react-redux';

import { store } from './store/index'

import Header from '../widgets/Header/Header';
import MainPage from '../pages/MainPage';

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <MainPage />
    </Provider>
  );
};

export default App;
