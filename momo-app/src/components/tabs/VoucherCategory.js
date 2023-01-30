import React, { useContext, useMemo } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import MaterialTable, { MTableToolbar } from "material-table";
import Swal from "sweetalert2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tableIcons } from "../../config/tableIcons";
import { Add, DeleteRounded, EditRounded } from "@mui/icons-material";
import { CustomContext } from "../../context/providers/CustomProvider";
import { useGetVoucherCategory } from "../../hooks/useGetVoucherCategory";
import AddCinemaCategory from "../../pages/cinema/AddCinemaCategory";
import AddStadiumCategory from "../../pages/stadium/AddStadiumCategory";
import AddBusCategory from "../../pages/bus/AddBusCategory";
import { getColumns } from "../../config/getColumns";
import { deleteCategory } from "../../api/categoryAPI";
import EditCinemaCategory from "../../pages/cinema/EditCinemaCategory";
import EditStadiumCategory from "../../pages/stadium/EditStadiumCategory";
import EditBusCategory from "../../pages/bus/EditBusCategory";
import AddCategory from "../modals/AddCategory";

const VoucherCategory = (props) => {
  const queryClient = useQueryClient();
  const { customDispatch } = useContext(CustomContext);
  const category = localStorage.getItem("category");
  const { categories, loading } = useGetVoucherCategory(category);

  const { mutateAsync } = useMutation({
    mutationFn: deleteCategory,
  });

  const modifiedColumns = useMemo(() => {
    const columns = getColumns(category).map((column) => {
      return { ...column };
    });

    function removeCategory(id) {
      Swal.fire({
        title: "Removing",
        text: "Do you want to remove?",
        backdrop: false,
        showCancelButton: true,
      }).then(({ isConfirmed }) => {
        if (isConfirmed) {
          mutateAsync(id, {
            onSettled: () => {
              queryClient.invalidateQueries(["category"]);
            },
            onSuccess: (data) => {
              alert(data);
            },
            onError: (error) => {
              alert(error);
            },
          });
        }
      });
    }

    const handleOpenEdit = (id) => {
      if (category === "cinema") {
        customDispatch({
          type: "openEditCinemaCategory",
          payload: {
            open: true,
            data: id,
          },
        });
        return;
      }
      if (category === "stadium") {
        customDispatch({
          type: "openEditStadiumCategory",
          payload: {
            open: true,
            data: id,
          },
        });
        return;
      }
      if (category === "bus") {
        customDispatch({
          type: "openEditBusCategory",
          payload: {
            open: true,
            data: id,
          },
        });
        return;
      }

      customDispatch({
        type: "openEditCategory",
        payload: {
          open: true,
          data: id,
        },
      });
      return;
    };

    columns.push({
      field: null,
      title: "Action",
      render: ({ id }) => (
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => handleOpenEdit(id)}>
            <EditRounded />
          </IconButton>
          <IconButton onClick={() => removeCategory(id)}>
            <DeleteRounded />
          </IconButton>
        </Stack>
      ),
    });

    return columns;
  }, [category, customDispatch, mutateAsync, queryClient]);

  const handleOpenAdd = () => {
    if (category === "cinema") {
      customDispatch({ type: "openAddCinemaCategory", payload: true });
      return;
    }
    if (category === "stadium") {
      customDispatch({ type: "openAddStadiumCategory", payload: true });
      return;
    }
    if (category === "bus") {
      customDispatch({ type: "openAddBusCategory", payload: true });
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
                    onClick={handleOpenAdd}
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

      <AddCategory />
      {/* cinema  */}
      <AddCinemaCategory />
      <EditCinemaCategory />

      {/* stadium  */}
      <AddStadiumCategory />
      <EditStadiumCategory />
      {/* bus  */}
      <AddBusCategory />
      <EditBusCategory />
    </Box>
  );
};

export default VoucherCategory;

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
