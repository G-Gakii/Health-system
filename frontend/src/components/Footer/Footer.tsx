import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div>
      <div className={`card my-5 ${styles.footerContainer}`}>
        <span className="card-body text-center fs-4 ">
          &copy;2025 <span>Health</span>
        </span>
      </div>
    </div>
  );
};

export default Footer;
