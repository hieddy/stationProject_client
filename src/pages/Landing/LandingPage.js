import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Path } from "../../Router";

const LandingPage = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(Path.STATION);
  };

  return (
    <>
      <h1>Hi</h1>
      <h2>Click Here ⬇</h2>
      <Button variant="contained" onClick={clickHandler}>
        시작하기
      </Button>
    </>
  );
};

export { LandingPage };
