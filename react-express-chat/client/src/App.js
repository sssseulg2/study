import React from 'react';
import Auth from "./components/Auth";
import Chat from "./components/Chat";
import { BrowserRouter, Route } from 'react-router-dom'; 

class App extends React.Component {
  render() {
    return(
      <div>
        <BrowserRouter>
          <Route path="/" exact component={Auth} />
          <Route path="/chat" component={Chat} />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
