import Button from "../../../ui/Button";
import { useModal } from "../../../ui/Modal";
import { useDeleteResume } from "../useDeleteResume";

function ConfirmDelete({ resumeId }) {
  const { mutate: deleteResume } = useDeleteResume();
  const { close: closeModal } = useModal();

  function handleDelete() {
    deleteResume(resumeId, { onSuccess: closeModal, onError: closeModal });
  }

  return (
    <div className="flex max-w-md flex-col gap-1 px-2 md:p-4">
      <div className="text-lg font-semibold md:text-2xl">Delete Resume</div>
      <div className="text-sm font-thin text-gray-700 md:text-base">
        Are you sure you want to delete this resume? Once deleted this resume
        cannot be restored.
      </div>
      <div className="mt-10 flex justify-center gap-3 md:justify-end">
        <Button onClick={handleDelete} variant="inverse">
          Delete
        </Button>
        <Button onClick={closeModal}>Cancel</Button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
