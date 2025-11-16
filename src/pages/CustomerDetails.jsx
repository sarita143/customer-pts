import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import toast from "react-hot-toast";
import { getDataByEmail } from "../utils/apiCall";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { calculateRewardPoints } from "../utils/helpers";

const CustomerDetails = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const { email } = useParams();

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getDataByEmail(email);
      setUserData(res);
      setLoading(false);
      console.log(res);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch user data");
      setError(error?.data?.error || "An unexpected error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalAmount = userData?.payments?.reduce(
    (sum, item) => sum + Number(item.payment),
    0
  );
  const totalRewardPoints = userData?.payments?.reduce(
    (sum, item) => sum + calculateRewardPoints(item.payment),
    0
  );

  return (
    <>
      <Layout>
        {loading ? (
          <>
            <Box sx={{ textAlign: "center" }}>
              <h2>Loading...</h2>
            </Box>
          </>
        ) : error ? (
          <>
            <h3 style={{ textAlign: "center" }}>{error}</h3>
          </>
        ) : (
          <Box>
            <h2>Customer Details Page</h2>
            <p>Name: {userData?.name}</p>
            <p>Email: {userData?.email}</p>

            <Box>
              <h3>Total Amount: ${totalAmount}</h3>
              <h3>Total Reward Points: {totalRewardPoints}</h3>
              {userData?.payments && userData?.payments?.length > 0 ? (
                userData?.payments?.map((payment, index) => (
                  <Box
                    key={index}
                    sx={{ mb: 2, p: 2, border: "1px solid #ccc" }}
                  >
                    <p>Amount: ${payment.payment}</p>
                    <p>
                      Date:{" "}
                      {new Date(payment.paymentDate)?.toLocaleDateString()}
                    </p>
                    <p>
                      Reward Point: {calculateRewardPoints(payment?.payment)}
                    </p>
                  </Box>
                ))
              ) : (
                <p>No payments found.</p>
              )}
            </Box>
          </Box>
        )}
      </Layout>
    </>
  );
};

export default CustomerDetails;
