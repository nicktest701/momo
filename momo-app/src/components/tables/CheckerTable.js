import React, { useContext } from "react";
import MaterialTable from "material-table";
import { CustomContext } from "../../context/providers/CustomProvider";
import { tableIcons } from "../../config/tableIcons";

const CheckerTable = () => {
  const { customState } = useContext(CustomContext);
  return (
    <MaterialTable
      title="Voucher Information"
      icons={tableIcons}
      columns={[
        {
          title: "#",
          field: "id",
          hidden: true,
        },
        {
          title: "Serial",
          field: "serial",
        },
        {
          title: "Pin",
          field: "pin",
        },
        {
          title: "Voucher",
          field: "voucher",
        },
      ]}
      data={
        customState.newCheckers === undefined ? [] : customState.newCheckers
      }
      options={{
        search: false,
      }}
    />
  );
};

export default CheckerTable;
