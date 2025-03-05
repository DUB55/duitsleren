/**
 * Application Configuration
 * 
 * This file contains configuration settings for the application.
 * Edit this file to control which features are marked as new and other settings.
 */

const config = {
  // Feature flags and settings
  features: {
    vocabulary: {
      isNew: true,
      enabled: true,
      title: "Woordenlijst",
      description: "Alle Duitse woorden leren",
      modes: [
        "Leren - Alle woorden leren",
        "Meerkeuze - Meerkeuzevragen",
        "Schrijven - Alle woorden schrijven"
      ],
      path: "/vocabulary"
    },
    wordList: {
      isNew: false,
      enabled: true,
      title: "Woordenlijst Overzicht",
      description: "Een overzicht van alle woorden die je moet leren",
      path: "/word-list"
    },
    grammar: {
      isNew: false,
      enabled: true,
      title: "Grammatica",
      description: "Grammatica leren",
      path: "/grammar"
    },
    tests: {
      isNew: false,
      enabled: true,
      title: "Oefentoetsen",
      description: "Oefentoetsen maken",
      path: "/tests"
    },
    search: {
      isNew: false,
      enabled: true,
      title: "Zoeken",
      description: "Woorden uit de woordenlijst zoeken",
      path: "/search"
    },
    bookmarks: {
      isNew: false,
      enabled: true,
      title: "Opgeslagen woorden",
      description: "Je opgeslagen woorden",
      path: "/bookmarks"
    },
    aiTutor: {
      isNew: true,
      enabled: true,
      title: "DUB5 AI - Duits",
      description: "DUB5 AI om je te helpen met Duits",
      path: "/ai-tutor"
    }
  },
  
  // Application settings
  app: {
    name: "DUB5",
    title: "Duits Leren",
    subtitle: "Leren voor Duits",
    copyright: "© 2025 DUB5. All rights reserved.",
    showLoadingIndicators: true,
    showUserFeedback: false,
    logErrors: true,
    showTutorials: false,
    same_button_size: false,
    display_bekijk_leermethoden: true,
    display_test_info: true,
    test_info_text: "Voor de toets moet je alle woorden uit de woordenlijst kennen. Daarnaast moet je de grammaticaregels beheersen en kunnen toepassen. Besteed extra aandacht aan de werkwoordvervoegingen en het gebruik van de juiste lidwoorden. Zorg ervoor dat je de verschillende naamvallen (Nominativ, Akkusativ, Dativ) goed kent en kunt toepassen in zinnen. Oefen ook met het schrijven van korte teksten waarin je de geleerde woorden en grammatica gebruikt."
  },
  
  // SEO settings
  seo: {
    title: "DUB5 - Duits Leren",
    description: "Leer Duits op een effectieve en interactieve manier met DUB5. Woordenschat, grammatica, oefentoetsen en meer.",
    keywords: "Duits leren, Duitse taal, woordenschat, grammatica, taalcursus, online leren",
    author: "DUB5",
    ogImage: "https://images.unsplash.com/photo-1527866959252-deab85ef7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
  },

  // Learning settings
  learning: {
    show_example_sentence: true,
    remember_progress: true,
    show_word_list_sidebar: true,
    learn_both_directions: true,
    randomize_word_order: true,
    show_pronunciation_audio: true,
    skip_question_enabled: true,
    timer_enabled: true,
    check_accents: true,
    check_capitalization: true,
    check_punctuation: true
  }
};

export default config;
