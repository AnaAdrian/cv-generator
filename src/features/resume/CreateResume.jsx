import Button from "../../ui/Button";
import LoaderFullPage from "../../ui/LoaderFullPage";
import CardSection from "./card/CardSection";
import CardPlusIcon from "./card/CardPlusIcon";
import CardText from "./card/CardText";
import NoResumes from "./NoResumes";
import { useWindowResize } from "../../hooks/useWindowResize";
import { useCreateResume } from "./useCreateResume";

function CreateResume({ noResumes }) {
  const { mutate: createResume, isPending: isLoading } = useCreateResume();
  const isMobile = useWindowResize(768);

  if (isLoading) return <LoaderFullPage />;

  if (isMobile)
    return (
      <div className="flex flex-col items-center gap-4">
        <Button className="w-full text-lg" onClick={createResume}>
          + New Resume
        </Button>
        {noResumes && <NoResumes />}
      </div>
    );

  return noResumes ? (
    <div className="flex flex-col items-center gap-4">
      <NoResumes />
      <Button className="my-5" fontWeight="font-normal" onClick={createResume}>
        + New Resume
      </Button>
    </div>
  ) : (
    <CardSection onClick={createResume} className="cursor-pointer">
      <CardSection.Preview>
        <CardPlusIcon />
      </CardSection.Preview>
      <CardSection.Content>
        <CardText />
      </CardSection.Content>
    </CardSection>
  );
}

export default CreateResume;
