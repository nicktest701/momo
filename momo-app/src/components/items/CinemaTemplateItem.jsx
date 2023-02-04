import moment from "moment";
import styles from "../../styles/Cinema.module.css";
function CinemaTemplateItem({ _id, voucher, info }) {
  return (
    <div className={styles.container}>
      <div className={styles.qrbox}>
        <img
          src={voucher?.qrCode}
          alt="code"
          style={{ width: "60px", height: "60px" }}
        />
      </div>

      <svg
        fill="#000000"
        viewBox="-3.71 0 122.88 122.88"
        className={styles.cinema_svg}
      >
        <g>
          <path d="M108.07,15.56L5.7,52.84L0,37.22L102.37,0L108.07,15.56L108.07,15.56z M115.46,122.88H5.87V53.67h109.59 V122.88L115.46,122.88z M101.79,15.65V2.36l-7.23,2.61v13.34L101.79,15.65L101.79,15.65L101.79,15.65z M87.39,20.93V7.59 l-7.26,2.58v13.45L87.39,20.93L87.39,20.93z M72.49,26.07v-13.2l-7.26,2.61v13.26L72.49,26.07L72.49,26.07L72.49,26.07z M113.43,68.32l-4.56-12.54h-7.73l4.56,12.54H113.43L113.43,68.32z M97.64,68.32l-4.56-12.54h-7.76l4.59,12.54H97.64L97.64,68.32z M57.98,31.69V18.32l-7.25,2.61v13.34L57.98,31.69L57.98,31.69z M82.41,68.32l-4.56-12.54h-7.73l4.56,12.54H82.41L82.41,68.32z M43.08,36.8V23.54l-7.34,2.61v13.34L43.08,36.8L43.08,36.8z M66.62,68.32l-4.56-12.54h-7.75l4.56,12.54H66.62L66.62,68.32z M28.82,42.28V28.9l-7.31,2.7v13.26L28.82,42.28L28.82,42.28L28.82,42.28z M51.06,68.32L46.5,55.78h-7.73l4.56,12.54H51.06 L51.06,68.32z M13.84,47.39V34.13l-7.26,2.58v13.37L13.84,47.39L13.84,47.39z M35.36,68.32l-4.64-12.54l-7.67,0l4.48,12.54H35.36 L35.36,68.32z M19.96,68.32l-4.64-12.54l-7.73,0l4.56,12.54H19.96L19.96,68.32z" />
        </g>
      </svg>
      <div className={styles.title_container}>
        <div className={styles.theatre}>
          <span>{info?.theatre}</span>
          <span></span>
        </div>
        <h1 className="">CINEMA TICKET</h1>
        <h3>{info?.movie}</h3>
      </div>
      <div className={styles.details_container}>
        <div className={styles.details_item}>
          <small>Date</small>
          <p>{moment(info?.date).format("Do MMMM YYYY")}</p>
        </div>
        <div className={styles.details_item}>
          <small>Time</small>
          <p>{moment(info?.time).format("h:mm a")}</p>
        </div>
      </div>

      <p className={styles.company}>Powered by Frebbytech Consults</p>
    </div>
  );
}

export default CinemaTemplateItem;
