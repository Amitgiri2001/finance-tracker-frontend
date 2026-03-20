import { useState } from "react";
import API from "../services/api";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import Loader from "./Loader";

const types = ["expense", "income", "neutral"];
const categories = [
  "food",
  "travel",
  "shopping",
  "bills",
  "investment",
  "other",
];

function TransactionForm({
  fetchData,
  isEditing = false,
  setIsEditing = null,
  txnData = null,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const txn = isEditing
    ? txnData
    : {
        type: "",
        category: "",
        amount: "",
        date: "",
        time: "",
        note: "",
      };
  const [form, setForm] = useState(txn);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (isEditing) {
      await API.put(`/${txnData.id}`, form);
    } else {
      await API.post("", form);
    }

    setForm({
      type: "",
      category: "",
      amount: "",
      date: "",
      time: "",
      note: "",
    });
    fetchData();
    setIsEditing(false);
  };

  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
      <Typography variant="h6" mb={2}>
        {isEditing ? "Update" : "Add"} Transaction
      </Typography>
      {isLoading && <Loader />}
      {!isLoading && (
        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                fullWidth
                label="Amount"
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                select
                fullWidth
                label="Type"
                name="type"
                value={form.type}
                onChange={handleChange}
              >
                {types.map((t) => (
                  <MenuItem key={t} value={t}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {categories.map((c) => (
                  <MenuItem key={c} value={c}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                fullWidth
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 4 }}>
              <TextField
                fullWidth
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Note"
                name="note"
                value={form.note}
                onChange={handleChange}
              />
            </Grid>

            <Grid
              sx={{ display: "flex", alignItems: "end", justifyContent: "end" }}
              size={{ xs: 12 }}
            >
              <Button
                type="submit"
                onSubmit={handleSubmit}
                variant="contained"
                size="large"
              >
                {isEditing ? "Update" : "Add"} Transaction
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Paper>
  );
}

export default TransactionForm;
