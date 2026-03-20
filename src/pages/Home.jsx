import { useEffect, useState } from "react";
import API from "../services/api";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import { Container, Typography } from "@mui/material";
import FilterBar from "../components/FilterBar";

function Home() {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    setIsLoading(true);
    //default filter - today's transactions
    const today = new Date().toISOString().split("T")[0];
    const res = await API.get(`/date?date=${today}`);
    setTransactions(res.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" mb={3} fontWeight="bold">
        💰 Finance Tracker
      </Typography>

      <TransactionForm
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        fetchData={fetchData}
      />
      <FilterBar
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setTransactions={setTransactions}
      />
      <TransactionTable
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        data={transactions}
        fetchData={fetchData}
      />
    </Container>
  );
}

export default Home;
