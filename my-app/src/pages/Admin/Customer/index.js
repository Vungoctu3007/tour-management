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
import Notification from '../../../components/Notification';
import { getListCustomer, searchCustomer } from '../../../services/customerService';

function ListCustomer() {
    const [customers, setCustomers] = useState([]);
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchCustomerName, setSearchCustomerName] = useState('');
    const [debouncedSearchCustomerName, setDebouncedSearchCustomerName] = useState(searchCustomerName);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchCustomerName(searchCustomerName);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchCustomerName]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                let response;
                if (debouncedSearchCustomerName) {
                    response = await searchCustomer(debouncedSearchCustomerName, currentPage, pageSize);
                } else {
                    response = await getListCustomer(currentPage, pageSize);
                }

                if (response && response.code === 1000) {
                    setCustomers(response.result.customers || []);
                    setTotalPages(response.result.totalPages || 1);
                } else {
                    setCustomers([]);
                    setTotalPages(1);
                }
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, [currentPage, debouncedSearchCustomerName]);

    const handleSearchChange = (event) => {
        setSearchCustomerName(event.target.value);
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
                        LIST CUSTOMER
                    </Typography>
                    <Box display="flex" justifyContent="center" flexGrow={1}>
                        <TextField
                            variant="outlined"
                            placeholder="Search customers by username"
                            value={searchCustomerName}
                            onChange={handleSearchChange}
                            style={{ width: '300px', marginRight: '150px' }}
                        />
                    </Box>
                </Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell> {/* Thêm tiêu đề cho cột Số Thứ Tự */}
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Address</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((customer, index) => (
                                <TableRow key={customer.id}>
                                    {/* Tính toán số thứ tự */}
                                    <TableCell>{(currentPage - 1) * pageSize + index + 1}</TableCell>
                                    <TableCell>{customer.id}</TableCell>
                                    <TableCell>{customer.name || 'N/A'}</TableCell>
                                    <TableCell>{customer.email || 'N/A'}</TableCell>
                                    <TableCell>{customer.phone || 'N/A'}</TableCell>
                                    <TableCell>{customer.address || 'N/A'}</TableCell>
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

            <Notification
                open={false}
                message=""
                onClose={() => {}}
            />
        </div>
    );
}

export default ListCustomer;
