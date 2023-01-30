import BusTemplateItem from "../items/BusTemplateItem";

const BusTemplate = ({ _id, info, vouchers }) => {
  return (
    <div
      style={{
        paddingTop: "16px",
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit,minmax(320px,1fr))`,
        rowGap: "24px",
      }}
    >
      {vouchers?.length === 0 ? (
        <p>No data</p>
      ) : (
        vouchers?.map((voucher) => {
          return (
            <BusTemplateItem
              key={voucher?.id}
              _id={_id}
              info={info}
              voucher={voucher}
            />
          );
        })
      )}
    </div>
  );
};

export default BusTemplate;
