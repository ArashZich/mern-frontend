import React, { useState, useContext } from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { validatorRequire } from "../../shared/util/validators";
import { useFrom } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const { sendRequest } = useHttpClient();

  const [formState, inputHandler, setFormData] = useFrom(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(responseData.user.id);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );

        auth.login(responseData.user.id);
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div className="center main auth">
      <h2>ورود و ثبت نام</h2>
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            type="text"
            element="input"
            placeholder="نام"
            validators={[validatorRequire()]}
            errorText="لطفا نام معتبر وارد کنید."
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          type="email"
          element="input"
          placeholder="ایمیل"
          validators={[validatorRequire()]}
          errorText="لطفا ایمیل معتبر وارد کنید."
          onInput={inputHandler}
        />
        <Input
          id="password"
          type="password"
          element="input"
          placeholder="رمز عبور"
          validators={[validatorRequire()]}
          errorText="لطفا رمز عبور معتبر وارد کنید."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "ورورد" : "ثبت نام"}
        </Button>
      </form>
      <Button onClick={switchModeHandler}>
        تغییر به {isLoginMode ? "ثبت نام" : "ورود"}
      </Button>
    </div>
  );
};

export default Auth;
