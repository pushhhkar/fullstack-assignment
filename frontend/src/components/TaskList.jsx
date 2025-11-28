const TaskList = ({ tasks, onEdit, onDelete }) => {
  if (!tasks.length)
    return <p className="text-gray-500">No tasks found.</p>;

  return (
    <ul className="space-y-2">
      {tasks.map((t) => (
        <li key={t.id} className="bg-white p-3 rounded shadow flex justify-between">
          <div>
            <h3 className="font-semibold">{t.title}</h3>
            {t.description && (
              <p className="text-sm text-gray-600">{t.description}</p>
            )}
            <p className="text-xs text-gray-500">
              Status: {t.status.replace("-", " ")}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <button onClick={() => onEdit(t)} className="bg-yellow-400 px-2 py-1 rounded text-xs">
              Edit
            </button>
            <button onClick={() => onDelete(t.id)} className="bg-red-500 px-2 py-1 rounded text-xs text-white">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
