import TopBar from './components/TopBar/TopBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';


function App() {
  let showContentRoutes = (routes) => {
    let result = [];
    if(routes.length > 0) {
      result = routes.map((route, index) => {
        return <Route key={index} exact={route.exact} path={route.path} component={route.main} />
      });
    };
    return result;
  };

  return (
    <Router>
      <div className="App">
        <TopBar />
        <Switch>
          {showContentRoutes(routes)}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
