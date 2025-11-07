import { TableConfig, Drug } from '../../types';

export const mockTableConfig: TableConfig[] = [
  {
    tableName: 'drug',
    columnKey: 'id',
    label: 'Id',
    visible: true,
    order: 1,
    dataType: 'uuid',
  },
  {
    tableName: 'drug',
    columnKey: 'code',
    label: 'Drug Code',
    visible: true,
    order: 2,
    dataType: 'string',
  },
  {
    tableName: 'drug',
    columnKey: 'name',
    label: 'Name',
    visible: true,
    order: 3,
    dataType: 'string',
  },
  {
    tableName: 'drug',
    columnKey: 'company',
    label: 'Company',
    visible: true,
    order: 4,
    dataType: 'string',
  },
  {
    tableName: 'drug',
    columnKey: 'launchDate',
    label: 'Launch Date',
    visible: true,
    order: 5,
    dataType: 'date',
  },
];

export const mockDrugs: Drug[] = [
  {
    id: '1',
    code: '0006-0568',
    genericName: 'vorinostat',
    brandName: 'ZOLINZA',
    company: 'Merck Sharp & Dohme Corp.',
    launchDate: '2004-02-14T23:01:10Z',
  },
  {
    id: '2',
    code: '68828-192',
    genericName: 'Avobenzone, Octinoxate, Octisalate, Octocrylene',
    brandName: 'CC Cream Complexion Corrector Medium Dark Broad Spectrum SPF 15',
    company: 'Jafra cosmetics International',
    launchDate: '2011-02-02T08:57:26Z',
  },
];

export const mockCompanies = [
  'Merck Sharp & Dohme Corp.',
  'Jafra cosmetics International',
  'Johnson & Johnson',
];

export const mockMeta = {
  total: 20,
  page: 1,
  limit: 10,
  totalPages: 2,
};