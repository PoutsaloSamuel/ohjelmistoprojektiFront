import React, {useState, Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import axios from 'axios';
import Axios from 'axios';
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
  }
}));
var testi = 'Moi';
function Kysymyslistaus (props) {
    const classes = useStyles();
    const url = 'http://localhost:8080';

    const [viesti, setViesti] = useState('');
    const [open, setOpen] = useState(false);
    const [kysymykset, setKysymykset] = useState(props.kysymykset);
    const[vastaus, setValues] = useState({question:'', answer:''});
    const[virhe, setVirhe ] = useState('');
    const [vastaukset, setVastaukset] = useState(props.vastaukset);
   
    const lisaaVastaus = (e,) => {
      e.preventDefault();
      const formData = {
          'question': testi,
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

    const handleClose = () => {
      setOpen(false);
    }

    const muuta = (e) => {
      setValues(
          { ...vastaus, [e.target.name]: e.target.value }
      );
      setVirhe('');
  }

  

  const lisaa = (e) => {
      if (vastaus.question.length === 0 || vastaus.answer.length === 0) {
          setVirhe('Vastaa kysymykseen oikein')
      } else {
        
          lisaaVastaus(e)
      }
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
   if (kysymykset.length > 0) {

      return (
        
      <div>

        <h2>kysymykset</h2>
        <Grid container spacing={5}>
  
          
          { kysymykset.map(kysymys => {
              
         
            return (
                <Grid item key={ kysymys.id }>
                <Card className={ classes.card }>
                    
                    
                    <CardContent>
                  
                    <form method='post'>
                    <h2 htmlFor='question' name='question' name='content' id='content'>{kysymys.content}</h2>
                    
            <label htmlFor='answer'>Answer: </label>
            <input type='text' name='answer' onChange={ (e) => muuta(e)}/><br />
            <button type='button' onClick={ (e) => lisaaVastaus(e)}>Lisää</button>
            
        </form>
                      </CardContent>
                      <CardActions>
                      <div className={ classes.button }>
                      <IconButton onClick={ () => poistaKysymys(kysymys.id)}><DeleteIcon className={ classes.icon }/>Poista kysymys(Admin)</IconButton>
                    </div>
                    </CardActions>
                    </Card>
    
                </Grid>
          )})}
                
                </Grid>
      
      
    </div>
    )
    }

    return ( <div > {dialog} <Typography>EI TOIMI</Typography></div> )
   
}

export default Kysymyslistaus;
