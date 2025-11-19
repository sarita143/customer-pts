import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import Layout from "../Layout/Layout";
import { useDataContext } from "../context/useDataContext";
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
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Dashboard = () => {
  const { dashboardData, loading, fetchDashboardData } = useDataContext();

  const fetchData = useCallback(async () => {
    await fetchDashboardData();
  }, [fetchDashboardData]);

  useEffect(() => {
    if (dashboardData.length === 0) {
      fetchData();
    }
  }, [fetchData, dashboardData.length]);

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
              ) : dashboardData?.length <= 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ py: 4 }} align="center">
                    No data available.
                  </TableCell>
                </TableRow>
              ) : (
                dashboardData?.map((row, key) => (
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
  );
};

export default Dashboard;

Dashboard.propTypes = {};
