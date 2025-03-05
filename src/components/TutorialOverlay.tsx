import React from 'react';
import { X, Book, Brain, Trophy, Search, Bookmark, Sparkles, Info } from 'lucide-react';

interface TutorialOverlayProps {
  path: string;
  onClose: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ path, onClose }) => {
  const getTutorialContent = () => {
    switch (path) {
      case '/':
        return {
          title: 'Welkom bij DUB5 - Duits Leren',
          icon: <Info className="w-8 h-8 text-sky-300" />,
          steps: [
            'Klik op een van de knoppen om te beginnen met leren',
            'Woordenschat Training helpt je nieuwe Duitse woorden te leren',
            'Grammatica Lessen legt de Duitse grammaticaregels uit',
            'Oefentoetsen test je kennis met volledige examens',
            'Gebruik Zoeken om specifieke woorden of regels te vinden',
            'Sla je favoriete woorden op in Bladwijzers'
          ]
        };
      case '/vocabulary':
        return {
          title: 'Woordenschat Training',
          icon: <Book className="w-8 h-8 text-sky-300" />,
          steps: [
            'Kies een leermethode: Leermodus, Meerkeuze of Schrijfmodus',
            'In Leermodus zie je eerst het woord en de vertaling',
            'Bij Meerkeuze kies je de juiste vertaling uit opties',
            'In Schrijfmodus typ je zelf de vertaling',
            'Je kunt woorden opslaan door op het bladwijzer-icoon te klikken',
            'Je voortgang wordt bijgehouden en opgeslagen'
          ]
        };
      case '/grammar':
        return {
          title: 'Grammatica Lessen',
          icon: <Brain className="w-8 h-8 text-sky-300" />,
          steps: [
            'Kies een moeilijkheidsgraad: Beginner, Gemiddeld of Gevorderd',
            'Selecteer een grammaticaregel om te bestuderen',
            'Lees de uitleg en bekijk de voorbeelden',
            'Oefen met de oefeningen onder elke regel',
            'Sla belangrijke regels op met het bladwijzer-icoon',
            'Gebruik de zoekfunctie om specifieke regels te vinden'
          ]
        };
      case '/tests':
        return {
          title: 'Oefentoetsen',
          icon: <Trophy className="w-8 h-8 text-sky-300" />,
          steps: [
            'Kies tussen Snelle Tests of Volledige Examens',
            'Snelle Tests duren 5-10 minuten en focussen op één onderwerp',
            'Volledige Examens testen je kennis van meerdere onderwerpen',
            'Je resultaten worden opgeslagen en getoond in je voortgang',
            'Probeer verschillende niveaus om je kennis te verbeteren',
            'Herhaal tests om je score te verbeteren'
          ]
        };
      case '/search':
        return {
          title: 'Zoeken',
          icon: <Search className="w-8 h-8 text-sky-300" />,
          steps: [
            'Typ een zoekterm in het zoekveld',
            'Zoek naar Duitse woorden, Nederlandse vertalingen of categorieën',
            'Resultaten worden getoond in Woordenschat en Grammatica secties',
            'Klik op een resultaat voor meer details',
            'Gebruik de X-knop om je zoekopdracht te wissen',
            'Druk op Enter of klik op Zoek om te zoeken'
          ]
        };
      case '/bookmarks':
        return {
          title: 'Bladwijzers',
          icon: <Bookmark className="w-8 h-8 text-sky-300" />,
          steps: [
            'Hier vind je al je opgeslagen woorden en grammaticaregels',
            'Woorden en regels worden gesorteerd in aparte secties',
            'Klik op het prullenbak-icoon om een bladwijzer te verwijderen',
            'Om nieuwe bladwijzers toe te voegen, gebruik het bladwijzer-icoon op andere pagina\'s',
            'Je bladwijzers worden automatisch opgeslagen',
            'Gebruik bladwijzers om moeilijke woorden of regels later te bestuderen'
          ]
        };
      case '/ai-tutor':
        return {
          title: 'AI Tutor',
          icon: <Sparkles className="w-8 h-8 text-sky-300" />,
          steps: [
            'Stel vragen over de Duitse taal aan je persoonlijke AI-tutor',
            'De AI kan helpen met woordenschat, grammatica en uitspraak',
            'Typ je vraag in het tekstveld en druk op Enter of klik op de verzendknop',
            'De AI zal antwoorden met uitleg en voorbeelden',
            'Je kunt doorvragen voor meer details of uitleg',
            'Je gesprek wordt opgeslagen tijdens je sessie'
          ]
        };
      default:
        return {
          title: 'Welkom bij DUB5',
          icon: <Info className="w-8 h-8 text-sky-300" />,
          steps: [
            'Gebruik de navigatie om door de app te bladeren',
            'Klik op de knoppen om verschillende functies te verkennen',
            'Je voortgang wordt automatisch opgeslagen',
            'Veel plezier met het leren van Duits!'
          ]
        };
    }
  };

  const tutorial = getTutorialContent();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 rounded-xl max-w-2xl w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            {tutorial.icon}
            <h2 className="text-2xl font-['DM_Serif_Display']">{tutorial.title}</h2>
          </div>
          <p className="text-sky-100">Hier is hoe je deze pagina kunt gebruiken:</p>
        </div>
        
        <div className="space-y-4">
          {tutorial.steps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="bg-sky-500/30 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-sky-100">{step}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-lg transition-colors"
          >
            Begrepen!
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;
