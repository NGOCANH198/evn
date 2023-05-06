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
import { useDispatch, useSelector } from "react-redux";
import { setCustomers } from "../../redux/slices/customerSlice";

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
  const [selectedFile, setSelectedFile] = useState(undefined);
  const [isUploading, setUploading] = useState(false);
  // const [customers, setCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customers } = useSelector((state) => state.customer);
  const setCustomerList = (customerList) => {
    dispatch(setCustomers(customerList));
  };
  React.useEffect(() => {
    if (!selectedFile) return;
    setUploading(true);
    const getCustomerList = async () => {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);
        const res = await axios.post(`${baseUrl}/board/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        // const res = await axios.get(`${baseUrl}/invoice/getAll`);
        setCustomerList(res.data);
      } catch (e) {
        alert(e);
      } finally {
        setUploading(false);
      }
    };
    getCustomerList();
  }, [selectedFile]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSearchText(data.get("searchText"));
  };
  const searchResults = customers.filter((customer) => {
    if (customer.username.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    if (customer.customerName.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }
    // if (customer.address.toLowerCase().includes(searchText.toLowerCase())) {
    //   return true;
    // }
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
          sx={{
            width: "100%",
            mt: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Button variant="contained" disabled={isUploading} component="label">
            {isUploading ? "Uploading..." : "Upload file"}
            <input hidden accept="*" type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
          </Button>
          {selectedFile && <div>{selectedFile.name}</div>}
        </Box>
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
                    <TableCell>Kì hoá đơn</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults.map((customer, index) => (
                    <TableRow key={customer.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{customer.username}</TableCell>
                      <TableCell>
                        <Link to={`/updateMeter/${customer.id}`}>{customer.customerName}</Link>
                      </TableCell>
                      <TableCell>{customer.period}</TableCell>
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
