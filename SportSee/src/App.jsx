import React from 'react';
import HorizontalNav from './components/Navigation/HorizontalNav';
import VerticalNav from './components/navigation/VerticalNav';
import UserProfile from './components/userProfile';
import UserActivity from './components/userActivity';
import UserInfos from './components/userInfos';
import './styles/main.css';

function App() {
  const userId = 18;
  return (
    <div className="app">
      <HorizontalNav />
      <div className="main-container">
        <VerticalNav />
        <main className="content">
          <UserProfile userId={userId} />
          <UserActivity userId={userId} />
          <UserInfos userId={userId} />
        </main>
      </div>
    </div>
  );
}

export default App;