import styles from "./SignInPage.module.css";
import SignInForm from "./SignInForm";

export default function SingInPage() {
  return (
    <div className={styles.container}>
      <SignInForm />
    </div>
  );
}
