import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Send, User, Bot, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const AiTutorPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hallo! Ik ben DUB5 AI. Hoe kan ik je vandaag helpen met het leren van Duits?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Deze AI assistant is nog niet klaar...😫",
        "WAT JAMMER!!! Deze AI assistant is nog  niet klaar...😭",
        "DUB5 AI is helaas nog niet klaar...😡",
        "DUB5 AI is nog niet klaar...😥",
        "Helaas is DUB5 AI nog niet klaar😢."
      ];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)]
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <Link to="/" className="text-sky-300 hover:text-white transition-colors flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          Terug naar Home
        </Link>
      </div>
      
      <header className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-8 h-8 text-sky-300" />
          <h1 className="text-4xl font-['DM_Serif_Display']">DUB5 AI</h1>
        </div>
        <p className="text-sky-100 mb-4">DUB5 AI kan eigenlijk helemaal niks😭💀</p>
      </header>

      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 p-2">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user' 
                    ? 'bg-sky-500/30 text-white' 
                    : 'bg-white/10 text-sky-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.role === 'user' ? (
                    <>
                      <span className="font-medium">Jij</span>
                      <User className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Bot className="w-4 h-4" />
                      <span className="font-medium">DUB5 AI</span>
                    </>
                  )}
                </div>
                <p>{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-lg p-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>DUB5 AI is aan het typen...</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="border-t border-white/10 pt-4">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Het heeft geen nut 💀..."
              className="w-full p-3 pr-12 rounded-lg bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-sky-400 focus:outline-none transition-all"
            />
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white disabled:text-white/30 p-1"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-sky-200/70 mt-2 text-center">
            DUB5 AI kan eigenlijk helemaal niks 😭💀.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiTutorPage;
