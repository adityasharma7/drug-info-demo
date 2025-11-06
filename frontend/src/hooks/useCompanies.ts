import { useState, useEffect, useCallback } from 'react';
import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;
interface UseCompaniesResult {
    companies: string[];
    loading: boolean;
    error: string | null;
    refetch: () => void;
  }
  
  export const useCompanies = (): UseCompaniesResult => {
    const [companies, setCompanies] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchCompanies = useCallback(async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(`${API_BASE_URL}/drugs/companies`);
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data: string[] = await response.json();
        setCompanies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred while fetching companies');
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      fetchCompanies();
    }, [fetchCompanies]);
  
    return {
      companies,
      loading,
      error,
      refetch: fetchCompanies,
    };
  };
  
  