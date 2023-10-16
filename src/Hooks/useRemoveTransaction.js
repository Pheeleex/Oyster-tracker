import { db } from "../Config/firebaseConfig";
import { collection, doc, deleteDoc } from "firebase/firestore";
export function useRemoveTransaction(){
    const ExpensesCollectionRef = collection(db, "Expenses")
   const removeTransaction = async(documentId) => {
        try{
            const transactionDocRef = doc(ExpensesCollectionRef, documentId);
            await deleteDoc(transactionDocRef);
             //Delete from local storage
                console.log("Transaction deleted from firebase successfully", documentId);
                //save to local storage
                const transactionInfo = JSON.parse(localStorage.getItem('transactions')) || []
                const deletedTransaction = transactionInfo.filter(transaction => transaction.id !== documentId)
                localStorage.setItem('transactions',JSON.stringify(deletedTransaction))
                console.log("Transactions deleted from local storage successfully", documentId)
        }catch(error){
            console.error("Error deleting transaction:", documentId, error);
        }
   }
return { removeTransaction }
   
}