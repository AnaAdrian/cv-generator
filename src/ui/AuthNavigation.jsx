import { NavLink } from "react-router-dom";
import Button from "./Button";

function AuthNavigation() {
  return (
    <nav>
      <ul className="flex space-x-2 md:space-x-4">
        <li>
          <NavLink to="/login">
            <Button variant="inverse"> Log In</Button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup">
            <Button variant="primary">Sign Up</Button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AuthNavigation;
