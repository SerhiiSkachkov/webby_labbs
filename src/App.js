import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home';

import './App.sass';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <div className="app-wrapper">
                    <header className="header">header</header>
                    <main className="main">
                        <Switch>
                            <Route path="/" component={Home} />
                        </Switch>
                    </main>
                    <footer className="footer">foter </footer>
                </div>
            </BrowserRouter>
        </div>
    );
};
export default App;
