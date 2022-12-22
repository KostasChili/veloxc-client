import { useGetShopsQuery } from "./shopsApiSlice";
import Shop from "../shops/Shop";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";


const ShopsList = () => {
  const {
    data: shops,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetShopsQuery({
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (!shops) content = <p>Loading...</p>;

  if (isLoading) content = <p>Loading....</p>;

  if (isError) content = <p>{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids } = shops;

    const tableContent = ids?.length
      ? ids.map((shopId) => <Shop key={shopId} shopId={shopId} />)
      : null;
    content = (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Ιδιοκτήτης</TableCell>
              <TableCell align="center">Επωνυμία</TableCell>
              <TableCell align="center">Περιγραφή</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Τηλέφωνο</TableCell>
              <TableCell align="center">Διεύθυνση</TableCell>
              <TableCell align="center">Ενέργιες</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
    );
  }
  return content;
};

export default ShopsList;
