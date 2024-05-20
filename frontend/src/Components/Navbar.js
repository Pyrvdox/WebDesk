import React from "react";
import { Outlet, Link } from "react-router-dom";

const Navbar = () => {
	return (
		<>
			<nav>
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
		</>
	);
}

export default Navbar;