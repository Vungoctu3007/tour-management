import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    TextField,
    Typography,
} from '@mui/material';
import PaginationComponent from '../../../components/Pagination';
import { getListEmployee, searchEmployee } from '../../../services/employeeService';

function ListEmployee() {
    const [employees, setEmployees] = useState([]);
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchEmployeeName, setSearchEmployeeName] = useState('');

    // Debounced search state
    const [debouncedSearchEmployeeName, setDebouncedSearchEmployeeName] = useState(searchEmployeeName);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchEmployeeName(searchEmployeeName);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchEmployeeName]);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                let response;
                if (debouncedSearchEmployeeName) {
                    response = await searchEmployee(debouncedSearchEmployeeName, currentPage, pageSize);
                } else {
                    response = await getListEmployee(currentPage, pageSize);
                }
        
                if (response && response.code === 1000) {
                    setEmployees(response.result.employees || []);
                    setTotalPages(response.result.totalPages || 1);
                } else {
                    setEmployees([]);
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };        

        fetchEmployees();
    }, [currentPage, debouncedSearchEmployeeName]);

    const handleSearchChange = (event) => {
        setSearchEmployeeName(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <Paper>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h2" style={{ fontSize: '24px', fontWeight: 'bold', marginLeft: '16px' }}>
                        LIST EMPLOYEE
                    </Typography>
                    <Box display="flex" justifyContent="center" flexGrow={1}>
                        <TextField
                            variant="outlined"
                            placeholder="Search employees by name"
                            value={searchEmployeeName}
                            onChange={handleSearchChange}
                            style={{ width: '300px', marginRight: '150px' }}
                        />
                    </Box>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell> {/* Cột số thứ tự */}
                                <TableCell>ID</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>User ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map((employee, index) => (
                                <TableRow key={employee.id}>
                                    {/* Tính số thứ tự dựa trên trang hiện tại */}
                                    <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                    <TableCell>{employee.id}</TableCell>
                                    <TableCell>{employee.email || 'N/A'}</TableCell>
                                    <TableCell>{employee.userId || 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </Paper>
        </div>
    );
}

export default ListEmployee;
