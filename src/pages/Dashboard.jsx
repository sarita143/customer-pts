import React, {useState, useEffect} from 'react'
import Layout from '../Layout/Layout'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { Link } from 'react-router-dom';
import toast from "react-hot-toast";
import { getData } from "../utils/apiCall";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// const data = [
//   { id: 1, name: "Sarita Joshi", points: 120 },
//   { id: 2, name: "Pooja Joshi", points: 85 },
//   { id: 3, name: "Pretti Joshi", points: 200 },
// ];

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getData();
      console.log(res);
      setData(res);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Layout>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
      >
        <Typography variant="h5" fontWeight={600}>
          Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/create-payments"
        >
          Add New Payments
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Name</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Payment</strong>
              </TableCell>
              <TableCell>
                <strong></strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ py: 4 }} align="center">
                  Loading.....
                </TableCell>
              </TableRow>
            ) : data?.length <= 0 ? (
              <TableRow>
                <TableCell colSpan={5} sx={{ py: 4 }} align="center">
                  No data available.
                </TableCell>
              </TableRow>
            ) : (
              data?.map((row, key) => (
                <TableRow key={key}>
                  <TableCell sx={{ py: 1 }}>{key + 1}</TableCell>
                  <TableCell sx={{ py: 1 }}>{row.name}</TableCell>
                  <TableCell sx={{ py: 1 }}>{row.email}</TableCell>
                  <TableCell sx={{ py: 1 }}>{row.payment}</TableCell>
                  <TableCell sx={{ py: 1 }}>
                    <IconButton
                      component={Link}
                      to={`/customer-details/${row?.email}`}
                    >
                      <ChevronRightIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
    {/* <Layout>
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Customer Rewards
        </Typography>

        <Button variant="contained" color="primary" component={Link} to="/create-payments">
          Add New
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Payments</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>$ {row.points}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </Layout> */}
    </>
  )
}

export default Dashboard