import React, { useState, useEffect } from "react";
import { useGetUserInfo } from "../Hooks/useGetUserInfo"
import { useNavigate } from "react-router-dom";
import { useAddUserInfo } from "../Hooks/useAddUserInfo";
import { useGetWalletInfo } from "../Hooks/useGetwalletInfo";
import { db } from "../Config/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";


import Finance from "../components/Images/Finance.png"

export default function Register(){
    const { name, userId } = useGetUserInfo();
    const {isAuth} = useGetUserInfo()
    const navigate = useNavigate();
    const [walletName, setWalletName] = useState("")
    const [walletAmount, setWalletAmount] = useState("")
    const { addWalletInfo } = useAddUserInfo();
    const { loading } = useGetWalletInfo(); // Get loading status from useGetWalletInfo hook
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const checkFirestoreForWalletData = async () => {
          // Check if the user has wallet data in Firestore
          const walletQuery = query(collection(db, "Wallets"), where("userId", "==", userId));
          const walletQuerySnapshot = await getDocs(walletQuery);
    
          // If the user is authenticated and has wallet data in Firestore, navigate to dashboard
          if (isAuth && !loading && !walletQuerySnapshot.empty) {
            navigate("/dashboard");
          }
        };
    
        checkFirestoreForWalletData();
      }, [isAuth, loading, userId, navigate]);

      const onSubmit = (e) => {
        e.preventDefault();
      // Validate walletName and walletAmount
      if (!walletName || !walletAmount || isNaN(parseFloat(walletAmount))) {
        setError("Invalid wallet name or wallet amount");
        setTimeout(() => {
          setError(null);
        }, 5000); // Clear error message after 3 seconds
        return;
      }
  
      
        // Call addWalletInfo only if validation passes
        addWalletInfo({
          userId,
          walletName,
          walletAmount,
        });
      
        console.log("Wallet Name:", walletName);
        console.log("Wallet Amount:", walletAmount);
      
        // Reset form fields after submission
        setWalletName("");
        setWalletAmount("");
        
        navigate("/dashboard");
      };
      
     // Store wallet information in local storage
  //localStorage.setItem("selectedWallet", JSON.stringify({ walletId, walletAmount}));
    return(
        <div>
           {/* Display error message if there is an error */}
      {error && <div className="error-message">{error}</div>}
            <div className="top">
                <p> Hi {name},</p>
                <h1> Create New Wallet </h1>
            </div>
            <div className="flex-box">
            <div className="form-container">
                <form onSubmit={onSubmit}>
                
                    <label htmlFor="walletName" className="radio-label">Enter Wallet Name</label>
                    <input 
                        className="input-form"
                        type="text" 
                        id="walletName"
                        placeholder="Enter Wallet Name"
                        name="walletName"
                        value={walletName}
                        onChange={(e) => setWalletName(e.target.value)} />

                    <label htmlFor="walletAmount" className="radio-label">Enter Wallet Amount</label>
                    <input
                        className="input-form" 
                        type="number" 
                        id="walletAmount"
                        placeholder="Enter Wallet Amount"
                        name="walletAmount"
                        value={walletAmount}
                        onChange={(e) => setWalletAmount(e.target.value)} />

                        <button className="continue-btn"> submit </button>
                </form>
            </div>

            <div className="illustrate">
                <img src={Finance} alt="Finance illustration" />
            </div>

            </div>
        </div>
    )
}