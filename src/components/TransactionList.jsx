function TransactionList({ transactions }) {
  return (
    <div>
      <h2>Transaction List</h2>
      {transactions.map((txn) => (
        <div key={txn.id}>
          <p>
            {txn.category} - ₹{txn.amount}
          </p>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;
