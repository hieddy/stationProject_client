import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import API from "../../../../API";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const StationResult = () => {
  const [challenges, setChallenges] = useState([]);
  const [challengeStatus, setchallengeStatus] = useState("progressing");

  const handleClick = (selectedStatus) => {
    setchallengeStatus(selectedStatus);
  };

  useEffect(() => {
    console.log("challengeStatus :", challengeStatus);
    const fetchChallenges = async () => {
      try {
        const response = await API.get(
          `api/challenge/status?status=${challengeStatus}`
        );
        console.log(response);
        setChallenges(response.data.data);
        console.log("challengeStatus selecting data :", response.data);
      } catch (error) {
        console.log("Error challengeStatus selecting data", error);
      }
    };
    fetchChallenges();
  }, [challengeStatus]);

  // challenge 객체가 정의되어 있는지 확인
  // if (!challenge) return <div>Loading...</div>;
  if (challenges === null) return <div>Loading...</div>;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export { StationResult };
