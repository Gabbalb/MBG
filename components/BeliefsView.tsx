import React from 'react';

const BeliefSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md transition-shadow duration-300">
    <h3 className="font-serif text-2xl font-bold text-primary-700 mb-4">{title}</h3>
    <div className="text-stone-600 leading-relaxed text-lg font-light space-y-4">
      {children}
    </div>
  </div>
);

export const BeliefsView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center mb-16">
        <span className="text-primary-600 font-bold tracking-widest text-xs uppercase mb-3 block">Dichiarazione di Fede</span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-stone-900 mb-6">In Chi Crediamo</h1>
        <div className="h-1 w-24 bg-primary-500 mx-auto rounded-full mb-8"></div>
        <p className="text-xl text-stone-500 font-light max-w-2xl mx-auto">
          Le fondamenta su cui costruiamo la nostra vita e il nostro servizio.
        </p>
      </div>
      
      <div className="space-y-8">
        <BeliefSection title="La Bibbia">
          <p>
            Crediamo che la Bibbia sia la Parola di Dio, divinamente ispirata, infallibile e autorevole. È la guida suprema per la nostra fede e la nostra condotta.
          </p>
        </BeliefSection>

        <BeliefSection title="Dio">
          <p>
            Crediamo in un solo Dio, eternamente esistente in tre persone: Padre, Figlio e Spirito Santo. Egli è il Creatore di tutte le cose, santo, infinitamente perfetto e degno di ogni lode.
          </p>
        </BeliefSection>

        <BeliefSection title="Gesù Cristo">
          <p>
            Crediamo nella divinità di nostro Signore Gesù Cristo, nella sua nascita verginale, nella sua vita senza peccato, nei suoi miracoli, nella sua morte vicaria ed espiatoria, nella sua risurrezione corporea, nella sua ascensione alla destra del Padre e nel suo ritorno personale in potenza e gloria.
          </p>
        </BeliefSection>

        <BeliefSection title="La Salvezza">
          <p>
            Crediamo che la salvezza dell'uomo perduto e peccatore sia possibile solo attraverso la rigenerazione da parte dello Spirito Santo, per grazia mediante la fede in Gesù Cristo, e non per opere.
          </p>
        </BeliefSection>

        <BeliefSection title="La Chiesa">
          <p>
            Crediamo nell'unità spirituale dei credenti nel nostro Signore Gesù Cristo, che costituiscono la Chiesa, il corpo di Cristo, chiamata a testimoniare il Vangelo nel mondo.
          </p>
        </BeliefSection>
      </div>
    </div>
  );
};