import logo from './logo.svg';
import  Header  from './components/Header'
import './index.css'
import FrontPage from './components/FrontPage';
import TopContainer from './components/TopContainer'
import MiddleContainer from './components/MiddleContainer'
import BottomContainer from './components/BottomContainer'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Gallery from './components/Gallery';
import Products from './components/Products';



function App() {
  
  return (
    <Router>

    <Switch>
      <Route path='/Galleria'>
      <Gallery/>
      </Route>
      <Route path='/Tuotteet'>
        <Products/>
      </Route>
      <Route path='/'>
        <FrontPage/>
      </Route>
      
    </Switch>
    </Router>
  );
}

export default App;
