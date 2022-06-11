import styles from "./H.module.css";

const H = ({children, level}) => {
  switch (level) {
    case "1": return <h1 className={styles.h1}>{children}</h1>
    case "2": return <h2 className={styles.h2}>{children}</h2>
    case "3": return <h3 className={styles.h3}>{children}</h3>
    case "4": return <h4 className={styles.h4}>{children}</h4>
    case "5": return <h5 className={styles.h5}>{children}</h5>
    case "6": return <h6 className={styles.h6}>{children}</h6>
    default:  return <h1 style={{color: "red"}}>Wrong &lt;H&gt; level</h1>
  }
}

export default H;