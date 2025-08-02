import React from 'react';
import { TaskCard } from './TaskCard';
import { TaskData, PomodoroState } from '../types/types';
import { getDayName } from '../utils/taskUtils';

interface TodayViewProps {
  day: string;
  data: { tasks: TaskData[] };
  progress: number;
  totalTime: string;
  darkMode: boolean;
  pomodoroState: PomodoroState | null;
  onTaskComplete: (day: string, taskId: string, completed: boolean) => void;
  onTaskDurationChange: (day: string, taskId: string, duration: number) => void;
  onTaskNotesChange: (day: string, taskId: string, notes: string) => void;
  onVideoDataChange: (day: string, taskId: string, field: string, value: string) => void;
  onStartPomodoro: (day: string, taskId: string) => void;
  onStopPomodoro: () => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  day,
  data,
  progress,
  totalTime,
  darkMode,
  pomodoroState,
  onTaskComplete,
  onTaskDurationChange,
  onTaskNotesChange,
  onVideoDataChange,
  onStartPomodoro,
  onStopPomodoro
}) => {
  const completedTasks = data.tasks.filter(task => task.completed).length;
  const currentDay = new Date().toLocaleDateString('de-DE', { weekday: 'long' });
  const [dailyReflection, setDailyReflection] = useState('');

  // Load daily reflection from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(`reflection_${new Date().toISOString().split('T')[0]}`);
    if (stored) {
      setDailyReflection(stored);
    }
  }, []);

  // Save daily reflection to localStorage
  const saveDailyReflection = (reflection: string) => {
    setDailyReflection(reflection);
    localStorage.setItem(`reflection_${new Date().toISOString().split('T')[0]}`, reflection);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className={`rounded-xl p-6 mb-6 ${
        darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold">
              {getDayName(day)}
            </h2>
            <p className="text-gray-500 text-sm">
              {day === 'today' ? currentDay : getDayName(day)} - Deutsch Lernen
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Fortschritt</div>
            <div className="text-3xl font-bold text-blue-500">{progress}%</div>
            <div className="text-xs text-gray-500 mt-1">
              {completedTasks}/{data.tasks.length} Tasks = {progress}%
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{completedTasks} von {data.tasks.length} Aufgaben erledigt</span>
          <span>Gesamtzeit: {totalTime}</span>
        </div>
        
        <div className={`w-full rounded-full h-3 ${
          darkMode ? 'bg-slate-700' : 'bg-gray-200'
        }`}>
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Weekly Progress Indicator */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">🎯 Weekly Progress</span>
            <span className="text-sm text-gray-500">30/36 tasks = 83%</span>
          </div>
          <div className={`w-full rounded-full h-2 ${
            darkMode ? 'bg-slate-700' : 'bg-gray-200'
          }`}>
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: '83%' }}
            />
          </div>
        </div>
      </div>
      
      <div className="grid gap-4">
        {data.tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            day={day}
            darkMode={darkMode}
            pomodoroState={pomodoroState}
            onTaskComplete={onTaskComplete}
            onTaskDurationChange={onTaskDurationChange}
            onTaskNotesChange={onTaskNotesChange}
            onVideoDataChange={onVideoDataChange}
            onStartPomodoro={onStartPomodoro}
            onStopPomodoro={onStopPomodoro}
          />
        ))}
      </div>
      
      {/* Daily Reflection */}
      <div className={`rounded-xl p-6 mt-6 ${
        darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
      }`}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          💭 Daily Reflection
        </h3>
        <p className="text-sm text-gray-500 mb-3">What did I learn today? (Write 2 lines)</p>
        <textarea
          value={dailyReflection}
          onChange={(e) => saveDailyReflection(e.target.value)}
          placeholder="z.B. Heute habe ich 5 neue Ausdrücke aus Easy German gelernt. Besonders interessant war die Erklärung über deutsche Kultur..."
          rows={3}
          className={`w-full px-4 py-3 rounded-lg border transition-colors resize-none ${
            darkMode 
              ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400' 
              : 'bg-gray-50 border-gray-300 placeholder-gray-500'
          }`}
        />
      </div>
      
      {/* Vocabulary Bank Preview */}
      <div className={`rounded-xl p-6 mt-6 ${
        darkMode ? 'bg-slate-800 border border-slate-700' : 'bg-white border border-gray-200'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            📁 My Vocabulary Bank
          </h3>
          <button className="text-sm text-blue-500 hover:text-blue-600">
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">sich gewöhnen an</span>
              <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">B1</span>
            </div>
            <p className="text-sm text-gray-500">to get used to</p>
            <p className="text-xs text-gray-400 mt-1">Ich muss mich an das Wetter gewöhnen.</p>
          </div>
          <div className={`p-3 rounded-lg ${darkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium">meiner Meinung nach</span>
              <span className="text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full">idiom</span>
            </div>
            <p className="text-sm text-gray-500">in my opinion</p>
            <p className="text-xs text-gray-400 mt-1">Meiner Meinung nach ist das richtig.</p>
          </div>
        </div>
      </div>
    </div>
  );
};