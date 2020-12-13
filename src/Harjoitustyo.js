import React from 'react';

import UusiVastaus from './UusiVastaus';
import UusiKysymys from './UusiKysymys';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import CssBaseLine from '@material-ui/core/CssBaseline';
import AlkumenuMUI from './AlkumenuMUI';
import HaeKaikki from './HaeKaikki';
import HaeKysymykset from './HaeKysymykset';
import { Typography } from '@material-ui/core';





function App() {
 return(

	
  <BrowserRouter>
	 <div>
		
	  <CssBaseLine/>
	  <AlkumenuMUI/>
	  <Switch>
		<Route path='/KaikkiListaus' component={HaeKaikki}/>
		<Route path='/Kysymyslistaus' component={HaeKysymykset}/>
		<Route path='/UusiVastaus' component={UusiVastaus} />
		<Route path='/UusiKysymys' component={UusiKysymys} />
	 </Switch>
   </div>
 </BrowserRouter>

		
	);
  }

export default App;


