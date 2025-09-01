import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';
import type { RoutineSummary } from '../types';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const [level, setLevel] = useState<'basico' | 'intermedio'>('basico');
  const [rutinas, setRutinas] = useState<RoutineSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { get } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    get<RoutineSummary[]>(`/api/rutinas?nivel=${level}`)
      .then(setRutinas)
      .catch(() => setError('No se pudieron cargar las rutinas.'))
      .finally(() => setLoading(false));
  }, [level, get]);

  return (
    <main id="main" className="max-w-2xl mx-auto p-4">
      <div className="flex gap-4 mb-6" role="radiogroup" aria-label="Nivel de dificultad">
        {['basico', 'intermedio'].map(l => (
          <Button
            key={l}
            className={level === l ? 'bg-blue-800' : 'bg-blue-600'}
            aria-pressed={level === l}
            onClick={() => setLevel(l as 'basico' | 'intermedio')}
          >
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </Button>
        ))}
      </div>
      {loading && <div className="text-lg">Cargando...</div>}
      {error && <Alert>{error}</Alert>}
      {!loading && !error && rutinas.length === 0 && <div className="text-lg">No hay rutinas disponibles.</div>}
      <div className="grid gap-4">
        {rutinas.map(r => (
          <Card key={r.id} className="cursor-pointer hover:ring-2 hover:ring-blue-600" onClick={() => navigate(`/rutina/${r.id}`)} tabIndex={0} role="button" aria-label={`Ver rutina ${r.title}`}> 
            <div className="flex justify-between items-center">
              <span className="font-bold text-xl">{r.title}</span>
              <span className="text-sm bg-blue-100 text-blue-800 rounded px-2 py-1">{r.level}</span>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <Button onClick={() => navigate('/resumen')}>Ver resumen semanal</Button>
      </div>
    </main>
  );
};
