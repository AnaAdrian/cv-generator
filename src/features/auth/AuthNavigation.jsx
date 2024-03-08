import { NavLink } from "react-router-dom";
import Button from "../../ui/Button";

function AuthNavigation() {
  return (
    <nav>
      <ul className="flex space-x-1 md:space-x-2">
        <li>
          <NavLink to="app/auth/sign-in">
            <Button variant="link" size="md">
              {" "}
              <span className="font-normal">Log In</span>
            </Button>
          </NavLink>
        </li>
        <li>
          <NavLink to="app/auth/sign-up">
            <Button variant="primary" size="md">
              Sign Up
            </Button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AuthNavigation;
