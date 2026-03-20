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
} from "@mui/material";

function getColor(type) {
  if (type === "income") return "#e8f5e9"; // light green
  if (type === "expense") return "#fdecea"; // light red
  return "#f5f5f5";
}

function TransactionTable({ data, fetchData }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDelete = async (id) => {
    await API.delete(`/${id}`);
    fetchData();
  };

  const handleUpdate = async (txn) => {
    const updated = {
      ...txn,
      note: txn.note + " (updated)",
    };
    await API.put(`/${txn.id}`, updated);
    fetchData();
  };

  // 📱 MOBILE VIEW (CARDS)
  if (isMobile) {
    return (
      <Box>
        {data.map((txn) => (
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
                <Typography fontWeight="bold">₹ {txn.amount}</Typography>

                <Chip label={txn.type} size="small" />
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

              {/* Actions */}
              <Box mt={1} display="flex" gap={1}>
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
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  // 💻 DESKTOP VIEW (TABLE)
  return (
    <Paper sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" mb={2}>
        Transactions
      </Typography>

      <TableContainer sx={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell>
                  <Chip label={txn.type} />
                </TableCell>
                <TableCell>{txn.category}</TableCell>
                <TableCell>₹ {txn.amount}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default TransactionTable;
