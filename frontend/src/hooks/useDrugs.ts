import { useState, useEffect, useCallback } from 'react';
import { Drug, PaginatedResponse, FindDrugsQuery } from '../types';
import { API_CONFIG } from '../config/api';

const API_BASE_URL = API_CONFIG.BASE_URL;

interface UseDrugsResult {
  drugs: Drug[];
  loading: boolean;
  error: string | null;
  meta: PaginatedResponse<Drug>['meta'] | null;
  refetch: () => void;
}

export const useDrugs = (query?: FindDrugsQuery): UseDrugsResult => {
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<PaginatedResponse<Drug>['meta'] | null>(null);

  const fetchDrugs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (query?.company) params.append('company', query.company);
      if (query?.sortBy) params.append('sortBy', query.sortBy);
      if (query?.order) params.append('order', query.order);
      if (query?.page) params.append('page', query.page.toString());
      if (query?.limit) params.append('limit', query.limit.toString());

      const queryString = params.toString();
      const url = `${API_BASE_URL}/drugs${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: PaginatedResponse<Drug> = await response.json();
      setDrugs(data.data);
      setMeta(data.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching drugs');
      console.error('Error fetching drugs:', err);
    } finally {
      setLoading(false);
    }
  }, [query?.company, query?.sortBy, query?.order, query?.page, query?.limit]);

  useEffect(() => {
    fetchDrugs();
  }, [fetchDrugs]);

  return {
    drugs,
    loading,
    error,
    meta,
    refetch: fetchDrugs,
  };
};

