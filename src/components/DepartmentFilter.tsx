import React from 'react';
import { Department, DepartmentId } from '../types';
import { IconRenderer } from './IconRenderer';

interface DepartmentFilterProps {
  departments: Department[];
  selectedDept: DepartmentId | 'all';
  onSelectDept: (deptId: DepartmentId | 'all') => void;
  linkCounts: Record<string, number>;
}

export const DepartmentFilter: React.FC<DepartmentFilterProps> = ({
  departments,
  selectedDept,
  onSelectDept,
  linkCounts
}) => {
  const totalCount = Object.values(linkCounts).reduce((a: number, b: number) => a + (typeof b === 'number' ? b : 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none pt-1">
        
        {/* Department Pills */}
        {departments.filter(d => d.name !== 'ทั้งบริษัท').map((dept) => {
          const count = linkCounts[dept.id] || 0;
          const isSelected = selectedDept === dept.id;

          return (
            <button
              key={dept.id}
              onClick={() => onSelectDept(dept.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all whitespace-nowrap shrink-0 border ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400 shadow-lg shadow-blue-500/20 scale-105'
                  : 'bg-slate-900/80 text-blue-200/80 hover:bg-blue-900/40 hover:text-white border-blue-800/60'
              }`}
            >
              <IconRenderer name={dept.iconName} className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-blue-400'}`} />
              <span>{dept.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono ${
                isSelected ? 'bg-white/20 text-white' : 'bg-blue-950 text-blue-300 border border-blue-800'
              }`}>
                {count}
              </span>
            </button>
          );
        })}

      </div>
    </div>
  );
};
