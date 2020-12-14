import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Admin from './Admin';

const url = 'http://localhost:8080';

function AdminUusi () {
 
 const [kysymykset, setKysymykset] = useState([]);
 const [vastaukset, setVastaukset] = useState([]);
 const [virhe, setVirhe] = useState('Haetaan');

 const haeKaikkiKomponentit = async () => {
  try {
    const response = await fetch(url + '/kysymys/all');
    const response2 = await fetch(url + '/vastaus/all');
    const json = await response.json();
    const json2 = await response2.json();
    setKysymykset(json);
    setVastaukset(json2);
    setVirhe('');
  } catch (error) {
    setKysymykset([]);
    setVastaukset([]);
    setVirhe('Tietojen haku ei onnistunut');
  }
}

 useEffect( () => {
      haeKaikkiKomponentit();
 }, [])

 if (virhe.length > 0) {
   return ( <Typography>{ virhe }</Typography> );
 }

 if (kysymykset.length > 0 && vastaukset.length > 0) {
   return ( 
   <Admin kysymykset={ kysymykset } vastaukset={ vastaukset }/> 
   );
 }

 return ( <Typography>Yhtään komponenttia ei ole</Typography> );
}

export default AdminUusi;
