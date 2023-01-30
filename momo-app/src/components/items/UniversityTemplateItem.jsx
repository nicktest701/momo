import styles from "../../styles/University.module.css";
import coat_of_arms from "../../assets/images/coat_of_arms.png";
import { currencyFormatter } from "../../constants";
function UniversityTemplateItem({ _id, voucher, info }) {
  return (
    <div className={styles.template}>
      <small>Receipt</small>
      <div className={styles.wrapper}>
        <div className={styles.image_container}>
          <img src={coat_of_arms} alt="logo.png" />
          <h1>Frebby Tech Consults</h1>
        </div>

        <div className={styles.voucher_title}>
          <p className={styles.school}>{voucher?.voucherType}</p>
          <p className={styles.voucher}>Application Voucher-Customer's copy</p>
        </div>

        <div>
          <div className={styles.top_container}>
            <div>
              <small>Date:</small>
              <small>{info?.date}</small>
            </div>
            <div>
              <small>Transaction No:</small>
              <small>{_id ?? "1"}</small>
            </div>
            <div>
              <small>Name :</small>
              <small>{info?.agentName} </small>
            </div>
            <div>
              <small>Phone No.:</small>
              <small>{info?.agentPhoneNumber}</small>
            </div>
            <div>
              <small>Email :</small>
              <small>{info?.agentEmail}</small>
            </div>
          </div>

          <div>
            <small>Particulars: </small>
            <small>
              This is a <b>DIRECT APPLICATIONS FORMS</b>.Its is not transferable
              once it is registered to an applicant on the application system.
            </small>
          </div>
          <div className={styles.top_container}>
            <div>
              <small>Serial No. :</small>
              <small>{voucher?.serial}</small>
            </div>
            <div>
              <small>PIN :</small>
              <small>{voucher?.pin}</small>
            </div>
            <div>
              <small>Amount Paid :</small>
              <small>{currencyFormatter(voucher?.price)}</small>
            </div>
          </div>
          <p style={{ textAlign: "center" }}>
            <i>Important Information</i>
          </p>

          <small>
            Go to{" "}
            <a href={info?.dataURL}>
              {info?.dataURL ?? " the website of University of Education "}
            </a>{" "}
            to read Application instructions.Enter your <b> Serial No. </b>
            and your <b> Voucher PIN </b> to complete the admission application
            form.
          </small>

          <hr />
        </div>
      </div>
    </div>
  );
}

export default UniversityTemplateItem;
