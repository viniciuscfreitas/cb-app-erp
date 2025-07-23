import React from 'react';
import { Card } from '../ui/Card';

const SummaryCard = ({ 
  title, 
  value, 
  icon, 
  gradient, 
  onClick,
  className = '' 
}) => {
  const gradients = {
    blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
    green: 'bg-gradient-to-br from-green-500 to-green-600',
    purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
    yellow: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
  };

  const gradientClass = gradients[gradient] || gradients.blue;

  return (
    <Card 
      className={`${gradientClass} text-white cursor-pointer hover:shadow-md transition-all duration-200 ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `${title}: ${value}` : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold">
            {typeof value === 'number' && value >= 1000 
              ? value.toLocaleString('pt-BR')
              : value
            }
          </p>
        </div>
        <div className="text-3xl opacity-80">
          <span className="material-icons" aria-hidden="true">{icon}</span>
        </div>
      </div>
    </Card>
  );
};

export default SummaryCard; 