import React from 'react';
import MainPage from './main-page';

type AppProps = {
  placesCount: number;
};

const App: React.FC<AppProps> = ({ placesCount }) => (
  <MainPage placesCount={placesCount} />
);

export default App;
