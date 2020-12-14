import Axios from 'axios';
import React, {/*useEffect ,*/useState} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';
import red from '@material-ui/core/colors/red';


//Komponentin omaa tyyliä
const useStyles = makeStyles((theme) => ({
  palette: {
    primary: {main: grey[900], contrastText: '#FFFFFF'},
    secondary: {main: red[900], contrastText: red[900]},
    text: {primary: grey[990], secondary: red[900], fontFamily: 'Arial'},
    
    },

  card: {
    marginTop: 15, 
    maxWidth: 600, minWidth: 200,
    color: grey[850],
  },
  image: {
    height: 350,
    width: 400,
  },
  typo: {
    height: 300, 
    width: 400,
  },
  button: {
    
  },
  icon: {
    color: grey[600],
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  input: {
    border: 0,
    width: 300,
    fontSize: 16,
  },
}));

function Admin (props) {
    const classes = useStyles();
    const url = 'http://localhost:8080';

    const [viesti, setViesti] = useState('');
    const [open, setOpen] = useState(false);
    const [kysymykset, setKysymykset] = useState(props.kysymykset);
    const [vastaukset, setVastaukset] = useState(props.vastaukset);
    const[vastaus, setValuess] = useState({question:'', answer:''});
    const[virhe, setVirhe ] = useState('');

const[kysymys, setValues] = useState({content:''});



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


    const handleClose = () => {
      setOpen(false);
    }

    const lisaa = (e) => {
        if (kysymys.content.length === 0) {
            setVirhe('Kysymys täytyy olla asetettu')
        } else {
            lisaaKysymys(e)
        }
    }

    const lisaaVastaus = (e) => {
      e.preventDefault();
      const formData = {
          'question': vastaus.question,
          'answer': vastaus.answer,
      };
  
  
      Axios.post('http://localhost:8080/vastaus/add', formData)
      .then(response => {
          if (response.status === 200) {
              setValuess({question: '', answer: ''});
              setViesti('Lisäys onnistui!');
          } else {
              setViesti('Lisäys epäonnistui!');
          }
      })
      }

      

      const muuta = (e) => {
        setValuess(
            { ...vastaus, [e.target.name]: e.target.value }
        );
        setVirhe('');
    }

    const muutaKysymys = (e) => {
        setValues(
            { ...kysymys, [e.target.name]: e.target.value }
        );
        setVirhe('');
    }

    

    const poistaKysymys = async (id) => {
        try {
          // Kutsu backista poistoa
          const response = await axios.get('http://localhost:8080/kysymys/delete/' + id);
    
          // Jos se onnistui, päivitä käyttöliittymä
          if (response.status === 200) {
            // Aseta objektitaulukko kuntoon
            const uusiKysymykset = await kysymykset.filter(kysymys => kysymys.id !== id);
            setKysymykset(uusiKysymykset);
            // Laita viesti kuntoon
            setViesti('Poisto onnistui');
          }
        } catch (error) {
          setViesti('Poisto ei onnistunut');
        }
        setOpen(true);
      }

    const poistaVastaus = async (id) => {
      try {
       // Kutsu backista poistoa
       const response = await axios.get('http://localhost:8080/vastaus/delete/' + id);

       // Jos se onnistui, päivitä käyttöliittymä
       if (response.status === 200) {
        // Aseta objektitaulukko kuntoon
        const uusiVastaukset = await vastaukset.filter(vastaus => vastaus.id !== id);
        setVastaukset(uusiVastaukset);
        // Laita viesti kuntoon
        setViesti('Poisto onnistui');
       }
      } catch (error) {
        setViesti('Poisto ei onnistunut');
      }
      setOpen(true);
    }

   
    let dialog =   
      <Dialog onClick={handleClose} open={open}>
        <DialogContent>
          <DialogContentText color='secondary'>{viesti}
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          </DialogContentText>
        </DialogContent>
      </Dialog>;

   // Sivun listaus
   

      return (

        
        
      <div>

<div>

<h2>Kysymykset</h2>
<Grid container spacing={5}>


  {kysymykset.map(kysymys => {
    if (kysymys.id == 1) {
      return (
        <Grid item key={kysymys.id}>
          <Card className={classes.card}>


            <CardContent>

              <form method='post'>
              <label className={classes.input}>Kysymys: </label>
                <input type='text' className={classes.input} name='question' id='question' value={kysymys.content} onClick={(e) => muuta(e)} /><br />

                

              </form>
            </CardContent>
            <CardActions>
              <div className={classes.button}>
                <IconButton onClick={() => poistaKysymys(kysymys.id)}><DeleteIcon className={classes.icon} />Poista kysymys(Admin)</IconButton>
              </div>
            </CardActions>
          </Card>

        </Grid>
      )
    } else if (kysymys.id == 2) {
      return (
        <Grid item key={kysymys.id}>
          <Card className={classes.card}>


            <CardContent>

              <form method='post'>
              <label className={classes.input}>Kysymys: </label>
                <input className={classes.input} type='text' name='question' id='question' value={kysymys.content} onClick={(e) => muuta(e)} /><br />

              </form>
            </CardContent>
            <CardActions>
              <div className={classes.button}>
                <IconButton onClick={() => poistaKysymys(kysymys.id)}><DeleteIcon className={classes.icon} />Poista kysymys(Admin)</IconButton>
              </div>
            </CardActions>
          </Card>

        </Grid>
      )
    } else {
      return (
        <Grid item key={kysymys.id}>
          <Card className={classes.card}>


            <CardContent>

              <form method='post'>
              <label className={classes.button} >Kysymys: </label>
                <input className={classes.input} type='text' name='question' id='question' value={kysymys.content} onClick={(e) => muuta(e)} /><br />


              </form>
            </CardContent>
            <CardActions>
              <div className={classes.button}>
                <IconButton onClick={() => poistaKysymys(kysymys.id)}><DeleteIcon className={classes.icon} />Poista kysymys(Admin)</IconButton>
              </div>
            </CardActions>
          </Card>

        </Grid>
      )
    }

  })}

</Grid>

<div>
        
        <form method='post'>
            
            <h2 htmlFor='content'>Lisää kysymys: ('Radio','Number')</h2>
            <input type='text' name='content' onChange={ (e) => muutaKysymys(e) } /><br />
            <button type='button' onClick={ (e) => lisaa(e) }>Lisää</button>
            
        </form>
    </div>

</div>

        <h2>Vastaukset:</h2>
        <Grid container spacing={5}>
  
          
          { vastaukset.map(vastaus => {
         
            return (
                <Grid item key={ vastaus.id }>
                <Card className={ classes.card }>
                    
                    
                    <CardContent>
                    <Typography>Kysymys: {vastaus.question}</Typography>
                      <Typography>Vastaus: {vastaus.answer}</Typography>
                      </CardContent>
                      <CardActions>
                      <div className={ classes.button }>
                      <IconButton onClick={ () => poistaVastaus(vastaus.id)}><DeleteIcon className={ classes.icon }/>Poista vastaus</IconButton>
                    </div>
                    </CardActions>
                    </Card>
    
                </Grid>
          )})}
                
                </Grid>
        
                
    
    </div>
    
    )
    

    return ( <div > {dialog} <Typography>EI TOIMI</Typography></div> )
   
}

export default Admin;
