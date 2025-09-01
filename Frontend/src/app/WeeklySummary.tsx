import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useWeeklySummary } from '../hooks/useWeeklySummary';
import type { WeeklyTotalsResponse } from '../types';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { Field } from '../components/Field';

export const WeeklySummary: React.FC = () => {
  const [desde, setDesde] = useState(() => new Date().toISOString().slice(0, 10));
  const [data, setData] = useState<WeeklyTotalsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { get } = useApi();
  const { toMatrix } = useWeeklySummary();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await get<WeeklyTotalsResponse>(`/api/progreso/semana?desde=${desde}`);
      setData(res);
    } catch {
      setError('No se pudo cargar el resumen.');
    } finally {
      setLoading(false);
    }
  };

  const days = data ? toMatrix(desde, data) : [];

  return (
    <main id="main" className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex gap-4 mb-4 items-end">
        <Field
          label="Desde"
          id="desde"
          type="date"
          value={desde}
          onChange={e => setDesde(e.target.value)}
        />
        <Button type="submit">Consultar</Button>
      </form>
      {loading && <div className="text-lg">Cargando...</div>}
      {error && <Alert>{error}</Alert>}
      {days.length > 0 && (
        <Card>
          <h2 className="text-xl font-bold mb-4">Resumen semanal</h2>
          <ul className="space-y-2">
            {days.map(day => (
              <li key={day.date} className="flex items-center gap-2">
                <span className="w-24 font-mono">{day.date}</span>
                <span className="w-12 text-right">{day.totalMinutes} min</span>
                <div className="flex-1 h-4 bg-blue-100 rounded">
                  <div
                    className="h-4 bg-blue-600 rounded"
                    style={{ width: `${Math.min(day.totalMinutes, 300) / 3}%` }}
                    aria-label={`Barra de minutos para ${day.date}`}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
      {!loading && !error && days.length === 0 && <div className="text-lg">No hay datos para mostrar.</div>}
    </main>
  );
};
