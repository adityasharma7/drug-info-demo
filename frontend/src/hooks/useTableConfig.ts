import { useState, useEffect, useCallback } from 'react';
import { TableConfig } from '../types';
import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

interface UseTableConfigResult {
  configs: TableConfig[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to fetch table configuration for a specific table
 */
export const useTableConfig = (tableName: string): UseTableConfigResult => {
  const [configs, setConfigs] = useState<TableConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    if (!tableName) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/table-config/table/${tableName}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: TableConfig[] = await response.json();
      // Sort by order field
      const sortedData = data.sort((a, b) => a.order - b.order);
      setConfigs(sortedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching table config');
      console.error('Error fetching table config:', err);
    } finally {
      setLoading(false);
    }
  }, [tableName]);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return {
    configs,
    loading,
    error,
    refetch: fetchConfig,
  };
};

