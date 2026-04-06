import { useState } from "react";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateProject({ onCreated }: any) {
  const [title, setTitle] = useState("");
  const navigate = useNavigate(); // ✅ INSIDE component

  const handleCreate = async () => {
    const res = await API.post("/projects", { title });

    setTitle("");

    onCreated(); // refresh list

    navigate(`/project/${res.data._id}`); // redirect
  };

  return (
    <div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project title"
      />

      <button onClick={handleCreate}>
        Create
      </button>
    </div>
  );
}