import React from 'react';
import HorizontalNav from './components/Navigation/HorizontalNav';
import VerticalNav from './components/navigation/VerticalNav';
import './styles/main.css';

function App() {
  return (
    <div className="app">
      <HorizontalNav />
      <div className="main-container">
        <VerticalNav />
        <main className="content">
        {/* app ici */}
        </main>
      </div>
    </div>
  );
}

export default App;