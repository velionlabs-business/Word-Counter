import React from 'react';
import { StatCard } from './StatCard';
import type { TextStats } from '../../core/types';
import { 
  FileText, 
  Type, 
  Hash, 
  MessageSquare, 
  Pilcrow, 
  Clock 
} from 'lucide-react';

interface StatPanelProps {
  stats: TextStats;
}

export const StatPanel: React.FC<StatPanelProps> = ({ stats }) => {
  const items = [
    {
      title: 'Words',
      value: stats.wordCount,
      theme: 'violet' as const,
      icon: <FileText className="w-6 h-6" />,
    },
    {
      title: 'Characters',
      value: stats.charCount,
      theme: 'blue' as const,
      icon: <Type className="w-6 h-6" />,
    },
    {
      title: 'Chars (No Spaces)',
      value: stats.charCountNoSpaces,
      theme: 'emerald' as const,
      icon: <Hash className="w-6 h-6" />,
    },
    {
      title: 'Sentences',
      value: stats.sentenceCount,
      theme: 'amber' as const,
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      title: 'Paragraphs',
      value: stats.paragraphCount,
      theme: 'fuchsia' as const,
      icon: <Pilcrow className="w-6 h-6" />,
    },
    {
      title: 'Reading Time',
      value: `${stats.readingTimeMin} min`,
      theme: 'rose' as const,
      icon: <Clock className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full animate-fade-in">
      {items.map((item) => (
        <StatCard
          key={item.title}
          title={item.title}
          value={item.value}
          theme={item.theme}
          icon={item.icon}
        />
      ))}
    </div>
  );
};
