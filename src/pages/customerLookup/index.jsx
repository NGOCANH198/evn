import React, { useState } from "react";
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
import axios from "axios";
import { baseUrl } from "../../apis/baseUrl";
import { Link, useNavigate } from "react-router-dom";

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
  const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();
  React.useEffect(() => {
    axios.get(`${baseUrl}/getListCustomersInfo`).then((res) => {
      setCustomers(res.data);
    });
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSearchText(data.get("searchText"));
  };
  const searchResults = customers.filter((customer) => {
    if (customer.username.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    if (customer.name.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    if (customer.address.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    return false;
  });
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
          <TextField margin="normal" size="small" id="searchText" placeholder="Tìm kiếm khách hàng" name="searchText" autoFocus sx={{ flex: "1 0 auto" }} />
          <Button type="submit" variant="contained">
            Tìm kiếm
          </Button>
          <Button variant="outlined" onClick={() => navigate("/")}>
            Quay lại
          </Button>
        </Box>
        {searchResults.length > 0 ? (
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
                  {searchResults.map((customer, index) => (
                    <TableRow key={customer.username} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{customer.username}</TableCell>
                      <TableCell>
                        <Link to={`/updateMeter/${customer.username}`}>{customer.name}</Link>
                      </TableCell>
                      <TableCell>{customer.address}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ) : (
          <div>Không có kết quả nào</div>
        )}
      </Box>
    </Container>
  );
}
