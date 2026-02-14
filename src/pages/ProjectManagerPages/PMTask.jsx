import React from "react";
import { Plus } from "lucide-react";
import CreateTask from "./CreateTask"; // make sure path is correct

const PMTask = () => {
  const [showModal, setShowModal] = React.useState(false);

  const handleAddTask = (taskData) => {
    console.log("New Task Added:", taskData);
    // later you can push into state or send to API
  };

  return (
    <>
      {/* Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-4 py-2 mt-4 sm:mt-5 mr-2 sm:mr-4 md:mr-6 rounded-lg hover:bg-emerald-600 transition w-full sm:w-auto"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      {/* Modal */}
      <CreateTask
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAddTask={handleAddTask}
      />
    </>
  );
};

export default PMTask;