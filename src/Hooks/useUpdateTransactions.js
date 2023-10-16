import {db} from "../Config/firebaseConfig"
import { doc, updateDoc,  serverTimestamp  } from "firebase/firestore";

export function useUpdateTransactions(){
    const updateTransaction = async (editedTransaction) => {
        try{
            const transactionRef = doc(db, 'Expenses', editedTransaction.id);
            await updateDoc(transactionRef, {
              transactionName: editedTransaction.transactionName,
              transactionAmount: editedTransaction.transactionAmount,
              transactionType: editedTransaction.transactionType,
              updatedAt: serverTimestamp(),
            });
            console.log('Expense updated successfully in Firebase');

            // Update data in Local Storage
      const localStorageData = JSON.parse(localStorage.getItem("transactions")) || [];
      const updatedLocalStorageData = localStorageData.map((transaction) => {
        if (transaction.id === editedTransaction.id) {
          return {
            ...transaction,
            transactionName: editedTransaction.transactionName,
            transactionAmount: editedTransaction.transactionAmount,
            transactionType: editedTransaction.transactionType,
            updatedAt: new Date().toISOString(), // Update the updatedAt field if needed
          };
        }
        return transaction;
      });

      // Save the updated data back to Local Storage
      localStorage.setItem("transactions", JSON.stringify(updatedLocalStorageData));
          }

           catch (error) {
            console.error('Error updating expense in Firebase:', error);
          }
    }
  
    // Return the updateExpenseInFirebase function
  return { updateTransaction };
}