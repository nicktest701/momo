import React from "react";
import UniversityTemplateItem from "../items/UniversityTemplateItem";

const UniversityTemplate = ({ _id, info, vouchers }) => {
  return (
    <div
      style={{
        paddingTop: "16px",
        display: "grid",
        gridTemplateColumns: `1fr`,
        rowGap: "24px",
      }}
    >
      {vouchers?.length === 0 ? (
        <p>No data</p>
      ) : (
        vouchers?.map((voucher) => {
          return (
            <UniversityTemplateItem
              _id={_id}
              key={voucher?.id}
              info={info}
              voucher={voucher}
            />
          );
        })
      )}
    </div>
  );
};

export default UniversityTemplate;
