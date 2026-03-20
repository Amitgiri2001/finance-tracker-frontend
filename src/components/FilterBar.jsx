import { useState } from "react";
import API from "../services/api";
import { Box, TextField, Button, MenuItem, Paper, Grid } from "@mui/material";

function FilterBar({ setTransactions }) {
  const [filterType, setFilterType] = useState("date");
  //set default date to today in yyyy-mm-dd format
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // yyyy-mm

  const handleFilter = async () => {
    let res;

    if (filterType === "date") {
      res = await API.get(`/date?date=${date}`);
    }

    if (filterType === "week") {
      res = await API.get(`/week?date=${date}`);
    }

    if (filterType === "month") {
      const [year, mon] = month.split("-");
      res = await API.get(`/month?year=${year}&month=${mon}`);
    }

    setTransactions(res.data);
  };

  const resetFilter = async () => {
    //reset all filters
    setDate("");
    setMonth("");
    setFilterType("");
    //fetch all transactions
    const res = await API.get("/all");
    setTransactions(res.data);
  };

  return (
    <Paper sx={{ p: 3, mb: 3, borderRadius: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid size={{ xs: 6, md: 4 }}>
          <TextField
            select
            fullWidth
            label="Filter Type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="month">Month</MenuItem>
          </TextField>
        </Grid>

        {(filterType === "date" || filterType === "week") && (
          <Grid size={{ xs: 6, md: 4 }}>
            <TextField
              fullWidth
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
        )}

        {filterType === "month" && (
          <Grid size={{ xs: 6, md: 4 }}>
            <TextField
              fullWidth
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </Grid>
        )}

        <Grid size={{ xs: 6, md: 4 }}>
          <Button variant="contained" onClick={handleFilter}>
            Apply
          </Button>
          <Button sx={{ ml: 2 }} onClick={resetFilter}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FilterBar;
