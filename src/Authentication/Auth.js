import { useNavigate, Navigate } from "react-router-dom";
import { auth, provider } from "../Config/firebaseConfig";
import { signInWithPopup } from 'firebase/auth';
import { useGetUserInfo } from "../Hooks/useGetUserInfo";
import black from "../components/Images/black-1.png"
import ipad from "../components/Images/ipad.png"


export function Auth(){
    const navigate = useNavigate();
    const { isAuth } = useGetUserInfo();
    const signInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, provider);
            console.log(results);
    
            const authInfo = {
                userId: results.user.uid,
                name: results.user.displayName,
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            console.log("saved to localstsorage", authInfo);

            localStorage.setItem("theWallet", JSON.stringify([]));
    
            navigate("/Register");
        } catch (error) {
            // Handle any errors that occur during authentication
            console.error("Authentication error:", error);
    
            // Close the popup window if it's still open 
            if (error.code === "auth/popup-closed-by-user") {
                // Handle the popup closed by the user
                console.log("Authentication popup closed by the user.");
            } else {
                // Handle other authentication errors
                console.error("Authentication error:", error.message);
            }
        }

        
    if (isAuth) {
        return   <Navigate to="/Register" />;
      }
    else{
        return <Navigate to="/Auth" />;
    }
        
    };
    return(
        <>
             <div className="auth-page">
            <div className="Authentication">
               <h1> Transform Your Money Mindset </h1>
               <p> Revamp your financial habits with Budget Tracker, an intuitive mobile app dedicated to transforming your money mindset. Easily monitor expenses, set monthly targets, and gain insights into spending patterns. Empower yourself to make informed decisions and achieve your financial goals effortlessly.</p>
                <button className="continue-btn" onClick={signInWithGoogle}>
                {" "}
                    Get started with Google
                </button>
            </div>

            <div className="illustrate">
                <img 
                src={black}
                className="black"
                alt="Iphone"
                style={{ position: 'absolute', top: "1.0%", left: "30%", zIndex: 2, width:"65%", bottom:0 }} />

                <img 
                src={ipad}
                className="ipad"
                alt="ipad"
                style={{ position: 'absolute', top: "1.0%", left: "2%", zIndex: 1, width:"75%", bottom:0 }} />
            </div>
        </div>

        <div className="auth-page-2">
            <div>
                <h1>Oyster Tracker illustrates the <br></br> path of your finances.</h1>
            </div>
        </div>
        </> 
    )
}