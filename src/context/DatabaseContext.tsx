import React, { createContext, useContext, useEffect, useState } from 'react';
import { DatabaseService } from '../services/database/types';
import { indexedDBService } from '../services/database/indexedDB';

interface DatabaseContextType {
  db: DatabaseService;
  isInitialized: boolean;
  error: Error | null;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        await indexedDBService.initialize();
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize database'));
      }
    };

    initDB();
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        db: indexedDBService,
        isInitialized,
        error,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}; 