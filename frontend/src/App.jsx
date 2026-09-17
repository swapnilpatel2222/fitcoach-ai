import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [form, setForm] = useState({ age: "23", height: "5.7", weight: "67", goal: "muscle gain", level: "beginner", days: 5 });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const generatePlan = async () => {
    setLoading(true);
    try {
      // FIXED ROUTE: /generate not /api/generate
      const res = await axios.post(`${API_URL}/generate`, {
        age: form.age,
        height: form.height,
        weight: form.weight,
        goal: form.goal,
        level: form.level,
        days: form.days,
      });
      setPlan(res.data);
      setScreen("plan");
    } catch (err) {
      console.error(err);
      alert("Error: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      {screen === "landing" && (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Build Your Stronger Self</h1>
          <button onClick={() => setScreen("form")} className="bg-yellow-400 text-black px-6 py-3 rounded-full font-bold">Get Started</button>
        </div>
      )}
      {screen === "form" && (
        <div className="w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold">Your Details</h2>
          <input className="w-full p-3 rounded bg-zinc-800" value={form.age} onChange={(e) => setForm({...form, age: e.target.value })} placeholder="Age" />
          <input className="w-full p-3 rounded bg-zinc-800" value={form.weight} onChange={(e) => setForm({...form, weight: e.target.value })} placeholder="Weight" />
          <div className="flex gap-2">
            <button onClick={()=>setForm({...form,days:4})} className={`p-3 rounded flex-1 ${form.days===4?'bg-yellow-400 text-black':'bg-zinc-800'}`}>4 Days</button>
            <button onClick={()=>setForm({...form,days:5})} className={`p-3 rounded flex-1 ${form.days===5?'bg-yellow-400 text-black':'bg-zinc-800'}`}>5 Days</button>
            <button onClick={()=>setForm({...form,days:6})} className={`p-3 rounded flex-1 ${form.days===6?'bg-yellow-400 text-black':'bg-zinc-800'}`}>6 Days</button>
          </div>
          <button onClick={generatePlan} disabled={loading} className="w-full bg-yellow-400 text-black p-3 rounded-full font-bold mt-6">{loading?"Generating...":"Generate Plan"}</button>
        </div>
      )}
      {screen === "plan" && plan && (
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Your Plan Ready!</h2>
          <pre className="bg-zinc-900 p-4 rounded overflow-auto text-sm whitespace-pre-wrap">{JSON.stringify(plan, null, 2)}</pre>
          <button onClick={()=>setScreen("landing")} className="mt-4 bg-zinc-800 p-3 rounded w-full">Back Home</button>
        </div>
      )}
    </div>
  );
}