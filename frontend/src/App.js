import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from '@mui/system';
import { AppBar, Paper, Typography } from '@mui/material';

export default function App() {
  return (
    <Container>
      {/* //----Header----// */}
      <Paper>
        <AppBar position="static" sx={{ m: 2, ml: 0, p: 2, bgcolor: 'blue' }}>
          <Typography variant="h3">Blog Rant</Typography>
        </AppBar>
      </Paper>

    </Container> 
  )
}

