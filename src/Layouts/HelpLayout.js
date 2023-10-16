import { NavLink, Outlet } from "react-router-dom"
export default function HelpLayout(){
    return(
        <div className="help-layout">
            <h1> This is where you get help</h1>
            <nav>
        <NavLink to="faq">View the FAQ</NavLink>
        <NavLink to="contact">Contact Us</NavLink>
      </nav>
      <Outlet />
        </div>
    )
}