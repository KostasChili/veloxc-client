import { useRetrieveAppointmentsQuery,useChangeAppointmentAttendedStatusMutation } from "../appointments/appointmentsApiSlice";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  Link,
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
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PendingIcon from '@mui/icons-material/Pending';

const ShopPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useRetrieveAppointmentsQuery(id, {
      pollingInterval: 1000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    });

    const [toggleCustomerState,{
      isSuccess:isToggleSuccess,
    }]=useChangeAppointmentAttendedStatusMutation(id);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectValue, setSelectValue] = useState("customerName");
  const [filterActive,setFilterActive] = useState(false);
  const [filterCompleted,setFilterCompleted] = useState(false);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterActive = () =>{
    setFilterActive(!filterActive)
  }
  const handleFilterCompleted = ()=>{
    setFilterCompleted(!filterCompleted);
  }

  const handleCustomerStatus = (e,appId)=>{
    toggleCustomerState(appId);
  }

  const handleAppDetails = (e,appId)=>{
    navigate(`/dash/shops/${id}/appointments/details/${appId}`)
  }

  const searchByName = () => {
    filteredData = filteredData.map((ap) => {
      if (ap?.customerName.includes(searchTerm)) return ap;
      else return null;
    });
  };
  const searchByService = () => {
    filteredData = filteredData.map((ap) => {
      if (ap?.service.includes(searchTerm)) return ap;
      else return null;
    });
  };

  const searchDate = () => {
    filteredData = filteredData.map((ap) => {
      if (ap?.date.includes(searchTerm)) return ap;
      else return null;
    });
  };

  const filterByActive = () => {
    filteredData = filteredData.map((ap) => {
      if (ap?.active) {
        return ap;
      } else return null;
    });
  };

  const filterByCompleted = ()=>{
    filteredData = filteredData.map((ap) => {
      if (!ap?.completed) {
        return ap;
      } else return null;
    });
  }

  let content;
  if (isLoading) content = <p>Loading...</p>;
  if (isSuccess) {
    var filteredData = data.appointments;
    //by default appointments are sorted by newest to oldest
    var tmp = [...data.appointments];
    filteredData = tmp.sort((a, b) => {
      return (
        new Date(`${a.date}T${a.startTime}`) -
        new Date(`${b.date}T${b.startTime}`)
      );
    });

    if (searchTerm !== "" && selectValue === "customerName") {
      searchByName();
    } else if (searchTerm !== "" && selectValue === "service") {
      searchByService();
    } else if (searchTerm !== "" && selectValue === "date") {
      searchDate();
    }

    if(filterActive)
    filterByActive();
    if(filterCompleted)
    filterByCompleted();

    const tableContent = filteredData.map((d,index) =>
      d ? (
        <TableRow key={d._id}>
          <TableCell align="center"><Button onClick={(e)=>handleAppDetails(e,d._id)}>{index+1}</Button></TableCell>
          <TableCell align="center">{d.customerName}</TableCell>
          <TableCell align="center">{d.email}</TableCell>
          <TableCell align="center">{d.service}</TableCell>
          <TableCell align="center">
            {d.comments ? d.comments : "???????????? ????????????"}
          </TableCell>
          <TableCell align="center">{d.date}</TableCell>
          <TableCell align="center">{d.startTime}</TableCell>
          <TableCell align="center">{d.endTime}</TableCell>
          <TableCell align="center">
            {d.active?<CheckIcon color="primary"/>:<ClearIcon color="warning"/>}
          </TableCell>
          <TableCell align="center">
            {d.completed ? <CheckIcon color="primary"/>:<PendingActionsIcon color="success"/>}
          </TableCell>
          <TableCell align="center">
            {d.completed?<Button  onClick={(e)=>handleCustomerStatus(e,d._id)} color={!d.attended?'warning':'primary'}>{d.attended?<CheckIcon/> :<ClearIcon/>}</Button>:<PendingIcon />}
          </TableCell>
        </TableRow>
      ) : null
    );

    content = (
      <>
        <Typography variant="h2">{data?.title}</Typography>
        <Typography variant="h6">?????? ???? ???????????????? </Typography>
        <TextField
          size="small"
          variant="outlined"
          id="search"
          label="??????????????????"
          value={searchTerm}
          onChange={handleSearch}
        ></TextField>
        <FormControl size="small">
          <InputLabel id="short-with-label">???? </InputLabel>
          <Select
            labelId="short-with-label"
            id="short-with"
            value={selectValue}
            label="?????????? ????????????"
            onChange={(e) => {
              setSelectValue(e.target.value);
              setSearchTerm("");
            }}
          >
            <MenuItem value="customerName">?????????? ????????????</MenuItem>
            <MenuItem value="service">????????????????</MenuItem>
            <MenuItem value="date">????????????????????</MenuItem>
          </Select>

         
        </FormControl>
       
 
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">N.</TableCell>
                <TableCell align="center">?????????? ????????????</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">????????????????</TableCell>
                <TableCell align="center">???????????? ????????????</TableCell>
                <TableCell align="center">????????????????????</TableCell>
                <TableCell align="center">?????? ??????????????</TableCell>
                <TableCell align="center">?????? ??????????</TableCell>
                <TableCell align="center">?????????????????????????? <Checkbox value={filterActive} onChange={handleFilterActive} /></TableCell>
                <TableCell align="center">?????????????????? <Checkbox value={filterCompleted} onChange={handleFilterCompleted} /></TableCell>
                <TableCell align="center">??????????????????????????</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableContent}</TableBody>
          </Table>
        </TableContainer>
        <br />
        <Button
          variant="contained"
          onClick={() => navigate(`/shops/public/${id}`)}
        >
          ???????????????????? ????????????????
        </Button>
      </>
    );
  }

  return content;
};

export default ShopPage;
