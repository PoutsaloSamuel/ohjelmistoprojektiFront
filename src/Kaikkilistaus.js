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
import TextField from '@material-ui/core/TextField';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import EditIcon from '@material-ui/icons/Edit';
import grey from '@material-ui/core/colors/grey';
import { Link } from 'react-router-dom';

import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import CloseIcon from '@material-ui/icons/Close';
import red from '@material-ui/core/colors/red';
import { render } from '@testing-library/react';

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

function Kaikkilistaus (props) {
    const classes = useStyles();
    const url = 'http://localhost:8080';

    const [viesti, setViesti] = useState('');
    const [open, setOpen] = useState(false);
    const [kysymykset, setKysymykset] = useState(props.kysymykset);
    const [vastaukset, setVastaukset] = useState(props.vastaukset);
    const[vastaus, setValues] = useState({question:'', answer:''});
    const[virhe, setVirhe ] = useState('');
   
   

    const handleClose = () => {
      setOpen(false);
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
   if (kysymykset.length > 0) {

      return (
        
      <div>

        <h2>Valitsemasi komponentit:</h2>
        <Grid container spacing={5}>
  
          
          { vastaukset.map(vastaus => {
         
            return (
                <Grid item key={ vastaus.id }>
                <Card className={ classes.card }>
                    
                    
                    <CardContent>
                    <Typography>Kysymys: {vastaus.question}</Typography>
                      <Typography>{vastaus.answer}</Typography>
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
    }

    return ( <div > {dialog} <Typography>EI TOIMI</Typography></div> )
   
}

export default Kaikkilistaus;
