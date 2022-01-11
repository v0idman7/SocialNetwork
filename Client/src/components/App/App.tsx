import { Route, Routes } from 'react-router-dom';
import MainNavigation from '../MainNavigation/MainNavigation';
import './App.scss';

const App = () => (
  <Routes>
    <Route path='/' element={<MainNavigation />} />
  </Routes>
);

export default App;
