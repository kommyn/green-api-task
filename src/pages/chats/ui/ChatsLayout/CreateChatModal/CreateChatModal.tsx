import { type FC } from "react";
import { useForm, Controller } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { useNavigate } from "react-router";

import Modal from "@shared/ui/Modal";
import Input from "@shared/ui/Input";
import Button from "@shared/ui/Button";
import { useAppSelector } from "@shared/lib";
import { selectUser } from "@entities/user/model";

import styles from "./CreateChatModal.module.css";

type Input = {
  phone: string;
};

export interface CreateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateChatModal: FC<CreateChatModalProps> = ({ isOpen, onClose }) => {
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();

  const onSubmit = async (data: Input) => {
    if (!user) return;

    const phone = data.phone.replaceAll("+", "") + "@c.us";

    navigate(`/chats/${phone}`);
    onClose();
  };

  return (
    <Modal title="Создать новый чат" isOpen={isOpen} onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Номер телефона обязателен",
            validate: (value) =>
              isValidPhoneNumber(value) || "Некорректный номер телефона",
          }}
          render={({ field: { onChange, value } }) => (
            <PhoneInput
              id="phone-input"
              placeholder="Введите номер"
              value={value}
              onChange={onChange}
              defaultCountry="RU"
            />
          )}
        />
        <div className={styles.formErrorWrapper}>
          <p className={styles.formError}>{errors?.phone?.message}</p>
        </div>
        <Button type="submit" className={styles.button}>
          Создать
        </Button>
      </form>
    </Modal>
  );
};

export default CreateChatModal;
