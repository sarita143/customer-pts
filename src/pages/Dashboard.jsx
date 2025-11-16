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
    </>
  )
}

export default Dashboard