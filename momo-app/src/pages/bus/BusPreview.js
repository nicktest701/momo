import {
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import BusSearch from "../../components/inputs/BusSearch";
import BusPreviewItem from "./BusPreviewItem";
import FmdGoodSharpIcon from "@mui/icons-material/FmdGoodSharp";
import TripOriginSharpIcon from "@mui/icons-material/TripOriginSharp";
import SyncAltSharpIcon from "@mui/icons-material/SyncAltSharp";
import ArrowForward from "@mui/icons-material/ArrowForward";
import { useLocation } from "react-router-dom";
import DateInput from "../../components/inputs/DateInput";
function BusPreview() {
  const { state } = useLocation();

  const [origin, setOrigin] = useState({ id: "", city: "", region: "" });
  const [destination, setDestination] = useState({
    id: "",
    city: "",
    region: "",
  });
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (state?.searchValue) {
      setOrigin(state?.searchValue?.origin);
      setDestination(state?.searchValue?.destination);
    }
  }, [state]);

  return (
    <Container sx={{ minHeight: "calc(100vh - 120px)", paddingX: 4 }}>
      <Stack spacing={3}>
        {origin.city && destination.city && (
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Typography variant="h5">{origin.city}</Typography> <ArrowForward />
            <Typography variant="h5"> {destination.city},</Typography>
          </Stack>
        )}

        <Divider />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            borderRadius: 5,
            padding: 3,
            boxShadow: "0 2px 5px rgba(0,0,0,0.15)",
          }}
        >
          <BusSearch
            label="Origin"
            value={origin}
            setValue={setOrigin}
            icon={<TripOriginSharpIcon color="secondary" />}
          />
          <IconButton size='small'>
            <SyncAltSharpIcon color="dark" />
          </IconButton>

          <BusSearch
            label="Destination"
            value={destination}
            setValue={setDestination}
            icon={<FmdGoodSharpIcon color="secondary" />}
          />
          <DateInput value={date} setValue={setDate} />
          <Button
            variant="contained"
            // onClick={handleSearch}
            sx={{ minWidth: 120, padding: "15px 10px", borderRadius: 5 }}
          >
            Find Tickets
          </Button>
        </Stack>
        <Container
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
            gap: 5,
            paddingY: 4,
          }}
        >
          <BusPreviewItem />
          <BusPreviewItem />
          <BusPreviewItem />
          <BusPreviewItem />
          <BusPreviewItem />
        </Container>
      </Stack>
    </Container>
  );
}

export default BusPreview;
