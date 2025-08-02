import React from 'react';

type DayCardProps = {
  day: string;
  activities: string[];
};

export const DayCard: React.FC<DayCardProps> = ({ day, activities }) => {
  return (
    <div className="day-card">
      <h2>{day}</h2>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
};
