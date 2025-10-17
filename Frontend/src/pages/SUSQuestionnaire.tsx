import React, { useState } from 'react';
import { Alert } from '../components/Alert';

/**
 * Cuestionario SUS (System Usability Scale)
 * Componente para medir la usabilidad de la aplicación
 * Meta: puntaje SUS ≥75
 */

interface SUSQuestionnaireProps {
  onComplete?: (score: number) => void;
  version?: string;
  environment?: string;
}

const SUS_QUESTIONS = [
  {
    id: 1,
    text: 'Creo que me gustaría utilizar esta aplicación con frecuencia',
    field: 'q1Frequency',
    type: 'positive'
  },
  {
    id: 2,
    text: 'Encontré la aplicación innecesariamente compleja',
    field: 'q2Complexity',
    type: 'negative'
  },
  {
    id: 3,
    text: 'Pensé que la aplicación era fácil de usar',
    field: 'q3Ease',
    type: 'positive'
  },
  {
    id: 4,
    text: 'Creo que necesitaría ayuda de una persona con conocimientos técnicos para usar esta aplicación',
    field: 'q4SupportNeeded',
    type: 'negative'
  },
  {
    id: 5,
    text: 'Encontré que las diversas funciones de esta aplicación estaban bien integradas',
    field: 'q5Integration',
    type: 'positive'
  },
  {
    id: 6,
    text: 'Pensé que había demasiada inconsistencia en esta aplicación',
    field: 'q6Inconsistency',
    type: 'negative'
  },
  {
    id: 7,
    text: 'Imagino que la mayoría de las personas aprenderían a usar esta aplicación muy rápidamente',
    field: 'q7LearningSpeed',
    type: 'positive'
  },
  {
    id: 8,
    text: 'Encontré la aplicación muy difícil de usar',
    field: 'q8Cumbersome',
    type: 'negative'
  },
  {
    id: 9,
    text: 'Me sentí muy seguro/a usando la aplicación',
    field: 'q9Confidence',
    type: 'positive'
  },
  {
    id: 10,
    text: 'Necesité aprender muchas cosas antes de poder seguir utilizando esta aplicación',
    field: 'q10LearningDifficulty',
    type: 'negative'
  }
];

const LIKERT_SCALE = [
  { value: 1, label: 'Totalmente en desacuerdo' },
  { value: 2, label: 'En desacuerdo' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'De acuerdo' },
  { value: 5, label: 'Totalmente de acuerdo' }
];

export const SUSQuestionnaire: React.FC<SUSQuestionnaireProps> = ({
  onComplete,
  version = '1.0',
  environment = 'staging'
}) => {
  const [responses, setResponses] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState('');
  const [sessionDuration, setSessionDuration] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    grade: string;
    meetsTarget: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [startTime] = useState(Date.now());

  const handleResponseChange = (field: string, value: number) => {
    setResponses(prev => ({ ...prev, [field]: value }));
  };

  // Nota: El cálculo se hace en el backend, pero mantenemos estas funciones 
  // por si se necesita cálculo local en el futuro
  /* 
  const calculateSUSScore = (answers: { [key: string]: number }): number => {
    // Preguntas impares (positivas): contribución = (respuesta - 1)
    const oddSum = 
      (answers.q1Frequency - 1) +
      (answers.q3Ease - 1) +
      (answers.q5Integration - 1) +
      (answers.q7LearningSpeed - 1) +
      (answers.q9Confidence - 1);

    // Preguntas pares (negativas): contribución = (5 - respuesta)
    const evenSum =
      (5 - answers.q2Complexity) +
      (5 - answers.q4SupportNeeded) +
      (5 - answers.q6Inconsistency) +
      (5 - answers.q8Cumbersome) +
      (5 - answers.q10LearningDifficulty);

    // Puntaje SUS = suma total * 2.5
    return (oddSum + evenSum) * 2.5;
  };

  const getScoreGrade = (score: number): string => {
    if (score >= 85) return 'A - Excelente';
    if (score >= 75) return 'B - Bueno (Meta alcanzada)';
    if (score >= 70) return 'C - Aceptable';
    if (score >= 50) return 'D - Pobre';
    return 'F - Crítico';
  };
  */

  const isComplete = (): boolean => {
    return SUS_QUESTIONS.every(q => responses[q.field] !== undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isComplete()) {
      setError('Por favor responde todas las preguntas');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    // Calcular duración de la sesión en minutos
    const duration = Math.round((Date.now() - startTime) / 60000);
    setSessionDuration(duration);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/usability/sus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...responses,
          version,
          environment,
          sessionDurationMinutes: duration,
          comments
        })
      });

      if (!response.ok) {
        throw new Error('Error al enviar las respuestas');
      }

      const data = await response.json();

      setResult({
        score: data.susScore,
        grade: data.scoreGrade,
        meetsTarget: data.meetsTarget
      });

      if (onComplete) {
        onComplete(data.susScore);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar las respuestas');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 50) return 'text-orange-600';
    return 'text-red-600';
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Resultados SUS</h2>
          
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.score)}`}>
            {result.score.toFixed(1)}
          </div>
          
          <p className="text-xl mb-2">{result.grade}</p>
          
          {result.meetsTarget ? (
            <Alert type="success" message="¡Meta alcanzada! Puntaje SUS ≥75" />
          ) : (
            <Alert 
              type="warning" 
              message={`Meta no alcanzada. Se requiere ≥75 (actual: ${result.score.toFixed(1)})`} 
            />
          )}

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-2">Información de la prueba</h3>
            <p>Versión: {version}</p>
            <p>Ambiente: {environment}</p>
            <p>Duración: {sessionDuration} minutos</p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 min-h-[44px] transition-colors"
            aria-label="Realizar otra evaluación"
          >
            Realizar otra evaluación
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Cuestionario de Usabilidad (SUS)</h1>
        <p className="text-gray-600">
          Por favor, lee cada afirmación y selecciona tu nivel de acuerdo.
          Este cuestionario nos ayuda a mejorar la experiencia de usuario.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Meta: Puntaje SUS ≥75 | Versión: {version} | Ambiente: {environment}
        </p>
      </div>

      {error && <Alert type="error" message={error} />}

      <form onSubmit={handleSubmit} className="space-y-8">
        {SUS_QUESTIONS.map((question, index) => (
          <div 
            key={question.id}
            className="p-4 border rounded-lg bg-gray-50"
          >
            <label className="block mb-4">
              <span className="text-lg font-semibold">
                {index + 1}. {question.text}
              </span>
            </label>

            <fieldset>
              <legend className="sr-only">{question.text}</legend>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {LIKERT_SCALE.map(option => (
                  <label
                    key={option.value}
                    className={`
                      flex flex-col items-center p-3 border-2 rounded cursor-pointer
                      transition-all
                      ${responses[question.field] === option.value 
                        ? 'border-blue-600 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'}
                    `}
                  >
                    <input
                      type="radio"
                      name={question.field}
                      value={option.value}
                      checked={responses[question.field] === option.value}
                      onChange={(e) => handleResponseChange(question.field, parseInt(e.target.value))}
                      className="sr-only"
                      aria-label={`${question.text}: ${option.label}`}
                      required
                    />
                    <span className="text-2xl font-bold mb-1">{option.value}</span>
                    <span className="text-xs text-center">{option.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        ))}

        <div className="p-4 border rounded-lg">
          <label htmlFor="comments" className="block text-lg font-semibold mb-2">
            Comentarios adicionales (opcional)
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Comparte tus comentarios, sugerencias o experiencias..."
            aria-label="Comentarios adicionales sobre tu experiencia"
          />
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Progreso: {Object.keys(responses).length} / {SUS_QUESTIONS.length} preguntas respondidas
          </p>
          
          <button
            type="submit"
            disabled={!isComplete() || isSubmitting}
            className={`
              px-8 py-3 rounded-lg font-semibold text-white
              ${isComplete() && !isSubmitting
                ? 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'}
              transition-colors
              min-w-[180px] min-h-[44px]
            `}
            aria-label="Enviar cuestionario de usabilidad"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Evaluación'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SUSQuestionnaire;
