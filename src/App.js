
import './App.css'; 
import NavApp from './Pages/nav';
import {Container} from "react-bootstrap"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Home from "./Pages/home"
import About from "./Pages/about"
import Post from "./Pages/post"
import DisplayComments from './Components/displayComments';
function App() {
  return (
      <Container>
      <BrowserRouter>
      <NavApp/>
      <Switch>
    <Route path="/" exact  component={Home}/>
    <Route path="/posts/:id"   component={DisplayComments}/>
    <Route path="/posts"   component={Post}/>
    <Route path="/about"   component={About}/>
     </Switch>
     </BrowserRouter>
      </Container>
  );
}

export default App;
