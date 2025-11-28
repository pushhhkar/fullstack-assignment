import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { getTasks, createTask, updateTask, deleteTask } from "../api/tasks";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [edit, setEdit] = useState(null);

  const load = async () => {
    const res = await getTasks({
      search: search || undefined,
      status: status || undefined,
    });
    setTasks(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (data) => {
    if (edit) {
      const res = await updateTask(edit.id, data);
      setTasks(tasks.map((t) => (t.id === edit.id ? res.data : t)));
      setEdit(null);
    } else {
      const res = await createTask(data);
      setTasks([res.data, ...tasks]);
    }
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

        {/* Search filters */}
        <div className="bg-white p-4 rounded shadow mb-4 flex flex-col md:flex-row gap-3">
          <input
            className="border p-2 flex-1 rounded"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border p-2 rounded"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In progress</option>
            <option value="done">Done</option>
          </select>

          <button onClick={load} className="bg-blue-600 text-white px-4 py-2 rounded">
            Apply
          </button>
        </div>

        {/* Form */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="font-semibold mb-2">{edit ? "Edit Task" : "Add Task"}</h2>
          <TaskForm onSubmit={handleCreate} initial={edit} />
        </div>

        {/* List */}
        <div className="bg-white p-4 rounded shadow">
          <TaskList tasks={tasks} onEdit={setEdit} onDelete={handleDelete} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
