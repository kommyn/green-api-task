import { useContext, type FC } from "react";
import { useForm } from "react-hook-form";

import styles from "./index.module.css";
import { AuthContext } from "@entities/auth/model";
import Input from "@shared/ui/Input";
import Button from "@shared/ui/Button";

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

const SignInForm: FC = () => {
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { apiTokenInstance: "", idInstance: "" },
  });

  console.log("errors: ", errors);

  const onSubmit = async (data: Inputs) => {
    const response = await fetch(
      `https://4100.api.green-api.com/waInstance${data.idInstance}/getStateInstance/${data.apiTokenInstance}`,
    );

    console.log("response: ", response);

    if (!response.ok) {
      setError("root", { message: "Инстанс не найден" });
      return;
    }

    const result = await response.json();
    const stateInstance: StateInstances | undefined = result.stateInstance;

    console.log("stateInstance: ", stateInstance);

    switch (stateInstance) {
      case "authorized":
        signIn(data);
        break;
      case "blocked":
        setError("root", { message: "Аккаунт заблокирован" });
        break;
      case "notAuthorized":
        setError("root", { message: "Инстанс не авторизован" });
        break;
      case "starting":
        setError("root", { message: "Инстанс в процессе запуска" });
        break;
      case "suspended":
        setError("root", { message: "Аккаунт временно не доступен" });
        break;
      case "pendingPassword":
        setError("root", { message: "Авторизация не завершена" });
        break;
      default:
        setError("root", { message: "Инстанс не найден" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <p className={styles.form_title}>Sign In</p>
      <label className={styles.label}>
        <Input
          {...register("idInstance", { required: true })}
          placeholder="Instance ID"
          error={!!errors.idInstance}
        />
      </label>
      <label className={styles.label}>
        <Input
          {...register("apiTokenInstance", { required: true })}
          placeholder="API Token"
          error={!!errors.apiTokenInstance}
        />
      </label>
      <div className={styles.form_error_wrapper}>
        <p className={styles.form_error}>{errors.root?.message}</p>
      </div>
      <Button className={styles.button}>Войти</Button>
    </form>
  );
};

export default SignInForm;
