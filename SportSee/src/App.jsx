import React from 'react';
import HorizontalNav from './components/Navigation/HorizontalNav';
import './styles/main.css';

function App() {
  return (
    <div className="app">
      <HorizontalNav />
      <main className="content">
        {/* app ici */}
      </main>
    </div>
  );
}

export default App;