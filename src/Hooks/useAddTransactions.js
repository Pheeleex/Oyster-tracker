import { useGetUserInfo } from "./useGetUserInfo";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Config/firebaseConfig"; 


export function useAddTransactions(){
    const { userId } = useGetUserInfo();
    const ExpensesCollectionRef = collection(db, "Expenses")
    const addTransactions = async({transactionName, transactionAmount, transactionType}) => {
        if(!userId){
            console.error("userId is not available")
            return null
        }
        try{
            const transactionData =  {userId,
                                transactionAmount,
                                transactionName, 
                                transactionType,
                                createdAt: serverTimestamp()      
                                    }
            const docRef = await addDoc(ExpensesCollectionRef, transactionData)
            const plainTransactionData = {
                transactionData,
                id: docRef.id
            }
            // Store the transaction data in local storage
            const transactionInfo = JSON.parse(localStorage.getItem("transactions")) || [];
            transactionInfo.push(plainTransactionData);
            localStorage.setItem("transactions", JSON.stringify(transactionInfo));
        }catch(error){
            console.error("Error adding transaction:", error)
            return null
        }
    }
    return { addTransactions };
}