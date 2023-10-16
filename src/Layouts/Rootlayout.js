import {useLocation, Outlet} from "react-router-dom"
import { useNavigate } from "react-router-dom";


export default function RootLayout(){
    const navigate = useNavigate(); 
    const location = useLocation();

    const signUserOut = () => {
        try{
            localStorage.removeItem("auth")
            navigate("/")
        }catch(err){
            console.error(err)
        }
    }

    // Determine whether to display the Sign Out button based on the current route
    const isAuthPage = location.pathname === '/';


    return(
        <div className="root-layout">
            <header>
                <nav>
                    <div className="logo">
                    <i className="bi bi-cash-coin"></i>
                    <h3>Oyster Finance</h3>
                    </div>
                    <div className="btn-container">
                    {!isAuthPage && (
                            <button className="add-button" onClick={signUserOut} style={{ marginTop: '0px' }}>
                                Sign Out
                            </button>
                        )}
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}