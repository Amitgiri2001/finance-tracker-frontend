import API from "../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  Chip,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  Box,
  TableContainer,
  Modal,
  CircularProgress,
} from "@mui/material";
import TransactionForm from "./TransactionForm";
import { useState } from "react";
import Loader from "./Loader";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

function getColor(type) {
  if (type === "income") return "#e8f5e9"; // light green
  if (type === "expense") return "#fdecea"; // light red
  return "#f5f5f5";
}

function TransactionTable({ data, fetchData, isLoading }) {
  const [isTxnEditing, setIsTxnEditing] = useState(false);
  const [txnData, setTxnData] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // isLoading = true;
  const handleDelete = async (id) => {
    await API.delete(`/txn/${id}`);
    fetchData();
  };

  const handleUpdate = async (txn) => {
    setIsTxnEditing(true);
    setTxnData(txn);
  };
  //Calculate sum of all expenses & avg spending per day
  let totalExpense = 0;
  let countDays = new Set();
  data.forEach((txn) => {
    if (txn.type === "expense") {
      totalExpense += parseFloat(txn.amount);
      countDays.add(txn.date);
    }
  });
  const avgSpendingPerDay =
    countDays.size > 0 ? totalExpense / countDays.size : 0;
  // 📱 MOBILE VIEW (CARDS)
  if (isMobile) {
    return (
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" mb={2}>
          Transactions
        </Typography>
        <EditTransaction />
        <Typography variant="subtitle1" mb={2}>
          Total Expense: ₹ {totalExpense.toFixed(2)} | Avg Spending/Day: ₹{" "}
          {avgSpendingPerDay.toFixed(2)}
        </Typography>

        {isLoading ? (
          <Loader />
        ) : (
          data.map((txn) => (
            <Card
              key={txn.id}
              sx={{
                mb: 2,
                borderRadius: 3,
                backgroundColor: getColor(txn.type),
                boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              }}
            >
              <CardContent>
                {/* Top Row */}
                <Box display="flex" justifyContent="space-between">
                  <Typography fontSize="1.5rem" fontWeight="bold">
                    ₹ {txn.amount}
                  </Typography>
                  <Box>
                    <ModeEditIcon
                      fontSize="small"
                      sx={{ cursor: "pointer", paddingRight: 1 }}
                      onClick={() => handleUpdate(txn)}
                    />
                    <DeleteIcon
                      fontSize="small"
                      color="error"
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleDelete(txn.id)}
                    />
                  </Box>
                </Box>

                {/* Category */}
                <Typography variant="body2" color="text.secondary">
                  {txn.category}
                </Typography>

                {/* Date + Time */}
                <Typography variant="caption">
                  {txn.date} • {txn.time}
                </Typography>

                {/* Note */}
                <Typography sx={{ mt: 1 }}>{txn.note}</Typography>
              </CardContent>
            </Card>
          ))
        )}
      </Paper>
    );
  }

  // 💻 DESKTOP VIEW (TABLE)
  return (
    <>
      <EditTransaction />
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h6" mb={2}>
          Transactions
        </Typography>
        {/* Display sum and avg spending per day */}
        <Typography variant="subtitle1" mb={2}>
          Total Expense: ₹ {totalExpense.toFixed(2)} | Avg Spending/Day: ₹{" "}
          {avgSpendingPerDay.toFixed(2)}
        </Typography>
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Note</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            {/* Add a spinner while loading */}
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Loader />
                  </TableCell>
                </TableRow>
              ) : (
                data.map((txn) => (
                  <TableRow key={txn.id} sx={{ bgcolor: getColor(txn.type) }}>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      ₹ {txn.amount}
                    </TableCell>
                    <TableCell>{txn.category}</TableCell>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>{txn.time}</TableCell>
                    <TableCell>{txn.note}</TableCell>

                    <TableCell>
                      <Button size="small" onClick={() => handleUpdate(txn)}>
                        Edit
                      </Button>

                      <Button
                        size="small"
                        color="error"
                        onClick={() => handleDelete(txn.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );

  function EditTransaction() {
    return (
      <Modal open={isTxnEditing} onClose={() => setIsTxnEditing(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
          }}
        >
          <TransactionForm
            fetchData={fetchData}
            isEditing={isTxnEditing}
            setIsEditing={setIsTxnEditing}
            txnData={txnData}
          />
        </Box>
      </Modal>
    );
  }
}

export default TransactionTable;
