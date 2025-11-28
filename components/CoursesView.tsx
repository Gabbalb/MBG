import React from 'react';
import { Clock, Users, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface Course {
  title: string;
  description: string;
  duration: string;
  level: string;
  status: 'Open' | 'Coming Soon' | 'Closed';
  image: string;
}

const courses: Course[] = [
  { 
    title: "Fondamenti di Studio Biblico", 
    description: "Impara metodi efficaci per osservare, interpretare e applicare le Scritture autonomamente. Un corso essenziale per ogni credente.",
    duration: "8 Settimane", 
    level: "Principiante", 
    status: "Open",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Teologia Sistematica 1", 
    description: "Un'esplorazione approfondita delle dottrine fondamentali della fede cristiana: la dottrina di Dio, delle Scritture e di Cristo.",
    duration: "12 Settimane", 
    level: "Intermedio", 
    status: "Coming Soon",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Storia della Chiesa", 
    description: "Un viaggio attraverso i secoli per comprendere le radici della nostra fede e come Dio ha guidato il suo popolo nella storia.",
    duration: "6 Settimane", 
    level: "Tutti i livelli", 
    status: "Closed",
    image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Evangelizzazione Pratica", 
    description: "Supera la paura e impara a condividere la tua fede in modo naturale, rispettoso ed efficace nella vita di tutti i giorni.",
    duration: "4 Settimane", 
    level: "Principiante", 
    status: "Open",
    image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&q=80&w=800"
  },
];

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  const statusColors = {
    'Open': 'bg-emerald-100 text-emerald-800',
    'Coming Soon': 'bg-amber-100 text-amber-800',
    'Closed': 'bg-stone-100 text-stone-500'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300">
      <div className="h-48 overflow-hidden relative">
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${statusColors[course.status]}`}>
          {course.status}
        </div>
        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">{course.title}</h3>
        <p className="text-stone-600 text-sm mb-6 flex-grow leading-relaxed">{course.description}</p>
        
        <div className="flex items-center justify-between text-xs text-stone-500 mb-6 font-medium">
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            {course.duration}
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={14} />
            {course.level}
          </div>
        </div>

        <Button 
          variant={course.status === 'Open' ? 'primary' : 'secondary'} 
          className="w-full justify-center"
          disabled={course.status === 'Closed'}
        >
          {course.status === 'Open' ? 'Iscriviti Ora' : (course.status === 'Coming Soon' ? 'Avvisami' : 'Iscrizioni Chiuse')}
        </Button>
      </div>
    </div>
  );
};

export const CoursesView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
       <div className="text-center mb-16">
        <span className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-3 block">Formazione</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-6">I Nostri Corsi</h1>
        <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full mb-8"></div>
        <p className="text-xl text-stone-500 font-light max-w-2xl mx-auto">
          Percorsi di formazione disegnati per approfondire la conoscenza biblica, crescere spiritualmente e servire meglio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, idx) => (
            <CourseCard key={idx} course={course} />
        ))}
      </div>
    </div>
  );
};