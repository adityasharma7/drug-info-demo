import { useState, useMemo, useCallback } from 'react';
import {
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TablePagination,
  Button,
  Typography,
} from '@mui/material';
import { useDrugs, useCompanies, useTableConfig } from '../hooks';
import { Drug } from '../types';

/**
 * DrugsList component with dynamic table configuration
 * Displays drugs in a table with company filtering and pagination
 */
export const DrugsList = () => {
  const [company, setCompany] = useState<string>('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { configs: tableConfig, loading: tableConfigLoading, error: tableConfigError } = useTableConfig('drug');

  const { drugs, loading: drugsLoading, error: drugsError, meta, refetch } = useDrugs({
    company: company || undefined,
    page: page + 1,
    limit: rowsPerPage,
    sortBy: "launchDate",
    order: "DESC",
  });

  // Fetch companies for the filter dropdown
  const { companies, loading: companiesLoading } = useCompanies();

  const visibleColumns = useMemo(() => {
    return tableConfig
      .filter(config => config.visible)
      .sort((a, b) => a.order - b.order);
  }, [tableConfig]);

  const isLoading = useMemo(() => {
    return tableConfigLoading || (drugsLoading && drugs.length === 0);
  }, [tableConfigLoading, drugsLoading, drugs.length]);

  const error = useMemo(() => {
    return tableConfigError || drugsError;
  }, [tableConfigError, drugsError]);

  // Format date as DD.MM.YYYY
  const formatDate = useCallback((dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }, []);

  // Helper function to get value from drug object by column key
  const getCellValue = useCallback((drug: Drug, columnKey: string): string => {
    switch (columnKey) {
      case 'name':
        return `${drug.genericName} (${drug.brandName})`;
      case 'launchDate':
        return formatDate(drug.launchDate);
      default:
        return drug[columnKey as keyof Drug];
    }
  }, [formatDate]);

  // Handler for pagination page change
  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  // Handler for rows per page change
  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  // Handler for clicking on a company name in the table
  const handleCompanyClick = useCallback((companyName: string) => {
    setCompany(companyName);
    setPage(0);
  }, []);

  // Handler for company filter change
  const handleCompanyChange = useCallback((value: string) => {
    setCompany(value);
    setPage(0);
    refetch();
  }, [refetch]);
  
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error" action={
          <Button color="inherit" size="small" onClick={refetch}>
            Retry
          </Button>
        }>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        Drugs List
      </Typography>

      {/* Filters */}
      <Box display="flex" gap={2} mb={2} flexWrap="wrap">
        <FormControl sx={{ minWidth: 200 }} disabled={companiesLoading}>
          <InputLabel>Company</InputLabel>
          <Select
            value={company}
            label="Company"
            onChange={(e) => handleCompanyChange(e.target.value)}
          >
            <MenuItem value="">
              <em>All Companies</em>
            </MenuItem>
            {companies.map((company) => (
              <MenuItem key={company} value={company}>
                {company}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {visibleColumns.map((config) => (
                <TableCell key={config.columnKey}>
                  {config.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {drugs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={visibleColumns.length} align="center">
                  <Typography variant="body2" color="text.secondary" py={2}>
                    No drugs found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              drugs.map((drug) => (
                <TableRow key={drug.id} hover>
                  {visibleColumns.map((config) => (
                    <TableCell key={`${drug.id}-${config.columnKey}`}>
                      {config.columnKey === 'company' ? (
                        <Typography
                          component="span"
                          sx={{
                            color: 'primary.main',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            '&:hover': {
                              color: 'primary.dark',
                              textDecoration: 'underline',
                            },
                          }}
                          onClick={() => handleCompanyClick(drug.company)}
                        >
                          {getCellValue(drug, config.columnKey)}
                        </Typography>
                      ) : (
                        getCellValue(drug, config.columnKey)
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {meta && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
          component="div"
          count={meta.total}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Box>
  );
};

