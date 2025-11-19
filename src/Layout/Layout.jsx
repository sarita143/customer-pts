import React from "react";
import PropTypes from 'prop-types'
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import Header from "../Components/Header";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      
      <Container sx={{ flex: 1, py: 4 }}>
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          backgroundColor: "#f5f5f5",
          textAlign: "center",
          py: 2,
          mt: "auto",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          © 2025 My React App
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node,
}
