import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
