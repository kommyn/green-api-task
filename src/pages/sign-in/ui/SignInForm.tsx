import type { FC } from "react";
import { useForm } from "react-hook-form";

import styles from "./index.module.css";
import Input from "@shared/ui/Input";
import Button from "@shared/ui/Button";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import { signInThunk } from "@entities/user/model";

type Inputs = {
  idInstance: string;
  apiTokenInstance: string;
};

const SignInForm: FC = () => {
  const loading = useAppSelector((state) => state.user.loading);
  const error = useAppSelector((state) => state.user.error);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: { apiTokenInstance: "", idInstance: "" },
  });

  const onSubmit = (data: Inputs) => dispatch(signInThunk(data));

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
        <p className={styles.form_error}>{error}</p>
      </div>
      <Button className={styles.button} disabled={loading}>
        Войти
      </Button>
    </form>
  );
};

export default SignInForm;
