import React, { useState, useContext } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  IconButton,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import { CustomContext } from "../../context/providers/CustomProvider";
import Content from "../Content";
import PreviewChecker from "./PreviewChecker";
import { LoadingButton } from "@mui/lab";
import { Close } from "@mui/icons-material";
import CheckerTable from "../tables/CheckerTable";
import { addVoucher } from "../../api/voucherAPI";
import { readXLSX } from "../../config/readXLSX";
import { readCSV } from "../../config/readCSV";
import Transition from "../Transition";

const CSV_FILE_TYPE = "text/csv";
const XLSX_FILE_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const XLS_FILE_TYPE = "application/vnd.ms-excel";

const LoadChecker = ({ open, setOpen }) => {
  const voucherData = JSON.parse(localStorage.getItem("@voucher_type")) || "";

  const { customState, customDispatch } = useContext(CustomContext);
  const [openPreviewChecker, setOpenPreviewChecker] = useState(false);

  const [dataPath, setDataPath] = useState("");
  const [alertErr, setAlertErr] = useState({
    severity: "",
    msg: "",
  });

  //LOAD Checkers from file excel,csv
  function handleLoadFile(e) {
    // setIsLoading(true);
    const files = e.target.files[0];

    try {
      const reader = new FileReader();
      files.type === CSV_FILE_TYPE
        ? reader.readAsBinaryString(files)
        : reader.readAsArrayBuffer(files);

      reader.onload = function (event) {
        let checkers = [];

        if (files.type === XLSX_FILE_TYPE || files.type === XLS_FILE_TYPE) {
          checkers = readXLSX(event.target.result);
        }

        if (files.type === CSV_FILE_TYPE) {
          checkers = readCSV(event.target.result);
        }
        if (checkers.length !== 0) {
          customDispatch({
            type: "loadedChecker",
            payload: {
              meta: _.uniq(checkers?.flatMap(Object.keys)),
              data: checkers,
            },
          });

          customDispatch({ type: "openPreviewChecker", payload: true });
          setDataPath(files.name);
          // setIsLoading(false);
        }
      };
    } catch (error) {
      setAlertErr({
        severity: "error",
        msg: error.message ?? "Could not load the specific file",
      });
    }
  }

  const handleSubmitPins = async () => {
    try {
      const data = await addVoucher(customState.newCheckers);

      if (data === "Created") {
        setAlertErr({
          severity: "info",
          msg: "Your pins have been saved successfully!!!",
        });
        setDataPath("");
        customDispatch({ type: "newCheckers", payload: [] });
      }
    } catch (error) {
      setAlertErr({
        severity: "info",
        msg: error,
      });
    }
  };

  const handleCancelSubmitPins = () => {
    setDataPath("");
    customDispatch({ type: "newCheckers", payload: [] });
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      fullScreen
      TransitionComponent={Transition}
      open={open}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6">Loading Pins & Serials</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <Box display="flex" justifyContent="flex-end" paddingY={2}>
        {customState.newCheckers?.length !== 0 && (
          <DialogActions sx={{ paddingX: 5 }}>
            <Button onClick={handleCancelSubmitPins}>Cancel</Button>
            <LoadingButton variant="contained" onClick={handleSubmitPins}>
              Save Pins
            </LoadingButton>
          </DialogActions>
        )}
      </Box>
      <DialogContent>
        <Box style={{ paddingBottom: "16px" }}>
          <Content style={{ padding: "8px" }}>
            <Box
              sx={{
                border: "1px solid lightgray",
                borderRadius: 2,
                padding: 2,
                marginBottom: 4,
              }}
            >
              <FormLabel htmlFor="type">Type</FormLabel>
              <Stack spacing={2} paddingY={2}>
                <TextField
                  id="type"
                  value={voucherData?.voucherType || "F"}
                  // onChange={(e) => setDataType(e.target.value)}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Stack>
              <FormLabel htmlFor="browse"> File</FormLabel>
              <Stack direction="row" spacing={2} paddingY={2}>
                <TextField
                  id="browse"
                  placeholder="Load Data Here"
                  size="small"
                  value={dataPath}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />

                <FormLabel
                  htmlFor="pins"
                  sx={{
                    border: "1px solid green",
                    cursor: "pointer",
                    padding: "1px 15px",
                    paddingTop: "5px",
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: "green",
                      color: "#fff",
                    },
                  }}
                  title="Load Data from file"
                >
                  Load
                </FormLabel>
                <Input
                  type="file"
                  id="pins"
                  name="pins"
                  hidden={true}
                  aria-hidden={true}
                  inputProps={{
                    accept: ".xlsx,.xls,.csv",
                    hidden: true,
                  }}
                  sx={{
                    display: "none",
                  }}
                  onChange={(event) => handleLoadFile(event)}
                  onClick={(e) => {
                    e.target.value = null;
                    e.currentTarget.value = null;
                  }}
                />
              </Stack>
            </Box>
            {/* Preview */}
            {alertErr.msg && (
              <Alert
                severity={alertErr.severity}
                onClose={() => setAlertErr({ msg: "" })}
              >
                {alertErr.msg}
              </Alert>
            )}
            <Box
              sx={{
                border: "1px solid lightgray",
                borderRadius: 2,
                padding: 2,
                marginTop: 1,
              }}
            >
              <Stack direction="row" spacing={2} paddingY={2}>
                <Typography>Preview:</Typography>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    color: "green",
                    fontWeight: "600",
                  }}
                >
                  {voucherData?.voucherType} Serials & Pincodes
                </Typography>
              </Stack>
              <CheckerTable />
            </Box>
          </Content>
          <PreviewChecker
            open={openPreviewChecker}
            setOpen={setOpenPreviewChecker}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoadChecker;
