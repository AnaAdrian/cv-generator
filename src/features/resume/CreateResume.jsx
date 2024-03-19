import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Button from "../../ui/Button";
import LoaderFullPage from "../../ui/LoaderFullPage";
import CardSection from "./card/CardSection";
import CardPlusIcon from "./card/CardPlusIcon";
import CardText from "./card/CardText";
import { useAuth } from "../auth/AuthContext";
import { createBlankResume } from "../../services/apiResume";
import { useWindowResize } from "../../hooks/useWindowResize";

function CreateResume() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const isMobile = useWindowResize(768);
  const navigate = useNavigate();

  const handleCreateResume = async () => {
    setLoading(true);
    try {
      const resumeId = await createBlankResume(user.id);
      navigate(`/app/resumes/${resumeId}/edit`);
    } catch (error) {
      console.error("Error creating resume", error);
    }
    setLoading(false);
  };

  if (loading) return <LoaderFullPage />;

  if (isMobile)
    return (
      <Button
        className="my-5 w-full"
        fontWeight="font-normal"
        onClick={handleCreateResume}
      >
        + New Resume
      </Button>
    );

  return (
    <CardSection
      img={<CardPlusIcon />}
      content={<CardText />}
      onClick={handleCreateResume}
      className="cursor-pointer"
    />
  );
}

export default CreateResume;
