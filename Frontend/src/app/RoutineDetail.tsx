import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import type { RoutineDetail } from '../types';
import { Card } from '../components/Card';
import { Alert } from '../components/Alert';
import { Button } from '../components/Button';
import { Field } from '../components/Field';

export const RoutineDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { get, post } = useApi();
  const [rutina, setRutina] = useState<RoutineDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [minutes, setMinutes] = useState(30);
  const [formError, setFormError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    get<RoutineDetail>(`/api/rutinas/${id}`)
      .then(setRutina)
      .catch(() => setError('No se pudo cargar la rutina.'))
      .finally(() => setLoading(false));
  }, [id, get]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccess(null);
    if (!date || !minutes || minutes < 1 || minutes > 300) {
      setFormError('Ingrese una fecha válida y minutos entre 1 y 300.');
      return;
    }
    try {
      await post('/api/progreso', { date, minutes, routineId: id });
      setSuccess('¡Progreso registrado!');
    } catch {
      setFormError('No se pudo registrar el progreso.');
    }
  };

  return (
    <main id="main" className="max-w-2xl mx-auto p-4">
      <Button onClick={() => navigate(-1)} className="mb-4">← Volver</Button>
      {loading && <div className="text-lg">Cargando...</div>}
      {error && <Alert>{error}</Alert>}
      {rutina && (
        <Card>
          <h2 className="text-2xl font-bold mb-2">{rutina.title}</h2>
          <div className="mb-2 text-blue-800">Nivel: {rutina.level}</div>
          <div className="mb-4">{rutina.description}</div>
          <h3 className="font-bold mb-2">Ejercicios</h3>
          <ol className="list-decimal ml-6 mb-4">
            {rutina.exercises.sort((a, b) => a.orderIndex - b.orderIndex).map(ej => (
              <li key={ej.id} className="mb-1">
                <span className="font-semibold">{ej.name}:</span> {ej.description}
              </li>
            ))}
          </ol>
        </Card>
      )}
      <Card>
        <h3 className="font-bold mb-2">Registrar minutos</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Field
            label="Fecha"
            id="date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
          <Field
            label="Minutos"
            id="minutes"
            type="number"
            min={1}
            max={300}
            value={minutes}
            onChange={e => setMinutes(Number(e.target.value))}
          />
          {formError && <Alert>{formError}</Alert>}
          {success && <div className="text-green-700 font-bold mb-2">{success}</div>}
          <Button type="submit">Guardar</Button>
        </form>
      </Card>
    </main>
  );
};
