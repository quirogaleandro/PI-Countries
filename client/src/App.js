import {Route} from 'react-router-dom'
import landingPage from './components/LandingPage/landingPage'
import Home from './components/Home/Home'
import CountryDetail from './components/CountryDetail/CountryDetail';
import ActivityCreate from './components/Rest/ActivityCreate'


function App() {
  return (
      <div>
        <Route exact path={'/'} component={landingPage}></Route>
        <Route path={'/home'}  component={Home}/>
        <Route path={'/activity'} component={ActivityCreate}/>
        <Route path={'/detail/:id'} component={CountryDetail}></Route>
      </div>
  )
}

export default App;
