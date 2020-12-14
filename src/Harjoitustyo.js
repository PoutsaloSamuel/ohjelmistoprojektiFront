import React, { useState } from 'react';


import {BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseLine from '@material-ui/core/CssBaseline';
import AlkumenuMUI from './AlkumenuMUI';
import HaeKysymykset from './HaeKysymykset';
import AdminUusi from './AdminUusi';
import Tyhja from './Tyhja';


	
function App() {

const [salasana, setSalasana] = useState('');

const muuta = (e) => {
       salasana=e.target.value;
    }
 return(

	
  <BrowserRouter>
	 <div>
	 <label htmlFor='salasana'>Admin: </label>
    <input type='text' name='salasana' value={salasana} onChange={event => setSalasana(event.target.value)}/>
	
	  <CssBaseLine/>
	  <AlkumenuMUI/>
	  <Switch>
    <Route exact path="/">
      
    </Route>
    {
      (salasana == 'admin') &&
      <Route path='/UusiKysymys' component={AdminUusi} />
    }
    
	<Route path='/UusiKysymys' component={Tyhja} />
        <Route path='/Kysymyslistaus' component={HaeKysymykset}/>
        
  </Switch>
   </div>
 </BrowserRouter>

		
	);
  }

export default App;
