import React, { useState } from 'react'
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import Layout from '../Layout/Layout'
import { createData } from "../utils/apiCall";
import toast from "react-hot-toast";

const CreatePayments = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    payment: "",
    paymentDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    payment: "",
    paymentDate: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("Form Submitted:", formData);
  //   alert("Payment details submitted!");
  //   setFormData({ name: "", email: "", payment: "", paymentDate: "" });
  // };

  const validateData = (data) => {
    let validation = false;
    if (data.name.trim() == "") {
      setError(prev => ({ ...prev, name: "Please update the name field" }));
      validation = true;
    } else {
      setError(prev => ({ ...prev, name: "" }));
    }
    if (data.email.trim() == "") {
      setError(prev => ({ ...prev, email: "Please update the email field" }));
      validation = true;
    } else {
      setError(prev => ({ ...prev, email: "" }));
    }
    if (data.payment.trim() == "") {
      setError(prev => ({ ...prev, payment: "Please update the payment field" }));
      validation = true;
    } else {
      setError(prev => ({ ...prev, payment: "" }));
    }
    if (data.paymentDate.trim() == "") {
      setError(prev => ({ ...prev, paymentDate: "Please update the calendar field" }));
      validation = true;
    } else {
      setError(prev => ({ ...prev, paymentDate: "" }));
    }
    return validation;
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validate = validateData(formData);
      if (validate) {
        return;
      }
      console.log(formData);
      setLoading(true);
      await createData(formData);
      setFormData({
        name: "",
        email: "",
        payment: "",
        paymentDate: "",
      });
      toast.success("Payment created successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Error creating payment");
    }
  };

  return (
    <Layout>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Paper
          elevation={3}
          sx={{
            p: 3,
            width: 400,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" mb={3} fontWeight={600}>
            Payment Form
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              margin="normal"
              size={"small"}
              error={error.name ? true : false}
              helperText={error.name}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              type="email"
              size={"small"}
              error={error.email ? true : false}
              helperText={error.email}
            />
            <TextField
              fullWidth
              label="Payment Amount"
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              margin="normal"
              type="number"
              size={"small"}
              error={error.payment ? true : false}
              helperText={error.payment}
            />
            <TextField
              fullWidth
              label="Payment Date"
              name="paymentDate"
              value={formData.paymentDate}
              onChange={handleChange}
              margin="normal"
              type="date"
              InputLabelProps={{ shrink: true }}
              size={"small"}
              inputProps={{
                max: new Date().toISOString().split("T")[0],
                min: (() => {
                  const d = new Date();
                  d.setMonth(d.getMonth() - 3);
                  return d.toISOString().split("T")[0];
                })(),
              }}
              error={error.paymentDate ? true : false}
              helperText={error.paymentDate}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              type="submit"
              loading={loading}
            >
              Submit
            </Button>
          </form>
        </Paper>
      </Box>
    </Layout>
    // <Layout>
    // <Box
    //   sx={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <Paper
    //     elevation={4}
    //     sx={{
    //       p: 4,
    //       width: 400,
    //       borderRadius: 3,
    //       textAlign: "center",
    //     }}
    //   >
    //     <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
    //       Payment Form
    //     </Typography>

    //     <form onSubmit={handleSubmit}>
    //       <Stack spacing={2}>
    //         <TextField
    //           label="Name"
    //           name="name"
    //           value={formData.name}
    //           onChange={handleChange}
    //           fullWidth
    //           required
    //         />
    //         <TextField
    //           label="Email"
    //           name="email"
    //           type="email"
    //           value={formData.email}
    //           onChange={handleChange}
    //           fullWidth
    //           required
    //         />
    //         <TextField
    //           label="Payment Amount ($)"
    //           name="payment"
    //           type="number"
    //           value={formData.payment}
    //           onChange={handleChange}
    //           fullWidth
    //           required
    //         />
    //         <TextField
    //           label="Payment Date"
    //           name="paymentDate"
    //           type="date"
    //           value={formData.paymentDate}
    //           onChange={handleChange}
    //           fullWidth
    //           InputLabelProps={{ shrink: true }}
    //           required
    //         />
    //         <Button
    //           variant="contained"
    //           color="primary"
    //           type="submit"
    //           fullWidth
    //           sx={{ mt: 1 }}
    //         >
    //           Submit
    //         </Button>
    //       </Stack>
    //     </form>
    //   </Paper>
    // </Box>
    // </Layout>
  )
}

export default CreatePayments