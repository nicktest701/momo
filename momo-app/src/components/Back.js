import { ArrowBackRounded } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
function Back({ to }) {
  const navigate = useNavigate();
  return (
    <Box>
      <Box display="flex" alignItems="center" marginX="auto" maxWidth="1000px">
        <IconButton sx={{ marginRight: 2 }} onClick={() => navigate(-1)}>
          <ArrowBackRounded />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Back;
