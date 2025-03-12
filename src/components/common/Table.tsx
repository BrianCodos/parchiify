import React from 'react';

export interface Column<T> {
  header: string;
  key: keyof T | string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  className?: string;
  rowClassName?: string | ((item: T) => string);
}

export function Table<T>({
  data,
  columns,
  onRowClick,
  className = '',
  rowClassName = '',
}: TableProps<T>) {
  return (
    <div className={`bg-dark-secondary rounded-lg overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-dashboard-accent text-dark-text text-left">
              {columns.map((column) => (
                <th
                  key={column.key.toString()}
                  className={`px-6 py-4 ${column.className || ''}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick?.(item)}
                className={`border-t border-dark-accent hover:bg-dark-accent/10 transition-colors duration-200 
                  ${typeof rowClassName === 'function' ? rowClassName(item) : rowClassName}
                  ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((column) => (
                  <td
                    key={`${index}-${column.key.toString()}`}
                    className={`px-6 py-4 ${column.className || ''}`}
                  >
                    {column.render
                      ? column.render(item)
                      : (item[column.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 