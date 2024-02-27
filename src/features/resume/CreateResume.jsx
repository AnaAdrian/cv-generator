import { useNavigate } from "react-router-dom";
import { createBlankResume } from "../../services/apiResume";

import Button from "../../ui/Button";
import LoaderFullPage from "../../ui/LoaderFullPage";
import { useAuth } from "../auth/AuthContext";
import { useState } from "react";

function CreateResume() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
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

  return (
    <div className="my-5">
      <Button
        className="w-full"
        fontWeight="font-normal"
        size="md"
        onClick={handleCreateResume}
      >
        + New Resume
      </Button>
    </div>
  );
}

export default CreateResume;
