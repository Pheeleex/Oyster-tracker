import { useGetUserInfo } from "../Hooks/useGetUserInfo";
import { useAddTransactions } from "../Hooks/useAddTransactions";
import { useGetWalletInfo } from "../Hooks/useGetwalletInfo";
import { useRemoveTransaction } from "../Hooks/useRemoveTransaction";
import React, { useState, useCallback } from "react";
import { useUpdateTransactions } from "../Hooks/useUpdateTransactions";
import { useGetWallet } from "../Hooks/useGetWallet";


export default function Dashboard(){
    const { name, userId } = useGetUserInfo();
    const {addTransactions} = useAddTransactions()
    const { transactions, transactionTotals } = useGetWalletInfo()
    const {removeTransaction} = useRemoveTransaction()
    const {updateTransaction} = useUpdateTransactions()
    const {handleUpdateTransaction} = useGetWalletInfo()
    const {walletData} = useGetWallet()

    //state variables for expense/income
    const [transactionName, settransactionName] = useState("");
    const [transactionAmount, settransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");
    const [editTransaction, setEditTransaction] = useState(null)
  

     // Function to populate form data when the "Edit" icon is clicked
    const populateFormData = (transaction, id) => {
        setEditTransaction(transaction);
        settransactionName(transaction.transactionName); 
        settransactionAmount(transaction.transactionAmount); 
        setTransactionType(transaction.transactionType); 
        console.log("Editing transaction ID:", id);
      console.log("Editing transaction data:", transaction);
      };


        
  
        //submit form logics
        const onSubmit = async (e) => {
           e.preventDefault() 
           if (editTransaction) {
            // Update the existing expense
            const updatedTransaction = {
              id: editTransaction.id,
              transactionName: transactionName,
              transactionAmount: transactionAmount,
              transactionType: transactionType,
            };
            console.log(editTransaction.id)
           updateTransaction(updatedTransaction);
            handleUpdateTransaction(updatedTransaction);
            console.log("transaction updated:", editTransaction.id)
            console.log("transaction updated:", editTransaction.transactionAmount)
        
            // Clear the form and reset editedExpense
            settransactionName('');
            settransactionAmount('');
            setTransactionType('expense');
            setEditTransaction(null);
          } 
              else{
                try
                {await addTransactions({
                transactionName,
                transactionAmount,
                transactionType
            });
            // Clear the form
            settransactionName("");
            settransactionAmount("");
            setTransactionType("expense");
            }catch(error){
              console.error("Error adding transaction:", error);
            }
          }
      }

        const handleDelete = useCallback((ExpenseId) => {
            removeTransaction(ExpenseId);
          },[removeTransaction]);

         
        
    return(
        <div className="dashboard">
            <div className="top">
            <h2> Hello {name},</h2>
            {walletData.filter(wallet => wallet.userId === userId).map((wallet) => {
          const { id, walletName, walletAmount } = wallet;
          return (
            <div key={id}>
              <h3 className="wallet-name">
                {walletName} wallet - ${walletAmount}
              </h3>
            </div>
          );
        })}
        <div className="transactions">
            <div className="balance-cont">
                <i class="bi bi-wallet-fill"></i>
                <h3 className="balance">Balance <br></br> ${transactionTotals.balance}</h3>
            </div>
            <div className="income-expense">
                <div className="in">
                    <i class="bi bi-currency-exchange"> </i>
                    <h3 className="income"> Income: ${transactionTotals.income} </h3>
                </div>
               <div className="exp">
                    <i class="bi bi-receipt"></i>
                    <h3 className="expense"> Expense: ${transactionTotals.expense} </h3>
               </div>
        </div>
        </div>
            </div>

            <div className="cards-container">
                <div className="flex-cards">
                    {transactions.map((transaction) => {
                        const {id, transactionAmount, transactionName, transactionType} = transaction;
                        return(<div key={id}
                                    className={`cards ${transaction.transactionType === "income" ? 
                                    "income-cards" : "expense-cards"}`}>
                                <p className="transaction-amt">${transactionAmount}</p>
                                <p className="transaction-name">{transactionName}</p>
                                <h3>{transactionType}</h3>
                                <div className="icons">
                                    <i class="bi bi-pencil-square" 
                                    style ={{fontSize: "1.5rem", cursor: "pointer"}}
                                    onClick={()=>populateFormData(transaction, transaction.id)} ></i>
                                    <i class="bi bi-trash-fill" 
                                    style ={{fontSize: "1.5rem", cursor: "pointer"}}
                                    onClick={()=>handleDelete(transaction.id)}></i>
                                </div>
                                </div>)
                    })
                        }
                </div>
            </div>
            <div className="form-container dashboard-form">
                <form onSubmit={onSubmit}>
                
                    <label htmlFor="walletName">Enter transaction Name</label>
                    <input 
                        className="input-form"
                        type="text" 
                        id="transactionName"
                        placeholder="Enter transaction Name"
                        name="transactionName"
                        value={transactionName}
                        onChange={(e)=>settransactionName(e.target.value)} 
                        />

                    <label htmlFor="walletAmount">Enter transaction Amount</label>
                    <input
                        className="input-form" 
                        type="number" 
                        id="transactionAmount"
                        placeholder="Enter transaction Amount"
                        name="transactionAmount"
                        value={transactionAmount}
                        onChange={(e)=>settransactionAmount(e.target.value)} 
                        />

                      <input
                        className="radio" 
                        type="radio" 
                        id="expense"
                        name="expense"
                        value= "expense"
                        checked = {transactionType === "expense"}
                        onChange={(e)=>setTransactionType(e.target.value)} 
                        />
                        <label htmlFor="expense" className="radio-label">Expense
                    </label>
                   
                    <input
                        className="radio" 
                        type="radio" 
                        id="income"
                        name="income"
                        value="income"
                        checked = {transactionType === "income"}
                       onChange={(e)=>setTransactionType(e.target.value)}
                       />
                       <label htmlFor="income" className="radio-label">Income
                    </label>

                        <button className="add-button"> submit </button>
                </form>
                

            </div>    
        </div>
    )
}
       
