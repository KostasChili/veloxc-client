import { useRetrieveAppointmentsQuery } from "../appointments/appointmentsApiSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

const ShopPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useRetrieveAppointmentsQuery(id, {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectValue, setSelectValue] = useState("customerName");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filterByName = () => {
    filteredData = data.appointments.map((ap) => {
      if (ap.customerName.includes(searchTerm)) return ap;
      else return null;
    });
  };
  const filterByService = () => {
    filteredData = data.appointments.map((ap) => {
      if (ap.service.includes(searchTerm)) return ap;
      else return null;
    });
  };

  const filterDate = () => {
    filteredData = data.appointments.map((ap) => {
      if (ap.date.includes(searchTerm)) return ap;
      else return null;
    });
  };

  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isSuccess) {
    var filteredData = data.appointments;

    if (searchTerm !== "" && selectValue === "customerName") {
      filterByName();
    } else if (searchTerm !== "" && selectValue === "service") {
      filterByService();
    } else if (searchTerm !== "" && selectValue === "date") {
      filterDate();
    }

    const tableContent = filteredData.map((d) =>
      d ? (
        <TableRow key={d._id}>
          <TableCell align="center">{d.customerName}</TableCell>
          <TableCell align="center">{d.email}</TableCell>
          <TableCell align="center">{d.service}</TableCell>
          <TableCell align="center">{d.comments?d.comments:"κανένα σχόλιο"}</TableCell>
          <TableCell align="center">{d.date}</TableCell>
          <TableCell align="center">{d.startTime}</TableCell>
          <TableCell align="center">{d.endTime}</TableCell>
          <TableCell align="center">
            {new Date(d.createdAt).toLocaleString("el-GB", {
              day: "numeric",
              month: "long",
            })}
          </TableCell>
          <TableCell align="center">
            {d.active ? "ενεργό" : "ακυρωμένο"}
          </TableCell>
        </TableRow>
      ) : null
    );

    const headCells = [
      "Όνομα Πελάτη",
      "Υπηρεσία",
      "Σχόλια Ραντεβού",
      "Ημερομηνία",
      "Ώρα Εναρξης",
      "Ώρα Λήξης",
      "Δημιουργήθηκε",
      "Κατάσταστη",
    ];

    content = (
      <>
        
        <Typography variant="h2" >{data?.title}</Typography>
        <Typography variant="h6">Όλα τα ρανεβού </Typography>
        <TextField size="small"
          variant="outlined"
          id="search"
          label="αναζήτηση"
          value={searchTerm}
          onChange={handleSearch}
        ></TextField>
        <FormControl size="small">
          <InputLabel id="short-with-label">Με </InputLabel>
          <Select
            labelId="short-with-label"
            id="short-with"
            value={selectValue}
            label="Όνομα Πελάτη"
            onChange={(e)=>{setSelectValue(e.target.value); setSearchTerm("")}}
          >
            <MenuItem value="customerName">Όνομα Πελάτη</MenuItem>
            <MenuItem value="service">Υπηρεσία</MenuItem>
            <MenuItem value="date">Ημερομηνία</MenuItem>
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Όνομα Πελάτη</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Υπηρεσία</TableCell>
                <TableCell align="center">Σχολια Πελάτη</TableCell>
                <TableCell align="center">Ημερομηνία</TableCell>
                <TableCell align="center">Ώρα Εναρξης</TableCell>
                <TableCell align="center">Ώρα Λήξης</TableCell>
                <TableCell align="center">Δημιουργήθηκε</TableCell>
                <TableCell align="center">Κατάσταστη</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableContent}</TableBody>
          </Table>
        </TableContainer>
        <br/>
        <Button variant="contained" onClick={() => navigate(`/dash/shops/${id}/createAppointment`)}>
         καταχωρηση ραντεβου
        </Button>
      </>
    );
  }

  return content;
};

export default ShopPage;
