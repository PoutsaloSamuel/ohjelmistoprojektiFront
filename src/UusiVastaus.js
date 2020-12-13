import React, {/*useEffect ,*/useState} from 'react';
import Axios from 'axios';
function UusiVastaus () {
    const[vastaus, setValues] = useState({question:'', answer:''});
    const[virhe, setVirhe ] = useState('');
    const[viesti, setViesti ] = useState('');

    const lisaaVastaus = (e) => {
        e.preventDefault();
        const formData = {
            'question': vastaus.question,
            'answer': vastaus.answer,
        };
    
    
        Axios.post('http://localhost:8080/vastaus/add', formData)
        .then(response => {
            if (response.status === 200) {
                setValues({question: '', answer: ''});
                setViesti('Lisäys onnistui!');
            } else {
                setViesti('Lisäys epäonnistui!');
            }
        })
        }
    

    const muuta = (e) => {
        setValues(
            { ...vastaus, [e.target.name]: e.target.value }
        );
        setVirhe('');
    }

    const lisaa = (e) => {
        if (vastaus.question.length === 0 || vastaus.answer.length === 0) {
            setVirhe('vastausn nimi ja hinta täytyy olla asetettu')
        } else {
            lisaaVastaus(e)
        }
    }



    return(
    <div>
        <h1>// Tämä sivu on tarkoitettu "Admin" käyttäjille, mutta en ole tehnyt suojausta</h1>
        <h2>vastaust</h2>
        <form method='post'>
            <h3>
            <label htmlFor='question'>Question: </label>
            <input type='text' name='question' onChange={ (e) => muuta(e) } /><br />
            <label htmlFor='answer'>Answer: </label>
            <input type='text' name='answer' onChange={ (e) => muuta(e) } /><br />
            <button type='button' onClick={ (e) => lisaa(e) }>Lisää</button> 
            </h3>
        </form>
        <p>{ virhe }</p>
    </div>
    );
}
export default UusiVastaus;