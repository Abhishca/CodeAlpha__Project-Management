import { useState, useEffect } from "react";
import API from "../../../services/api";

export default function CommentSection({ taskId }: any) {
  const [comments, setComments] = useState<any[]>([]);
  const [text, setText] = useState("");

  const fetch = () => {
    API.get(`/comments/${taskId}`).then((res) =>
      setComments(res.data)
    );
  };

  useEffect(() => {
    fetch();
  }, []);

  const add = async () => {
    await API.post("/comments", { taskId, text });
    setText("");
    fetch();
  };

  return (
  <div className="mt-2 space-y-2">
  {comments.map((c) => (
    <div key={c._id} className="bg-gray-100 p-2 rounded">
      {c.text}
    </div>
  ))}

  <input
    className="w-full border p-2 rounded"
    value={text}
    onChange={(e) => setText(e.target.value)}
    placeholder="Write a comment..."
  />

  <button
    className="bg-blue-500 text-white px-3 py-1 rounded"
    onClick={add}
  >
    Send
  </button>
</div>
);
}