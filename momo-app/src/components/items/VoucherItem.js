import { Divider } from "@mui/material";
import React from "react";
import { currencyFormatter } from "../../constants";

const VoucherItem = ({ info, voucher }) => {
  const Item = ({ title, value }) => {
    return (
      <div className="voucher-cover" style={{ display: "flex", gap: "10px" }}>
        <p style={{ fontSize: 11, width: "30%", textTransform: "uppercase" }}>
          {title}
        </p>
        {title === "URL" ? (
          <a
            href={`https://${value}`}
            style={{ fontSize: 11, fontWeight: "bold" }}
            rel="noreferrer"
            target="_blank"
          >
            {value}
          </a>
        ) : (
          <p style={{ fontSize: 11, fontWeight: "bold" }}>{value}</p>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        width: "max-content",
        border: "solid 2px black",
        padding: "8px",
      }}
    >
      <p style={{ textAlign: "center" }}>{voucher.voucherType}</p>
      <Divider color="#000" />
      <Item title="Serial" value={voucher.serial} />
      <Item title="Pin" value={voucher.pin} />
      <Item title="Price" value={currencyFormatter(voucher.price)} />
      <Item title="URL" value={info.dataURL} />
      <Item title="Agent" value={info.agentName} />
      <Item title="Phone" value={info.agentPhoneNumber} />

      <Divider color="#000" />
      <p style={{ fontSize: 9, fontWeight: "bold" }}>Powered by</p>
      <p style={{ fontSize: 9 }}>Frebbytech Consults</p>
      <p style={{ fontSize: 9, fontWeight: "bold" }}>Contact Us:</p>

      <div style={{ display: "flex", flexDirection: "column", rowGap: "3px" }}>
        <a href={`tel:0560372844`} color="primary.main" style={{ fontSize: 9 }}>
          0560372844
        </a>
        <a
          href={`mailto:frebbytechconsults@gmail.com`}
          color="primary.main"
          style={{ fontSize: 9 }}
        >
          frebbytechconsults@gmail.com
        </a>
      </div>
    </div>
  );
};

export default VoucherItem;
