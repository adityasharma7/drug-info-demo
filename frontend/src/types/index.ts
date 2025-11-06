export interface Drug {
  id: string;
  code: string;
  genericName: string;
  company: string;
  brandName: string;
  launchDate: string;
}

export interface TableConfig {
  tableName: string;
  columnKey: string;
  label: string;
  visible: boolean;
  order: number;
  dataType: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface FindDrugsQuery {
  company?: string;
  sortBy?: 'launchDate' | 'createdAt' | 'code' | 'genericName' | 'brandName';
  order?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}

