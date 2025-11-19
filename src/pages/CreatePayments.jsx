import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDataContext } from "../context/useDataContext";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import Layout from "../Layout/Layout";
import toast from "react-hot-toast";

const CreatePayments = () => {
  const { createPayment } = useDataContext();

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

  const fields = [
    {
      key: "name",
      label: "Name",
      type: "text",
      errorMsg: "Please update the name field",
    },
    {
      key: "email",
      label: "Email",
      type: "email",
      errorMsg: "Please update the email field",
    },
    {
      key: "payment",
      label: "Payment Amount",
      type: "number",
      errorMsg: "Please update the payment field",
    },
    {
      key: "paymentDate",
      label: "Payment Date",
      type: "date",
      errorMsg: "Please update the calendar field",
      extraProps: {
        InputLabelProps: { shrink: true },
        inputProps: {
          max: new Date().toISOString().split("T")[0],
          min: (() => {
            const d = new Date();
            d.setMonth(d.getMonth() - 3);
            return d.toISOString().split("T")[0];
          })(),
        },
      },
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateData = (data) => {
    let hasError = false;
    let newErrors = { ...error };

    fields.forEach((field) => {
      if (!data[field.key]?.trim()) {
        newErrors[field.key] = field.errorMsg;
        hasError = true;
      } else {
        newErrors[field.key] = "";
      }
    });

    setError(newErrors);
    return hasError;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const validated = validateData(formData);
      if (validated) return;

      setLoading(true);
      await createPayment(formData);

      setFormData({
        name: "",
        email: "",
        payment: "",
        paymentDate: "",
      });

      toast.success("Payment created successfully");
      setLoading(false);
    } catch {
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
            {fields.map((field) => (
              <TextField
                key={field.key}
                fullWidth
                label={field.label}
                name={field.key}
                type={field.type}
                value={formData[field.key]}
                onChange={handleChange}
                margin="normal"
                size="small"
                error={Boolean(error[field.key])}
                helperText={error[field.key]}
                {...(field.extraProps || {})}
              />
            ))}

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
  );
};

export default CreatePayments;

CreatePayments.propTypes = {};
