import React, { useState } from 'react';
import { Alert } from '../components/Alert';
import { fireMascotCue } from '../components/pet/VitaAssistant';

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

  // NO mostrar mensaje de Vita al entrar, solo cuando se complete
  // useEffect eliminado para evitar mensaje de bienvenida

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
      // TODO: Reemplazar con llamada real al backend cuando el endpoint esté disponible
      // const token = localStorage.getItem('token');
      // const response = await fetch('http://localhost:8080/api/usability/sus', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify({
      //     ...responses,
      //     version,
      //     environment,
      //     sessionDurationMinutes: duration,
      //     comments
      //   })
      // });
      // if (!response.ok) {
      //   throw new Error('Error al enviar las respuestas');
      // }
      // const data = await response.json();

      // SIMULACIÓN: Calcular el puntaje SUS localmente
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular latencia de red

      // Preguntas impares (positivas): contribución = (respuesta - 1)
      const oddSum = 
        (responses.q1Frequency - 1) +
        (responses.q3Ease - 1) +
        (responses.q5Integration - 1) +
        (responses.q7LearningSpeed - 1) +
        (responses.q9Confidence - 1);

      // Preguntas pares (negativas): contribución = (5 - respuesta)
      const evenSum =
        (5 - responses.q2Complexity) +
        (5 - responses.q4SupportNeeded) +
        (5 - responses.q6Inconsistency) +
        (5 - responses.q8Cumbersome) +
        (5 - responses.q10LearningDifficulty);

      // Puntaje SUS = suma total * 2.5
      const susScore = (oddSum + evenSum) * 2.5;
      const meetsTarget = susScore >= 75;
      
      let scoreGrade = '';
      if (susScore >= 85) scoreGrade = 'A - Excelente';
      else if (susScore >= 75) scoreGrade = 'B - Bueno (Meta alcanzada)';
      else if (susScore >= 70) scoreGrade = 'C - Aceptable';
      else if (susScore >= 50) scoreGrade = 'D - Pobre';
      else scoreGrade = 'F - Crítico';

      const data = { susScore, scoreGrade, meetsTarget };
      
      console.log('📊 [SUS Simulado] Respuestas:', responses);
      console.log('📊 [SUS Simulado] Puntaje:', susScore, '| Meta alcanzada:', meetsTarget);
      console.log('📊 [SUS Simulado] Comentarios:', comments || 'Sin comentarios');
      // FIN SIMULACIÓN

      setResult({
        score: data.susScore,
        grade: data.scoreGrade,
        meetsTarget: data.meetsTarget
      });

      // Mensaje de Vita según el resultado
      if (data.meetsTarget) {
        fireMascotCue({ 
          mood: "clap", 
          msg: "¡Gracias por tu feedback! 🎉 Nos ayudas a ser mejores.", 
          ms: 4000 
        });
      } else {
        fireMascotCue({ 
          mood: "think", 
          msg: "Gracias por tu honestidad 🙏 Trabajaremos en mejorar.", 
          ms: 4000 
        });
      }

      if (onComplete) {
        onComplete(data.susScore);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar las respuestas');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getScoreInfo = (score: number): { emoji: string; message: string } => {
    if (score >= 85) return { emoji: '🏆', message: '¡Increíble! Parece que la aplicación te resultó muy fácil de usar.' };
    if (score >= 75) return { emoji: '✅', message: '¡Genial! Nos alegra que hayas tenido una buena experiencia.' };
    if (score >= 70) return { emoji: '👍', message: 'Gracias por tu opinión. Trabajaremos en mejorar tu experiencia.' };
    if (score >= 50) return { emoji: '🤔', message: 'Valoramos tu feedback. Hay áreas que podemos mejorar.' };
    return { emoji: '💭', message: 'Gracias por tu sinceridad. Nos ayuda a identificar qué mejorar.' };
  };

  if (result) {
    const scoreInfo = getScoreInfo(result.score);
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 md:px-6">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg p-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4 text-[var(--fg)]">¡Gracias por tu tiempo!</h2>
            
            <div className="text-6xl mb-4">
              {scoreInfo.emoji}
            </div>
            
            <p className="text-xl mb-6 text-[var(--fg)]">{scoreInfo.message}</p>
            
            {result.meetsTarget ? (
              <div className="bg-[var(--card-elevated)] border border-[var(--accent)] rounded-lg p-4 mb-6">
                <p className="text-[var(--fg)] font-semibold">
                  Tu opinión es muy valiosa para nosotros. Seguiremos trabajando para ofrecerte la mejor experiencia. 💚
                </p>
              </div>
            ) : (
              <div className="bg-[var(--card-elevated)] border border-[var(--border)] rounded-lg p-4 mb-6">
                <p className="text-[var(--fg)]">
                  Agradecemos tu honestidad. Tus comentarios nos ayudarán a mejorar la aplicación. 🙏
                </p>
              </div>
            )}

            <div className="mt-6 p-4 bg-[var(--card-elevated)] border border-[var(--border)] rounded text-left">
              <h3 className="font-semibold mb-2 text-[var(--fg)]">Información de la evaluación</h3>
              <p className="text-[var(--fg-muted)] text-sm">Versión: {version}</p>
              <p className="text-[var(--fg-muted)] text-sm">Ambiente: {environment}</p>
              <p className="text-[var(--fg-muted)] text-sm">Duración: {sessionDuration} minutos</p>
              {/* Puntaje guardado solo para logs internos, no mostrado al usuario */}
              <p className="text-[var(--fg-muted)] text-xs mt-2 opacity-50">
                Puntaje interno: {result.score.toFixed(1)} (solo para análisis del equipo)
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] rounded-lg hover:opacity-90 focus:ring-4 focus:ring-[var(--accent)] min-h-[44px] transition-all font-semibold"
              aria-label="Realizar otra evaluación"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:px-6">
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-lg shadow-lg p-4 md:p-6">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[var(--fg)]">Cuestionario de Usabilidad (SUS)</h1>
          <p className="text-[var(--fg-muted)]">
            Por favor, lee cada afirmación y selecciona tu nivel de acuerdo.
            Este cuestionario nos ayuda a mejorar la experiencia de usuario.
          </p>
          <p className="text-sm text-[var(--fg-muted)] mt-2">
            Versión: {version} | Ambiente: {environment}
          </p>
        </div>

        {error && <Alert type="error" message={error} />}

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
        {SUS_QUESTIONS.map((question, index) => (
          <div 
            key={question.id}
            className="p-4 border border-[var(--border)] rounded-lg bg-[var(--card-elevated)]"
          >
            <label className="block mb-4">
              <span className="text-base md:text-lg font-semibold text-[var(--fg)]">
                {index + 1}. {question.text}
              </span>
            </label>

            <fieldset>
              <legend className="sr-only">{question.text}</legend>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                {LIKERT_SCALE.map(option => {
                  const isSelected = responses[question.field] === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleResponseChange(question.field, option.value)}
                      className={`
                        flex flex-col items-center p-3 border-2 rounded-lg cursor-pointer
                        transition-all min-h-[80px] justify-center
                        ${isSelected
                          ? 'border-[var(--accent)] bg-[var(--card)] shadow-md' 
                          : 'border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--card)]'}
                      `}
                      aria-label={`${question.text}: ${option.label}`}
                      aria-pressed={isSelected}
                    >
                      <span className="text-2xl font-bold mb-1 text-[var(--fg)]">{option.value}</span>
                      <span className="text-xs text-center text-[var(--fg-muted)]">{option.label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>
        ))}

        <div className="p-4 border border-[var(--border)] rounded-lg bg-[var(--card-elevated)]">
          <label htmlFor="comments" className="block text-base md:text-lg font-semibold mb-2 text-[var(--fg)]">
            Comentarios adicionales (opcional)
          </label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            rows={4}
            className="w-full p-3 border border-[var(--border)] rounded-lg bg-[var(--bg)] text-[var(--fg)] focus:ring-2 focus:ring-[var(--accent)] focus:outline-none"
            placeholder="Comparte tus comentarios, sugerencias o experiencias..."
            aria-label="Comentarios adicionales sobre tu experiencia"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[var(--fg-muted)]">
            Progreso: {Object.keys(responses).length} / {SUS_QUESTIONS.length} preguntas respondidas
          </p>
          
          <button
            type="submit"
            disabled={!isComplete() || isSubmitting}
            className={`
              px-8 py-3 rounded-lg font-semibold
              ${isComplete() && !isSubmitting
                ? 'bg-[var(--accent)] text-[var(--bg)] hover:opacity-90 focus:ring-4 focus:ring-[var(--accent)] cursor-pointer'
                : 'bg-[var(--border)] text-[var(--fg-muted)] cursor-not-allowed'}
              transition-all
              min-w-[180px] min-h-[44px]
            `}
            aria-label="Enviar cuestionario de usabilidad"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Evaluación'}
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default SUSQuestionnaire;
