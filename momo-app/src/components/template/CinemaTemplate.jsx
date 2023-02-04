import CinemaTemplateItem from "../items/CinemaTemplateItem";

const CinemaTemplate = ({ _id, info, vouchers }) => {
  return (
    <div
      style={{
        paddingBlock: "24px",
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit,minmax(280px,1fr))`,
        gap: "24px",
      }}
    >
      {vouchers?.length === 0 ? (
        <p>No data</p>
      ) : (
        vouchers?.map((voucher) => {
          return (
            <CinemaTemplateItem
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

export default CinemaTemplate;
