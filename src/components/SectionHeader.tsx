import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  eyebrow?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  highlightWord?: string;
  highlightColor?: 'golden' | 'nature' | 'green' | 'heritage';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  icon: Icon,
  eyebrow,
  align = 'center',
  className = '',
  titleClassName = '',
  highlightWord,
  highlightColor = 'green'
}) => {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[align];

  const highlightColorClass = {
    golden: 'text-golden',
    nature: 'text-nature',
    green: 'text-green-600',
    heritage: 'text-heritage'
  }[highlightColor];

  const renderTitle = () => {
    if (!highlightWord) {
      return title;
    }

    const isWhiteText = className.includes('text-white');
    const normalTextColor = isWhiteText ? 'text-white' : 'text-[#8B4513]';

    const parts = title.split(new RegExp(`(${highlightWord})`, 'gi'));
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === highlightWord.toLowerCase() ? (
            <span key={index} className={highlightColorClass}>
              {part}
            </span>
          ) : (
            <span key={index} className={normalTextColor}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className={`${alignClass} ${className}`}>
      {/* Eyebrow Label with Icon - Exact Image Style (Orange Color) */}
      {eyebrow && (
        <div className={`flex items-center ${align === 'center' ? 'justify-center' : align === 'left' ? 'justify-start' : 'justify-end'} gap-2 mb-4`}>
          {Icon && <Icon className={`w-5 h-5 stroke-[2.5] ${className.includes('text-white') ? 'text-orange-400' : 'text-orange-500'}`} />}
          <span className={`text-xs font-bold tracking-widest uppercase ${className.includes('text-white') ? 'text-orange-400' : 'text-orange-500'}`}>
            {eyebrow}
          </span>
        </div>
      )}

      {/* Main Title - Exact Image Style (Brown/Green Split) */}
      <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-tight ${titleClassName}`}>
        {highlightWord ? (
          renderTitle()
        ) : (
          <span className={className.includes('text-white') ? 'text-white' : 'text-[#8B4513]'}>{title}</span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p className="text-lg sm:text-xl font-semibold text-heritage/70 mb-4">
          {subtitle}
        </p>
      )}

      {/* Description - Exact Image Style (Medium-dark gray/brown) */}
      {description && (
        <p className="text-[#6B5B4D] text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
