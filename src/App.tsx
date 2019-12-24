import React from 'react';

import NavBar from './components/navbar/NavBar';
import TabsWrapper from './components/tabs/TabsWrapper';

function App() {
  return (
    <div className="w-screen h-screen flex bg-gray-800 text-gray-000 font-sans">
      <NavBar />
      <TabsWrapper />
    </div>
  );
}

export default App;
