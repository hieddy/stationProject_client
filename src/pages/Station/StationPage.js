import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import * as styles from "@mui/material/styles";
import axios from "axios";

import API from "API";

const StationMap = () => {
  const { kakao } = window;
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(37.2886, 127.0519),
      level: 5,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(37.2886, 127.0519);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);
  return (
    <div style={{ padding: "50px" }}>
      <div
        id="map"
        style={{
          width: "90%",
          height: "400px",
        }}
      ></div>
    </div>
  );
};

const SelectedFilter = ({ filterObj, setFilterObj, parentFunction }) => {
  // 주제 분류 리스트
  const selectList = ["주차비 무료", "주차비 유료", "전체"];
  const [data, setData] = useState([]); //

  const [selectedParkingFee, setSelectedParkingFee] = useState("");

  // 필터 정보 저장 함수 (select)
  const handleFilterSelect = (e) => {
    const name = e.target.value;
    const tag = e.target.name;
    if (tag === "parkingFee") {
      setSelectedParkingFee(name);
    }
    // else if (tag === 'addr') {
    //   setSelectedAddr(name);
    // }

    e.preventDefault();
    return setFilterObj({
      reset: false,
      all: false,
      searchName: "",
      filterState: {
        ...filterObj.filterState,
        [tag]: name,
      },
    });
  };

  // 필터 정보 저장 함수 (초기화 Btn)
  const handleFilterReset = (e) => {
    e.preventDefault();
    return setFilterObj({
      reset: true,
      all: false,
      searchName: "",
      filterState: {
        parkingFee: "",
      },
    });
  };

  // 필터 정보 저장 함수 (전체보기 Btn)
  const handleFilterShowAll = (e) => {
    e.preventDefault();
    return setFilterObj({
      reset: false,
      all: true,
      searchName: "",
      filterState: {
        parkingFee: "",
      },
    });
  };
  const queryData = {};
  if (selectedParkingFee === "주차비 무료") {
    queryData["parkingFee"] = "N";
  } else if (selectedParkingFee === "전체") {
    queryData["parkingFee"] = "all";
  } else {
    queryData["parkingFee"] = "Y";
  }

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      // console.log("-----", queryData);
      try {
        const result = await API.get(
          `http://${process.env.REACT_APP_BACKEND_URL}/api/stations?parkingFee=${queryData["parkingFee"]}`
        );
        setData(result.data);
      } catch (err) {
        console.log(err.response.data.message);
      }
    },
    [selectedParkingFee]
  );

  return (
    <>
      <Box
        className="container"
        sx={{
          width: "90%",
          padding: "50px",
          borderRight: "5px solid #4B89DC",
        }}
      >
        <Box className="filter" sx={{ height: "55%" }}>
          <Stack direction="row" spacing={1}>
            <Chip
              label="전체보기"
              name="all"
              sx={{ backgroundColor: "#7397E6" }}
              onClick={handleFilterShowAll}
            />
            <Chip
              label="초기화"
              name="reset"
              sx={{ backgroundColor: "#7397E6" }}
              onClick={handleFilterReset}
            />
          </Stack>
          <Box sx={{ width: 150, mb: "20px", mt: "30px" }}>
            <FormControl fullWidth>
              <InputLabel id="parkingFee-label">주차비</InputLabel>
              <Select
                labelId="parkingFee-label"
                id="parkingFee"
                value={selectedParkingFee}
                label="parkingFee"
                name="parkingFee"
                onChange={handleFilterSelect}
              >
                {selectList.map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <button type="submit" onClick={handleSubmit}>
            submit
          </button>
        </Box>
        <ResultTable data={data} />
      </Box>
    </>
  );
};

const ResultTable = ({ data }) => {
  const StyledTableCell = styles.styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styles.styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <div>
      <TableContainer component={Paper}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: "30px" }}>목록 리스트</h2>
        </Box>

        <Table
          sx={{
            minWidth: 700,
          }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell>시설명</StyledTableCell>
              <StyledTableCell align="right">위치</StyledTableCell>
              <StyledTableCell align="right">주차비</StyledTableCell>
              <StyledTableCell align="right">전화번호</StyledTableCell>
              <StyledTableCell align="right">상세주소</StyledTableCell>
              <StyledTableCell align="right">거리(m)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row._id}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.location}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.parkingFee}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.companyPhone}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.roadNameAddress}
                </StyledTableCell>
                <StyledTableCell align="right">{row.distance}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const StationPage = () => {
  const [filterObj, setFilterObj] = useState({
    reset: false,
    all: false,
    searchName: "",
    filterState: {
      parkingFee: "",
    },
  });

  return (
    <>
      <StationMap filterObj={filterObj} />
      <SelectedFilter filterObj={filterObj} setFilterObj={setFilterObj} />
    </>
  );
};

export { StationPage };
