import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bug, AlertCircle, CheckCircle, PlusCircle, X, Trash2 } from 'lucide-react'; // Adicionei Trash2

const API_URL = "http://localhost:8000/bugs";

function App() {
  const [bugs, setBugs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBug, setNewBug] = useState({ title: '', severity: 'Low' });

  const fetchBugs = async () => {
    try {
      const response = await axios.get(API_URL);
      setBugs(response.data);
    } catch (error) {
      console.error("Error fetching bugs:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, newBug);
      setNewBug({ title: '', severity: 'Low' });
      setIsModalOpen(false);
      fetchBugs();
    } catch (error) {
      alert("Erro ao salvar bug.");
    }
  };

  // --- NOVA FUNÇÃO DE DELETAR ---
  const deleteBug = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este bug?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchBugs(); // Atualiza a lista após deletar
      } catch (error) {
        alert("Erro ao deletar bug.");
      }
    }
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900 relative">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bug className="text-blue-600" size={32} />
          <h1 className="text-2xl font-bold text-gray-800">BugTracker Pro</h1>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
          <PlusCircle size={20} /> Report New Bug
        </button>
      </header>

      {/* CARDS DE ESTATÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Issues</p>
          <p className="text-3xl font-bold text-gray-900">{bugs.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-red-500">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Critical Bugs</p>
          <p className="text-3xl font-bold text-gray-900">
            {bugs.filter(b => b.severity === 'Critical' || b.severity === 'High').length}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 border-l-4 border-l-green-500">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">System Status</p>
          <p className="text-xl font-bold text-green-600 flex items-center gap-2 mt-2">
            <CheckCircle size={20} /> Operational
          </p>
        </div>
      </div>

      {/* TABELA COM BOTÃO DE DELETE */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase">ID</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Bug Title</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase">Severity</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-600 uppercase text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bugs.map((bug) => (
              <tr key={bug.id} className="hover:bg-blue-50/30 transition">
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">#{bug.id}</td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800">{bug.title}</td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${
                    bug.severity === 'Critical' ? 'bg-red-100 text-red-700' : 
                    bug.severity === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {bug.severity}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button 
                    onClick={() => deleteBug(bug.id)}
                    className="text-gray-300 hover:text-red-500 transition duration-200"
                    title="Delete Bug"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl scale-in-center">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Report New Bug</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Bug Title</label>
                <input required className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none transition" value={newBug.title} onChange={(e) => setNewBug({...newBug, title: e.target.value})} placeholder="Ex: Login button not working" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Severity</label>
                <select className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 transition" value={newBug.severity} onChange={(e) => setNewBug({...newBug, severity: e.target.value})}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">Create Bug</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;