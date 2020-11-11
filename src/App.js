import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Routes from './router';

const App = () => {
    return (
        <Router>
            <div>
                <Switch>
                    {
                        Routes.map((router, index) => {
                            return (
                                <Route path={router.path} exact component={router.component} key={index} />
                            )
                        })
                    }
                </Switch>
            </div>
        </Router>
    );
}

export default App;
