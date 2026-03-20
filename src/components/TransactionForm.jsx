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

const types = ["expense", "income", "neutral"];
const categories = ["Food", "Travel", "Shopping", "Bills", "Investment"];

function TransactionForm({ fetchData }) {
  const [form, setForm] = useState({
    type: "",
    category: "",
    amount: "",
    date: "",
    time: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("", form);
    setForm({
      type: "",
      category: "",
      amount: "",
      date: "",
      time: "",
      note: "",
    });
    fetchData();
  };

  return (
    <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
      <Typography variant="h6" mb={2}>
        Add Transaction
      </Typography>

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
                  {t}
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
                  {c}
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
              Add Transaction
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default TransactionForm;
