import React from 'react';
import { Book, Brain, Trophy, Search, Bookmark, Sparkles } from 'lucide-react';
import NavButton from '../components/NavButton';
import TestInfoBar from '../components/TestInfoBar';
import config from '../config';

const HomePage: React.FC = () => {
  return (
    <>
      <header className="text-center mb-12">
        <h1 className="text-8xl font-normal mb-4 font-['DM_Serif_Display']">{config.app.name}</h1>
        <h1 className="text-8xl font-normal mb-4 font-['DM_Serif_Display']">{config.app.title}</h1>
        <div className="text-4xl mb-4">★★★★★</div>
        <h3 className="text-3xl font-semibold mb-12 text-sky-100">
          {config.app.subtitle}
        </h3>
      </header>

      {config.app.display_test_info && <TestInfoBar />}

      <nav className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-40">
        <NavButton
          title="Woordenlijst Leren"
          description={config.features.vocabulary.description}
          icon={<Book className="w-6 h-6" />}
          path={config.features.vocabulary.path}
          modes={config.features.vocabulary.modes}
          isNew={config.features.vocabulary.isNew}
        />
        <NavButton
          title={config.features.grammar.title}
          description={config.features.grammar.description}
          icon={<Brain className="w-6 h-6" />}
          path={config.features.grammar.path}
          isNew={config.features.grammar.isNew}
        />
        <NavButton
          title={config.features.tests.title}
          description={config.features.tests.description}
          icon={<Trophy className="w-6 h-6" />}
          path={config.features.tests.path}
          isNew={config.features.tests.isNew}
        />
        <NavButton
          title={config.features.search.title}
          description={config.features.search.description}
          icon={<Search className="w-6 h-6" />}
          path={config.features.search.path}
          isNew={config.features.search.isNew}
        />
        <NavButton
          title={config.features.bookmarks.title}
          description={config.features.bookmarks.description}
          icon={<Bookmark className="w-6 h-6" />}
          path={config.features.bookmarks.path}
          isNew={config.features.bookmarks.isNew}
        />
        <NavButton
          title={config.features.aiTutor.title}
          description={config.features.aiTutor.description}
          icon={<Sparkles className="w-6 h-6" />}
          path={config.features.aiTutor.path}
          isNew={config.features.aiTutor.isNew}
        />
      </nav>
    </>
  );
};

export default HomePage;
