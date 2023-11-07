import { useEffect, useState } from "react";
import { useGetUserInfo } from "./useGetUserInfo";
import { collection, query, onSnapshot, where, orderBy } from "firebase/firestore";
import { useGetWallet } from "./useGetWallet";
import { db } from "../Config/firebaseConfig";

export function useGetWalletInfo() {
  const { userId } = useGetUserInfo();
  const [transactions, setTransactions] = useState([]);
  const { walletData, loading: walletLoading } = useGetWallet(); // Extract loading state from useGetWallet
  const [loading, setLoading] = useState(true);
  const [transactionTotals, setTransactionTotals] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });

  useEffect(() => {
    if (!walletLoading) {
      // Filter walletData by userId
      const userWallets = walletData.filter((wallet) => wallet.userId === userId);

     // Calculate initial wallet amount based on user's wallet data
      const initialWalletAmount = userWallets.reduce(
        (total, wallet) => total + parseFloat(wallet.walletAmount),
        0
      );

      const ExpensesCollectionRef = collection(db, "Expenses");
      let unsubscribe;

      try {
        const queryTransactions = query(
          ExpensesCollectionRef,
          where("userId", "==", userId),
          orderBy("createdAt")
        );

        unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
          let docs = [];
          let totalIncome = 0;
          let totalExpense = 0;

          snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            docs.push({ ...data, id });

            if (data.transactionType === "income") {
              totalIncome += Number(data.transactionAmount);
            } else {
              totalExpense += Number(data.transactionAmount);
            }
          });

          setTransactions(docs);

          let newBalance = initialWalletAmount + totalIncome - totalExpense;

          setTransactionTotals({
            balance: newBalance,
            income: totalIncome,
            expense: totalExpense,
          });
        });
      } catch (err) {
        console.error(err);
      }

      setLoading(false); // Set loading state to false after everything is loaded
      return () => unsubscribe();
    }
  }, [userId, walletData, walletLoading]);

  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === updatedTransaction.id ? updatedTransaction : transaction
      )
    );
  };

  return { transactions, transactionTotals, handleUpdateTransaction, loading };
}
