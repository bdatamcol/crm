'use client';

import { useState } from 'react';
import { supabase } from '@/app/utils/supabaseClient';
import { useRouter } from 'next/navigation';

import Panel from '@/app/components/Panel';
import Leads from '@/app/components/Leads';
import Settings from '@/app/components/Settings';
import Messagess from '@/app/components/Messagess';
import Marketing from '@/app/components/marketing';

export default function Home() {
  const [activeTab, setActiveTab] = useState('Panelcontrol');
  const router = useRouter();

  const renderContent = () => {
    switch (activeTab) {
      case 'Panelcontrol':
        return <Panel />;
      case 'Mensajes':
        return <Messagess />;
      case 'Leads':
        return <Leads />;
      case 'Ajustes':
        return <Settings />;
      case 'Marketing':
        return <Marketing />;
      default:
        return <Panel />;
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-grey text-black p-4 flex flex-col justify-between">
        {/* Menú lateral */}
        <div className="flex flex-col space-y-4">
          <div className="text-2xl font-bold mb-4">📊 Bdatam CRM</div>
          <button onClick={() => setActiveTab('Panelcontrol')} className="p-2 rounded hover:bg-blue-800 text-left">Panel de control</button>
          <button onClick={() => setActiveTab('Mensajes')} className="p-2 rounded hover:bg-blue-800 text-left">Mensajes</button>
          <button onClick={() => setActiveTab('Leads')} className="p-2 rounded hover:bg-blue-800 text-left">Leads</button>
          <button onClick={() => setActiveTab('Ajustes')} className="p-2 rounded hover:bg-blue-800 text-left">Ajustes</button>
          <button onClick={() => setActiveTab('Marketing')} className="p-2 rounded hover:bg-blue-800 text-left">Marketing</button>
        </div>

        {/* Botón de cerrar sesión */}
        <button
          onClick={handleLogout}
          className="mt-4 p-2 bg-red-600 hover:bg-red-700 rounded text-left"
        >
          🔓 Cerrar sesión
        </button>
      </div>

      <main className="flex-1 p-6 bg-gray-100 text-black">
        {renderContent()}
      </main>
    </div>
  );
}
