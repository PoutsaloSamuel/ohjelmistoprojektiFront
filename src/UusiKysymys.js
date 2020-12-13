import Axios from 'axios';
import React, {/*useEffect ,*/useState} from 'react';


function UusiKysymys () {
    const[kysymys, setValues] = useState({content:''});
    const[virhe, setVirhe ] = useState('');
    const[viesti, setViesti ] = useState('');
    

    const lisaaKysymys = (e) => {
    e.preventDefault();
    const formData = {
        'content': kysymys.content,
    }
    

    Axios.post('http://localhost:8080/kysymys/add', formData)
    .then(response => {
        if (response.status === 200) {
            setValues({content: ''});
            setViesti('Lisäys onnistui!');
        } else {
            setViesti('Lisäys epäonnistui!');
        }
    })
    }

   


    const muuta = (e) => {
        setValues(
            { ...kysymys, [e.target.name]: e.target.value }
        );
    }

    const lisaa = (e) => {
        if (kysymys.content.length === 0) {
            setVirhe('Kysymys täytyy olla asetettu')
        } else {
            lisaaKysymys(e)
        }
    }

    

    return(
    <div>
        <h1>// Tämä sivu on tarkoitettu "Admin" käyttäjille, mutta en ole tehnyt suojausta</h1>
        <h2>Näytönohjaimet</h2>
        <form method='post'>
            <h3>
            <label htmlFor='content'>Kysymys: </label>
            <input type='text' name='content' onChange={ (e) => muuta(e) } /><br />
            <button type='button' onClick={ (e) => lisaa(e) }>Lisää</button>
            </h3>
        </form>
        <p>{ virhe }</p>
    </div>
    );
}
export default UusiKysymys;