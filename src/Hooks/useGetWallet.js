import { useEffect, useState } from "react";
import { useGetUserInfo } from "./useGetUserInfo";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";

export function useGetWallet() {
  const { userId } = useGetUserInfo();
  const [walletData, setWalletData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const walletsCollectionRef = collection(db, "Wallets");
    const unsubscribe = onSnapshot(walletsCollectionRef, (snapshot) => {
      const wallets = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setWalletData(wallets);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

 
  return { walletData, loading };
}
