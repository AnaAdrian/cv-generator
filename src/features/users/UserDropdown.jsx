import supabase from "../../services/supabase";
import Button from "../../ui/Button";

function User() {
  function handleLogOut() {
    supabase.auth.signOut();
  }

  return (
    <div>
      <h1>{}</h1>
      <Button onClick={handleLogOut}>Log Out</Button>
    </div>
  );
}

export default User;
