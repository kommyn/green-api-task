import { useContext } from "react";
import { useForm } from "react-hook-form";

import styles from "./index.module.css";
import { AuthContext } from "@entities/auth/model";

type Inputs = {
  idInstance: string;
  apiTokenInstance: string;
};

type StateInstances =
  | "notAuthorized"
  | "authorized"
  | "blocked"
  | "starting"
  | "suspended"
  | "pendingPassword";

export default function SingInPage() {
  const { signIn } = useContext(AuthContext);

  const { register, handleSubmit, setError } = useForm<Inputs>({
    defaultValues: { apiTokenInstance: "", idInstance: "" },
  });

  const onSubmit = async (data: Inputs) => {
    const response = await fetch(
      `https://4100.api.green-api.com/waInstance${data.idInstance}/getStateInstance/${data.apiTokenInstance}`,
    );

    console.log("response: ", response);

    // if (!response.ok) {
    //   setError("form", new Error("Instance not found"));
    //   return;
    // }

    // const result = await response.json();
    const stateInstance: StateInstances | undefined =
      "authorized" as StateInstances;

    console.log("stateInstance: ", stateInstance);

    switch (stateInstance) {
      case "authorized":
        signIn(data);
        break;
      case "blocked":
      case "notAuthorized":
      case "starting":
      case "suspended":
      case "pendingPassword":
      default:
        setError("form", new Error("Instance not found"));
    }
  };

  return (
    <div className={styles["sign-in_container"]}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles["sign-in_form"]}
      >
        <label className={styles["button_label"]}>
          Instance ID
          <input {...register("idInstance")} />
        </label>
        <label className={styles["button_label"]}>
          API Token Instance
          <input {...register("apiTokenInstance")} />
        </label>
        <button className={styles.button}>Sign In</button>
      </form>
    </div>
  );
}
