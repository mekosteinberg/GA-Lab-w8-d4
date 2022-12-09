import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/system';
import { AppBar, Box, Button, Card, CardActions, CardContent, CardMedia, FormGroup, Grid, Modal, Paper, stepContentClasses, TextField, Typography } from '@mui/material';

//from MUI Modal docs
const modalstyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};


const App = () => {
  //initial blog setup for useState
  const [rants, setRants] = useState([
    // {title: '',
    // date: '',
    // image: '',
    // content: ''}
  ])
  const [addRant, setAddRant] = useState([])
  const [showModal, setShowModal] = useState(false)
  //-----------------
  // NAV Buttons
  //-----------------
  const [areRantsVisible, setAreRantsVisible] = useState(true)
  const [isAddARantVisible, setIsAddARantVisible] = useState(false)

  const showRants = () => {
    setAreRantsVisible(true);
    setIsAddARantVisible(false)
  }
  const showAddARant = () => {
    setAreRantsVisible(false);
    setIsAddARantVisible(true)
  }

  const [rantTitle, setRantTitle] = useState('')
  const [rantDate, setRantDate] = useState('')
  const [rantImage, setRantImage] = useState('')
  const [rantContent, setRantContent] = useState('')
  const [rantId, setRantId] = useState('')

  const resetForm = () => {
    // console.log('reset')
    setRantTitle('')
    setRantDate('')
    setRantImage('')
    setRantContent('')
  }

  // ADD A RANT
  const handleNewRantFormSubmit = (event) => {
    // console.log('submit')
    event.preventDefault()
    axios
      .post('http://localhost:3000/blog', {
        title: rantTitle,
        date: rantDate,
        image: rantImage,
        content: rantContent
      })
      .then(() => {
        resetForm()
        axios
          .get('http://localhost:3000/blog')
          .then((response) => {
            setRants(response.data)
          })
      })
  }

  const handleChange = (setState) => (event) => {
    setState(event.target.value)
  }


  //EDIT
  const editRant = (rant) => () => {
    setShowModal(true)
    setRantTitle(rant.title)
    setRantDate(rant.date)
    setRantImage(rant.image)
    setRantContent(rant.content)
    setRantId(rant._id)
  }

  const handleEditRantFormSubmit = (event) => {
    event.preventDefault()
    axios.put('http://localhost:3000/blog/' + rantId, {
      title: rantTitle,
      date: rantDate,
      image: rantImage,
      content: rantContent,
    })
      .then(() => {
        resetForm()
        setShowModal(false)
        axios
          .get('http://localhost:3000/blog')
          .then((response) => {
            setRants(response.data)
          })
      })
  }

  //DELETE
  const deleteRant = (rant) => (event) => {
    event.preventDefault()
    axios
      .delete('http://localhost:3000/blog/' + rant._id)
      .then(() => {
        axios
          .get('http://localhost:3000/blog')
          .then((response) => {
            setRants(response.data)
          })
      })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/blog').then((response) => {
      setRants(response.data)
      setAddRant(response.data)
    })

  }, [])
      
  return (

    <Container>

      <Paper>
        <AppBar position="static" sx={{ m: 2, ml: 0, p: 2, bgcolor: 'primary' }}>
          <Typography variant="h3">Blog Rant</Typography>
        </AppBar>
      </Paper>

      <Box align="center" sx={{ m: 2, msl: 5 }}>
        <Button variant={areRantsVisible ? "contained" : "outlined"} color="primary" onClick={showRants} sx={{ mr: 2 }}>Rants</Button>
        <Button variant={isAddARantVisible ? "contained" : "outlined"} color="primary" onClick={showAddARant} sx={{ mr: 2 }}>Add a Rant</Button>
      </Box>

      <Grid container className="rantList">
        {areRantsVisible
          && rants.map((rant, index) => {
            return (
              <Card sx={{ m: 1 }} elevation={7} key={rant._id}>
                <CardMedia sx={{ height: 300 }}
                  component="img"
                  image={rant.image}
                  height="140">
                </CardMedia>
                <CardContent>
                  <Typography>Title: {rant.title}</Typography>
                  <Typography>Date Written: {rant.date}</Typography>
                  <Typography>Rant: {rant.content}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={editRant(rant)}>Edit</Button>
                  <Button size="small" onClick={deleteRant(rant)}>Erase</Button>
                </CardActions>
              </Card>
            )
          }
          )}
      </Grid>

      <Grid align="center">
        {isAddARantVisible 
          && 
              <Paper align="left" sx={{ width: { sm: 750 }, m: 1 }} elevation={4}>
                <FormGroup>
                  <Typography sx={{ mt: 2, p: 2 }} variant="h5"><strong>RANT AWAY!</strong></Typography>
                  <form onSubmit={handleNewRantFormSubmit}>
                    <TextField
                      sx={{ m: 1, p: 1 }}
                      onChange={handleChange(setRantTitle)}
                      id="outlined-basic"
                      label="Title"
                      variant="outlined"
                      value={rantTitle} />
                    <TextField
                      sx={{ m: 1, p: 1 }}
                      onChange={handleChange(setRantDate)}
                      id="outlined-basic"
                      label="Date"
                      variant="outlined"
                      value={rantDate} />
                    <TextField sx={{ m: 1, p: 1 }}
                      onChange={handleChange(setRantImage)}
                      id="outlined-basic"
                      label="Image"
                      variant="outlined"
                      value={rantImage} />
                    <TextField
                      sx={{ m: 1, p: 1 }}
                      onChange={handleChange(setRantContent)}
                      id="outlined-multiline-flexible"
                      label="Content"
                      variant="outlined"
                      value={rantContent} />
                    <Button
                      sx={{ m: 2 }}
                      variant="contained"
                      type="submit"
                      color="secondary"
                    >Submit</Button>
                  </form>
                </FormGroup>
              </Paper>
        }
      </Grid>

      <Modal
        open={showModal}
        onClose={() => { setShowModal(false) }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalstyle}>
          <FormGroup>
            <Typography sx={{ mt: 2, p: 2 }} variant="h5"><strong>Edit</strong></Typography>
            <form onSubmit={handleEditRantFormSubmit}>
              <TextField
                sx={{ m: 1, p: 1 }}
                onChange={handleChange(setRantTitle)}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                value={rantTitle} />
              <TextField
                sx={{ m: 1, p: 1 }}
                onChange={handleChange(setRantDate)}
                id="outlined-basic"
                label="Date"
                variant="outlined"
                value={rantDate} />
              <TextField sx={{ m: 1, p: 1 }}
                onChange={handleChange(setRantImage)}
                id="outlined-basic"
                label="Image"
                variant="outlined"
                value={rantImage} />
              <TextField
                sx={{ m: 1, p: 1 }}
                onChange={handleChange(setRantContent)}
                id="outlined-basic"
                label="Content"
                variant="outlined"
                value={rantContent} />
              <Button
                sx={{ m: 2 }}
                variant="contained"
                type="submit"
                color="secondary"
              >Submit</Button>
            </form>
          </FormGroup>
        </Box>
      </Modal>

    </Container>
  )
}

export default App;
