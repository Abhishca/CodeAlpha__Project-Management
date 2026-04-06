import { useEffect, useState } from "react";
import API from "../../../services/api";
import { useNavigate } from "react-router-dom";
import CreateProject from "../pages/CreateProject";
import type { Project } from "../../../types";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  const fetchProjects = () => {
    API.get("/projects").then((res: any) =>
      setProjects(res.data)
    );
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
  <div className="p-6 bg-gray-100 min-h-screen">
    <h1 className="text-3xl font-bold mb-6">Your Projects</h1>

    <CreateProject onCreated={fetchProjects} />

    <div className="grid grid-cols-3 gap-4 mt-6">
      {projects.map((p) => (
        <div
          key={p._id}
          onClick={() => navigate(`/project/${p._id}`)}
          className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer"
        >
          <h3 className="text-lg font-semibold">{p.title}</h3>
        </div>
      ))}
    </div>
  </div>
);
}