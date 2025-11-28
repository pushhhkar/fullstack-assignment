import { useEffect, useState } from "react";

const TaskForm = ({ onSubmit, initial }) => {
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [status, setStatus] = useState(initial?.status || "pending");

  useEffect(() => {
    if (initial) {
      setTitle(initial.title);
      setDescription(initial.description || "");
      setStatus(initial.status);
    }
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, description, status });

    if (!initial) {
      setTitle("");
      setDescription("");
      setStatus("pending");
    }
  };

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <input
        className="border w-full p-2 rounded"
        value={title}
        placeholder="Task title..."
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border w-full p-2 rounded"
        value={description}
        placeholder="Description..."
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="border w-full p-2 rounded"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In progress</option>
        <option value="done">Done</option>
      </select>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {initial ? "Save Changes" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
