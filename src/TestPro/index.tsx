import { fun } from "../utils";
import styles from "./index.module.less";

const TestPro = () => {
  return <div className={styles.red}>{fun()}</div>;
};

export default TestPro;
