import Button from "../../ui/Button";
import LoaderFullPage from "../../ui/LoaderFullPage";
import CardSection from "./card/CardSection";
import CardPlusIcon from "./card/CardPlusIcon";
import CardText from "./card/CardText";
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
      <Button className="w-full text-lg md:hidden" onClick={handleCreateResume}>
        + New Resume
      </Button>

      <CardSection
        onClick={handleCreateResume}
        className="hidden cursor-pointer md:flex"
      >
        <CardSection.Preview>
          <CardPlusIcon />
        </CardSection.Preview>
        <CardSection.Content>
          <CardText />
        </CardSection.Content>
      </CardSection>
    </>
  );
}

export default CreateResume;
