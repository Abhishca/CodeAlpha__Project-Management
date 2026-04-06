import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../services/api";
import TaskCard from "../components/TaskCard";
import type { Task } from "../../../types";

export default function ProjectBoard() {
  const { id } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([]);
  const [assignedTo, setAssignedTo] = useState("");

  const fetchTasks = () => {
    API.get(`/tasks/${id}`).then((res: { data: Task[] }) =>
      setTasks(res.data)
    );
  };

  useEffect(() => {
  API.get("/projects").then((res) => {
    const project = res.data.find((p: any) => p._id === id);
    setMembers(project?.members || []);
  });
}, [id]);

  const createTask = async () => {
  await API.post("/tasks", {
    title,
    projectId: id,
    assignedTo, // ✅ new
  });

  setTitle("");
  setAssignedTo("");
  fetchTasks();
};

  const inviteUser = async () => {
  await API.post("/projects/invite", {
    email,
    projectId: id,
  });

  setEmail("");
};
  return (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h2 className="text-2xl font-bold mb-4">Task Board</h2>

    <div className="flex gap-4">

      {/* TODO */}
      <div className="flex gap-6">
  {["todo", "in-progress", "done"].map((status) => (
    <div key={status} className="bg-gray-200 p-4 rounded-xl w-1/3">
      <h3 className="font-bold mb-3 capitalize">{status}</h3>

      {tasks
        .filter((t) => t.status === status)
        .map((t) => (
          <TaskCard key={t._id} task={t} />
        ))}
    </div>
  ))}
</div>

      <select
  className="border p-2 rounded ml-2"
  value={assignedTo}
  onChange={(e) => setAssignedTo(e.target.value)}
>
  <option value="">Assign user</option>
  {members.map((m: any) => (
    <option key={m._id} value={m._id}>
      {m.email}
    </option>
  ))}
</select>
      <div>
    <div className="mb-4">
  <input
    className="border p-2 rounded"
    placeholder="Invite by email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

  <button
    className="bg-green-500 text-white px-3 py-2 ml-2 rounded"
    onClick={inviteUser}
  >
    Invite
  </button>
</div>
        <input
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  placeholder="New task"
/>

<button
  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
  onClick={createTask}
>
  Add Task
</button>
      </div>

    </div>
  </div>
  
);

}