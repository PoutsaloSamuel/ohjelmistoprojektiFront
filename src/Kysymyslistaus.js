
import React, { useState, Component } from 'react';
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
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, StylesProvider, TextField } from '@material-ui/core';


//Kysymyksen omaa tyyliä
const useStyles = makeStyles((theme) => ({
  palette: {
    primary: { main: grey[900], contrastText: '#FFFFFF' },
    secondary: { main: red[900], contrastText: red[900] },
    text: { primary: grey[990], secondary: red[900], fontFamily: 'Arial' },

  },

  card: {
    marginTop: 15,
    maxWidth: 800, minWidth: 400, minHeight: 200,
    color: grey[850],
    padding: 5,
    
  
    
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
function Kysymyslistaus(props) {
  const classes = useStyles();
  const url = 'http://localhost:8080';

  const [viesti, setViesti] = useState('');
  const [open, setOpen] = useState(false);
  const [kysymykset, setKysymykset] = useState(props.kysymykset);
  const [vastaus, setValues] = useState({ question: '', answer: '' });
  const [virhe, setVirhe] = useState('');
  const [vastaukset, setVastaukset] = useState(props.vastaukset);

  const lisaaVastaus = (e) => {
    e.preventDefault();
    const formData = {
      'question': vastaus.question,
      'answer': vastaus.answer,
    };


    Axios.post('http://localhost:8080/vastaus/add', formData)
      .then(response => {
        if (response.status === 200) {
          setValues({ question: '', answer: '' });
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


          {kysymykset.map(kysymys => {
            if (kysymys.content.includes('Radio')) {
              return (
                <Grid item key={kysymys.id}>
                  <Card className={classes.card}>


                    <CardContent>

                      <form method='post'>
                      <label className={classes.input}>Kysymys: </label>
                        <input type='text' className={classes.input} name='question' id='question' value={kysymys.content} onClick={(e) => muuta(e)} /><br />

                        <label htmlFor='answer'>Vastaus: </label>
                        <FormControl component="fieldset" >
                          <FormLabel component="legend" required id="standard-required">Anna arvo välillä 1-5:</FormLabel>
                          <RadioGroup row aria-label="answer" name="answer" 
                            onChange={(e) => muuta(e)} >
                            <FormControlLabel value="1" control={<Radio />} label="1" />
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                            <FormControlLabel value="5" control={<Radio />} label="5" />
                          </RadioGroup>
                        </FormControl><br/>

                        <button type='button' onClick={(e) => lisaaVastaus(e)}>Lisää</button>

                      </form>
                    </CardContent>
                    
                  </Card>

                </Grid>
              )
            } else if (kysymys.content.includes('Number')) {
              return (
                <Grid item key={kysymys.id}>
                  <Card className={classes.card}>


                    <CardContent>

                      <form method='post'>
                      <label className={classes.input}>Kysymys: </label>
                        <input className={classes.input} type='text' name='question' id='question' value={kysymys.content} onClick={(e) => muuta(e)} /><br />

                        <label htmlFor='answer'>Answer: </label>
                        <TextField
                          id="answer"
                          name="answer"
                          
                          onChange={(e) => muuta(e)}
                          label="Anna arvo:"
                          type="number"
                          
                        /><br/>

                        <button type='button' onClick={(e) => lisaaVastaus(e)}>Lisää</button>

                      </form>
                    </CardContent>
                    
                  </Card>

                </Grid>
              )
            } else {
              return (
                <Grid item key={kysymys.id}>
                  <Card className={classes.card}>


                    <CardContent>

                      <form method='post'>
                      <label className={classes.input} >Kysymys: </label>
                        <input className={classes.input} type='text' name='question' id='question' value={kysymys.content} onClick={(e) => muuta(e)} /><br />

                        <label htmlFor='answer'>Answer: </label>
                        <input type='text' name='answer' onChange={(e) => muuta(e)} /><br />

                        <button type='button' onClick={(e) => lisaaVastaus(e)}>Lisää</button>

                      </form>
                    </CardContent>
                    
                  </Card>

                </Grid>
              )
            }

          })}

        </Grid>


      </div>
    )
  }

  return (<div > {dialog} <Typography>EI TOIMI</Typography></div>)

}

export default Kysymyslistaus;
