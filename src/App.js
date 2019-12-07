import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Blog from './containers/home/Blog';
import Player from './containers/Player';

// const useFetch = (url) => {
//   const [data, updateData] = useState(undefined);

//   // empty array as second argument equivalent to componentDidMount
//   useEffect(() => {
//     async function fetchData() {
//       const response = await fetch(url);
//       const json = await response.json();
//       updateData(json);
//     }
//     fetchData();
//   }, [url]);

//   return data;
// };




const App = () => {

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Player} />
          <Route path="/blog/:id">
            <Blog />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
