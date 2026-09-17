import { useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [form, setForm] = useState({ age: "", weight: "", goal: "muscle gain", days: 5 });
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);
  const generate = async () => {
    if(!form.age || !form.weight) return alert("Fill age & weight!");
    setLoading(true);
    try{
      const res = await axios.post(`${API_URL}/generate`, form);
      setPlan(res.data); setScreen("plan");
    }catch(e){ alert(e.message) }
    setLoading(false);
  }
  const handlePay = () => setPaid(true);
  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-black">FITCOACH<span className="text-yellow-400">.AI</span> <span className="bg-yellow-400 text-black text-[10px] px-2 py-0.5 rounded-full ml-2">PRO</span></h1>
        <button onClick={()=>setScreen("form")} className="bg-white text-black px-6 py-2 rounded-full font-bold">Get Plan</button>
      </nav>
      {screen==="landing" && (
        <div className="max-w-7xl mx-auto px-6 mt-16 grid md:grid-cols-2 gap-10">
          <div>
            <h1 className="text-6xl font-black leading-none">Build Your<br/><span className="text-yellow-400">Stronger Self</span></h1>
            <p className="text-zinc-400 mt-6 text-lg">AI coach like ₹5000 trainer. 15 sec plan.</p>
            <button onClick={()=>setScreen("form")} className="mt-8 bg-yellow-400 text-black px-10 py-5 rounded-full font-black text-xl">Get My Plan FREE →</button>
            <p className="mt-8 text-yellow-400">★★★★★ <span className="text-zinc-500 text-sm">4.9/5 from 1200+ users</span></p>
          </div>
          <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=700" className="rounded-[2rem] h-[500px] object-cover w-full" />
        </div>
      )}
      {screen==="form" && (
        <div className="max-w-xl mx-auto mt-10 px-6">
          <button onClick={()=>setScreen("landing")} className="text-zinc-500">← Back</button>
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 mt-6 space-y-4">
            <h2 className="text-3xl font-black">Your Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <input value={form.age} onChange={e=>setForm({...form, age:e.target.value})} placeholder="Age" className="bg-black border border-zinc-700 rounded-xl p-4" />
              <input value={form.weight} onChange={e=>setForm({...form, weight:e.target.value})} placeholder="Weight kg" className="bg-black border border-zinc-700 rounded-xl p-4" />
            </div>
            <div className="grid grid-cols-3 gap-2">{["muscle gain","fat loss","strength"].map(g=><button key={g} onClick={()=>setForm({...form, goal:g})} className={`py-3 rounded-xl border text-xs font-black uppercase ${form.goal===g?"bg-yellow-400 text-black":"bg-black border-zinc-800"}`}>{g}</button>)}</div>
            <div className="flex gap-2">{[4,5,6].map(d=><button key={d} onClick={()=>setForm({...form, days:d})} className={`flex-1 py-4 rounded-xl border font-black ${form.days===d?"bg-white text-black":"bg-black"}`}>{d} Days</button>)}</div>
            <button onClick={generate} className="w-full bg-yellow-400 text-black py-5 rounded-full font-black text-lg">{loading?"Building...":"Generate →"}</button>
          </div>
        </div>
      )}
      {screen==="plan" && plan && (
        <div className="max-w-xl mx-auto mt-10 px-6">
          {!paid? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-10 text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full mx-auto flex items-center justify-center text-4xl">🔒</div>
              <h2 className="text-3xl font-black mt-6">Plan Ready!</h2>
              <p className="text-zinc-400 mt-2">Unlock for <b className="text-white">₹299</b> <span className="line-through">₹1999</span></p>
              <button onClick={handlePay} className="w-full bg-yellow-400 text-black py-5 rounded-full font-black mt-6">Unlock Now ₹299 →</button>
              <button onClick={()=>setPaid(true)} className="text-xs text-zinc-600 underline mt-3">Demo Skip</button>
            </div>
          ):(
            <div className="space-y-4">
              <h2 className="text-3xl font-black">🔥 Unlocked!</h2>
              <div className="bg-white text-black rounded-3xl p-6"><h3 className="font-black">WORKOUT</h3>{(plan.workout||[]).map((w,i)=><div key={i} className="bg-zinc-100 p-3 rounded-xl mt-2 font-bold">{String(w)}</div>)}</div>
              <div className="bg-yellow-400 text-black rounded-3xl p-6"><h3 className="font-black">DIET</h3><p className="mt-2">{plan.diet}</p></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}