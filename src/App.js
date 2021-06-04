// @flow
import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import Characters from './components/pages/characters/Characters'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import CharacterCard from './components/pages/characters/CharacterCard'
import EpisodeCard from './components/pages/episodes/EpisodeCard'
import LocationCard from './components/pages/location/LocationCard'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

const queryClient = new QueryClient();
function App() {
  return (
    <div>
       <Router >
          <QueryClientProvider client={queryClient}>
            <Header />
            <div style={{minHeight: "calc(100vh - 64px)"}}>
              <Switch>
                <Route exact path="/">
                  <Characters />
                </Route>
                <Route exact path="/character-item">
                  <CharacterCard />
                </Route>
                <Route exact path="/episode-card">
                  <EpisodeCard />
                </Route>
                <Route exact path="/location-card">
                  <LocationCard />
                </Route>
                <Redirect to="/" />               
              </Switch>  
            </div>
            <Footer/>    
          </QueryClientProvider> 
       </Router>
    </div>
  );
}

export default App;
