import React from "react";

const DeleteModal = ({toggle, onDelete }) => {
  return (
    <div className="fixed inset-0 bg-black/50 w-full h-screen bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-lg p-6 shadow-lg">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl text-gray-600 font-bold mb-5">
              Delete Task
            </h1>
            <p className="text-lg text-gray-600 font-bold mb-3">
              Are you sure you want to delete this task?
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={toggle}
              className="bg-red-500 hover:bg-red-600 text-white text-lg font-bold py-2 px-10 rounded-lg cursor-pointer duration-600"
            >
              No
            </button>
            <button
              onClick={onDelete}
              className="bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-2 px-10 rounded-lg cursor-pointer duration-600"
            >
              Yes!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
