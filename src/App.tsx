import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Console from './pages/Console';
import SignIn from './pages/signin/Index';

function App() {
  return (
    <div className="h-screen w-screen bg-gray-800 text-gray-000 font-sans">
      <Router>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route component={Console} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
