import React from 'react';
import styles from "./App.module.scss";
import Homepage from './pages/homepage';
import Headrow from './headrow/headrow';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/cart';
import NotFound from './pages/notfound';


const App: React.FC = () => {

  return (
    <div className={styles.app}>
      <Headrow />
      <div className={styles.content}>
        <Routes>
          <Route path='' element={<Homepage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
