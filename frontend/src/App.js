import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/system';
import { AppBar, Box, Button, Card, CardContent, Grid, Paper, Typography } from '@mui/material';

export default function App() {
  //initial blog setup for useState
  const [rant, setRant] = useState([])
  const [addRant, setAddRant] = useState([])

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
  // GET requests to API
  // const getRants = async () => {
  //   const response = await 
  //   axios
  //   .get('http://localhost:3000/blog')
  //   .catch((err) => {
  //     console.log(err)
  //   })
  //   setRant(response.data.results)

  //   const getAddRant = () => {
  //     axios
  //     .get('http://localhost:3000/blog')
  //     .then((response) => {
  //       setAddRant(response.data.results);
  //     })
  //   }
  useEffect(() => {
    axios.get('http://localhost:3000/getpets').then((response) => {
      setRant(response.data)
    })
  }, [])

  return (
    <Container>
      {/* //----Header----// */}
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
          && rant.map((character, index) => {
            return (
              <Card sx={{ width: { sm: 600 }, m: 1 }} elevation={7} key={rant.id}>
                {/* <CardMedia sx={{ height: 130 }}
                    component="img"
                    image={rant.image}
                    height="140">
                  </CardMedia> */}
                <CardContent>
                  <Typography>Title: {rant.title}</Typography>
                  <Typography>Date Written: {rant.date}</Typography>
                  <Typography>Rant: {rant.content}</Typography>
                </CardContent>
              </Card>
            )
          }
          )}
      </Grid>




    </Container>
  )
}

