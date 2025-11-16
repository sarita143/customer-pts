import React from 'react'
import { AppBar, Toolbar, Typography, Button, Box, Container } from "@mui/material";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
                <Container>
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Customer Rewards
                        </Typography>
                        <Box>
                            <Button to="/" component={Link} color="inherit" sx={{ px: 2 }}>Dashboard</Button>
                            <Button to="/create-payments" component={Link} color="inherit" sx={{ px: 2 }}>Create Payments</Button>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

export default Header