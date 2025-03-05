import React from 'react';
import { X } from 'lucide-react';
import config from '../config';

interface SettingsModalProps {
  onClose: () => void;
  settings?: {
    randomizeWordOrder: boolean;
    showExampleSentence: boolean;
    timerEnabled: boolean;
    skipQuestionEnabled: boolean;
    checkAccents: boolean;
    checkCapitalization: boolean;
    checkPunctuation: boolean;
  };
  onSettingChange?: (setting: string, value: boolean) => void;
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange, disabled = false }) => {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/10">
      <span className="text-white">{label}</span>
      <button
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-green-500' : 'bg-gray-500'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        disabled={disabled}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, settings, onSettingChange }) => {
  // Use provided settings or default to config values
  const currentSettings = settings || {
    randomizeWordOrder: config.learning.randomize_word_order,
    showExampleSentence: config.learning.show_example_sentence,
    timerEnabled: config.learning.timer_enabled,
    skipQuestionEnabled: config.learning.skip_question_enabled,
    checkAccents: config.learning.check_accents,
    checkCapitalization: config.learning.check_capitalization,
    checkPunctuation: config.learning.check_punctuation
  };

  const toggleSetting = (setting: string, value: boolean) => {
    if (onSettingChange) {
      onSettingChange(setting, value);
    } else {
      console.log(`Toggling setting ${setting} to ${value}`);
      // In a real app, this would update the state and possibly save to localStorage
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 rounded-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-['DM_Serif_Display']">Instellingen</h2>
          <p className="text-sky-100 text-sm">Pas je leerervaring aan</p>
        </div>
        
        <div className="space-y-1">
          <Toggle 
            label="Willekeurige volgorde van woorden" 
            checked={currentSettings.randomizeWordOrder}
            onChange={(value) => toggleSetting('randomizeWordOrder', value)}
          />
          
          {config.learning.show_example_sentence && (
            <Toggle 
              label="Voorbeeldzin tonen" 
              checked={currentSettings.showExampleSentence}
              onChange={(value) => toggleSetting('showExampleSentence', value)}
            />
          )}
          
          <Toggle 
            label="Timer tonen" 
            checked={currentSettings.timerEnabled}
            onChange={(value) => toggleSetting('timerEnabled', value)}
          />
          
          <Toggle 
            label="Vragen overslaan toestaan" 
            checked={currentSettings.skipQuestionEnabled}
            onChange={(value) => toggleSetting('skipQuestionEnabled', value)}
          />
          
          <Toggle 
            label="Controleer op accenten, trema's en umlauten" 
            checked={currentSettings.checkAccents}
            onChange={(value) => toggleSetting('checkAccents', value)}
          />
          
          <Toggle 
            label="Controleer op hoofdletters" 
            checked={currentSettings.checkCapitalization}
            onChange={(value) => toggleSetting('checkCapitalization', value)}
          />
          
          <Toggle 
            label="Controleer op leestekens" 
            checked={currentSettings.checkPunctuation}
            onChange={(value) => toggleSetting('checkPunctuation', value)}
          />
        </div>
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-sky-500 hover:bg-sky-400 text-white rounded-lg transition-colors"
          >
            Opslaan
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
