import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'


import { Typography, Grid, Box, TextField, Container, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttonProgress: {
    color: theme.palette.primary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  wrapper: {
    position: 'relative',
  },
  formControl1: {
    minWidth: 190,
    marginTop: "1rem",

  },
  formControl2: {
    minWidth: 190,

  },
}));

export default function ProfileForm({ prevStep, handleChange, handleSubmit, values }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  const handleButtonClick = (event) => {
    event.preventDefault()

    setLoading(true);

    if (values.firstName === '' || values.lastName === '' || values.username === '') {
      setLoading(false);
      setOpen(true)
      setMessage("Please Enter All Details")
    }
    else {

      axios.post("http://localhost:8000/register",
        {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          username: values.username,
          password: values.password,
          confirmPassword: values.confirmPassword
        })
        .then((res) => {
          history.push('/');
          console.log("hey");

        })
        .catch((err) => {
          console.log(err)
        })

    }

  };


  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Enter Personal Details
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoFocus
            value={values.firstName}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="lastName"
            label="Last Name"
            id="lastName"

            value={values.lastName}
            onChange={handleChange}

          />

          <Grid container spacing={3}>



            <Grid item xs={12} sm={6}>
              <Button fullWidth onClick={() => prevStep()} variant="contained" color="primary">Back</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button fullWidth type="submit" variant="contained" color="primary" onClick={handleButtonClick}> Submit</Button>
            </Grid>
          </Grid>

        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>






  );
}