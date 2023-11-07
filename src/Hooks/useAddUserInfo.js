import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";
import { useGetUserInfo } from "./useGetUserInfo";
export function useAddUserInfo(){
  const {userId} = useGetUserInfo()
    const addWalletInfo = async({ walletName, walletAmount }) => {
      const walletsCollectionRef = collection(db, "Wallets")

        try {
          // Create an object with the transaction data
            const walletData ={
            userId,
            walletName,
            walletAmount,
            createdAt: serverTimestamp() 
          };
          const docRef = await addDoc(walletsCollectionRef, walletData)

          console.log("Wallet added with ID: ", docRef.id);
    
          // Store the transaction data in local storage
          const existingWalletInfo = JSON.parse(localStorage.getItem("theWallet")) || [];
          const updatedWalletInfo = [...existingWalletInfo, { id: docRef.id, ...walletData }];
          console.log("existing wallet info:",existingWalletInfo)
          //walletInfo.push(walletData);
          localStorage.setItem("theWallet", JSON.stringify(updatedWalletInfo));
    
          return { walletId: docRef.id, walletAmount };
        } catch (error) {
          console.error("Error adding Wallet:", error);
        }
        console.log(walletAmount)
      };
      //console.log("wallet: " + walletId)
      return { addWalletInfo };
}