import Button from "../../ui/Button";
import { useAuth } from "../auth/AuthContext";

function User() {
  const { signOut } = useAuth();

  return (
    <div>
      <h1>{}</h1>
      <Button size="md" onClick={signOut}>
        Log Out
      </Button>
    </div>
  );
}

export default User;
