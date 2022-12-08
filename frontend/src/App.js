import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/system';
import { AppBar, Box, Button, Paper, Typography } from '@mui/material';

export default function App() {
  //initial blog setup for useState
  const [rant, setRant] = useState([])
  const [addRant, setAddRant] = useState([])

  //-----------------
  // NAV Buttons
  //-----------------
  const [isRantsVisible, setIsRantsVisible] = useState(true)
  const [isAddARantVisible, setIsAddARantVisible] = useState(false)

  const showRants = () => {
    setIsRantsVisible(true);
    setIsAddARantVisible(false)

  }
  const showAddARant = () => {
    setIsRantsVisible(false);
    setIsAddARantVisible(true)

  }

  return (
    <Container>
      {/* //----Header----// */}
      <Paper>
        <AppBar position="static" sx={{ m: 2, ml: 0, p: 2, bgcolor: 'primary' }}>
          <Typography variant="h3">Blog Rant</Typography>
        </AppBar>
      </Paper>

      <Box align="center" sx={{ m: 2, msl: 5 }}>
        <Button variant={isRantsVisible ? "contained" : "outlined"} color="primary" onClick={showRants} sx={{ mr: 2 }}>Rants</Button>
        <Button variant={isAddARantVisible ? "contained" : "outlined"} color="primary" onClick={showAddARant} sx={{ mr: 2 }}>Add a Rant</Button>
      </Box>





    </Container>
  )
}

