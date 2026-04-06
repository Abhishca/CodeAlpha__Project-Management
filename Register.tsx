import { useState } from "react";
import { registerUser } from "../authAPI";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleRegister = async () => {
    await registerUser(form);
    navigate("/");
  };

  return (
    <div>
      <h2>Register</h2>
      <input onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}