import { useState } from "react";
import type { Task } from "../../../types";
import CommentSection from "../../comments/components/CommentSection";

export default function TaskCard({ task }: { task: Task }) {
  const [show, setShow] = useState(false);

  return (
  <div className="bg-white p-3 rounded shadow mb-3">
      <p className="font-medium">{task.title}</p>

      <p className="text-xs text-gray-500">
        👤 {task.assignedTo?.email || "Unassigned"}
      </p>

    <button
      className="text-xs text-blue-500 mt-2"
      onClick={() => setShow(!show)}
    >
      💬 Comments
    </button>

    {show && <CommentSection taskId={task._id} />}
  </div>
);
}