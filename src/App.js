import 'bootstrap/dist/css/bootstrap.min.css';
import { ViewLogin } from './Views/ViewLogin.js'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/CVCreate">Crear CV</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/Login">
            <ViewLogin />
          </Route>
          <Route path="/CVCreate">
            Crear CV
          </Route>
          <Route path="/">
            <h1>HOLA MUNDO</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
<div className="App">



</div>