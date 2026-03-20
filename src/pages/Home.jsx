import { useEffect, useState } from "react";
import API from "../services/api";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import { Container, Typography } from "@mui/material";
import FilterBar from "../components/FilterBar";

function Home() {
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    //default filter - today's transactions
    const today = new Date().toISOString().split("T")[0];
    const res = await API.get(`/date?date=${today}`);
    console.log("Print Data: ", res.data);
    setTransactions(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        💰 Finance Tracker
      </Typography>

      <TransactionForm fetchData={fetchData} />
      <FilterBar setTransactions={setTransactions} />
      <TransactionTable data={transactions} fetchData={fetchData} />
    </Container>
  );
}

export default Home;
