import Button from "../../ui/Button";
import LoaderFullPage from "../../ui/LoaderFullPage";
import Card from "./card/Card";
import CardDefaultIcon from "./card/CardDefaultIcon";
import CardDefaultText from "./card/CardDefaultText";
import NoResumes from "./NoResumes";
import { useCreateResume } from "./useCreateResume";
import { useAuth } from "../auth/AuthContext";

function CreateResume({ noResumes }) {
  const { mutate: createResume, isPending: isLoading } = useCreateResume();
  const { user } = useAuth();

  const fullName = user.user_metadata?.full_name;
  let firstName = "";
  let lastName = "";
  if (fullName) {
    [firstName, lastName] = fullName.split(" ");
  }

  function handleCreateResume() {
    createResume({
      template: "basic",
      first_name: firstName || "",
      last_name: lastName || "",
      email: user.email,
      score: 15,
    });
  }

  if (isLoading) return <LoaderFullPage />;

  if (noResumes) return <NoResumes onClick={handleCreateResume} />;

  return (
    <>
      <Button
        size="custom"
        className="w-full py-3 text-sm md:hidden"
        onClick={handleCreateResume}
      >
        + New Resume
      </Button>

      <Card
        onClick={handleCreateResume}
        className="hidden cursor-pointer md:flex"
      >
        <Card.Preview>
          <CardDefaultIcon className="group-hover/card:bg-blue-500" />
        </Card.Preview>
        <Card.Content>
          <CardDefaultText />
        </Card.Content>
      </Card>
    </>
  );
}

export default CreateResume;
