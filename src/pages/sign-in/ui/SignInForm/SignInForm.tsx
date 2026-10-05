import type { FC } from "react";
import { useForm } from "react-hook-form";

import styles from "./SignInForm.module.css";
import Input from "@shared/ui/Input";
import Button from "@shared/ui/Button";
import { useAppDispatch, useAppSelector } from "@shared/lib";
import {
  selectUserError,
  selectUserLoading,
  signInThunk,
} from "@entities/user/model";

type Inputs = {
  idInstance: string;
  apiTokenInstance: string;
};

const SignInForm: FC = () => {
  const loading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

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
      <p className={styles.formTitle}>Sign In</p>
      <label className={styles.formLabel}>
        <Input
          {...register("idInstance", { required: true })}
          placeholder="Instance ID"
          error={!!errors.idInstance}
        />
      </label>
      <label className={styles.formLabel}>
        <Input
          {...register("apiTokenInstance", { required: true })}
          placeholder="API Token"
          error={!!errors.apiTokenInstance}
        />
      </label>
      <div className={styles.formErrorWrapper}>
        <p className={styles.formError}>{error}</p>
      </div>
      <Button className={styles.formButton} disabled={loading} type="submit">
        Войти
      </Button>
    </form>
  );
};

export default SignInForm;
