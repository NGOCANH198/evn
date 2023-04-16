import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { Button, Paper, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import MuiTableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import styled from "@emotion/styled";

const customers = [
  {
    id: "HNHD01",
    name: "Nguyễn Ngọc Ánh",
    address: "Trần Phú - Mộ Lao - Hà Đông - Hà Nội",
  },
  {
    id: "HNHD02",
    name: "Phạm Thuỳ Linh",
    address: "Đặng Văn Ngữ - Trung Tự - Đống Đa - Hà Nội",
  },
];

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TableRow = styled(MuiTableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function CustomerLookup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      userId: data.get("userId"),
      password: data.get("password"),
    });
  };
  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Tìm kiếm khách hàng
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            width: "100%",
            mt: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TextField
            margin="normal"
            size="small"
            id="searchText"
            placeholder="Tìm kiếm khách hàng"
            name="searchText"
            autoFocus
            sx={{ flex: "1 0 auto" }}
          />
          <Button type="submit" variant="contained">
            Tìm kiếm
          </Button>
        </Box>
        <Box sx={{ mt: 4 }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Mã khách hàng</TableCell>
                  <TableCell>Tên khách hàng</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer, index) => (
                  <TableRow
                    key={customer.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
}
