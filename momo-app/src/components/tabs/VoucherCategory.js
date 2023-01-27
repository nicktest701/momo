import React, { useContext, useMemo } from "react";
import { Box, Button } from "@mui/material";
import MaterialTable, { MTableToolbar } from "material-table";
import { tableIcons } from "../../config/tableIcons";
import { Add } from "@mui/icons-material";
import { CustomContext } from "../../context/providers/CustomProvider";
import { useGetVoucherCategory } from "../../hooks/useGetVoucherCategory";
import AddCinemaCategory from "../modals/AddCinemaCategory";
import AddStadiumCategory from "../modals/AddStadiumCategory";
// import DetailsItem from "../items/DetailsItem";
import AddBusCategory from "../modals/AddBusCategory";
import { getColumns } from "../../config/getColumns";

const VoucherCategory = (props) => {
  const { customDispatch } = useContext(CustomContext);
  const category = localStorage.getItem("category");
  const { categories, loading } = useGetVoucherCategory(category);

 

  const modifiedColumns = useMemo(() => {
    const columns = getColumns(category).map((column) => {
      return { ...column };
    });

    // if (["stadium", "cinema", "bus"].includes(category)) {
    //   const detailColumns = {
    //     title: "Details",
    //     field: "details",
    //     render: ({ details }) => {
    //       return <DetailsItem details={details} />;
    //     },
    //   };
    //   columns.push(detailColumns);
    // }

    return columns;
  }, [category]);

  const handleOpen = () => {
    if (category === "cinema") {
      customDispatch({ type: "openCinemaCategory", payload: true });
      return;
    }
    if (category === "stadium") {
      customDispatch({ type: "openStadiumCategory", payload: true });
      return;
    }
    if (category === "bus") {
      customDispatch({ type: "openBusCategory", payload: true });
      return;
    }

    customDispatch({ type: "openAddCategory", payload: true });
    return;
  };

  return (
    <Box
      sx={{
        paddingY: 5,
      }}
    >
      <MaterialTable
        title={props.category}
        icons={tableIcons}
        components={{
          Toolbar: (params) => {
            return (
              <>
                <Box display="flex" justifyContent="flex-end" paddingY={1}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleOpen}
                  >
                    New {props.category}
                  </Button>
                </Box>
                <MTableToolbar {...params} />
              </>
            );
          },
        }}
        columns={modifiedColumns}
        isLoading={loading}
        data={categories}
        options={{
          exportAllData: true,
          exportButton: true,
          selection: true,
          showTextRowsSelected: false,
          columnsButton: true,
        }}
        style={{
          padding: "10px",
        }}
      />
      <AddCinemaCategory />
      <AddStadiumCategory />
      <AddBusCategory />
    </Box>
  );
};

export default VoucherCategory;
