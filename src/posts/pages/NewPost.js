import React, { useCallback, useReducer } from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { validatorRequire } from "../../shared/util/validators";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    }
    default:
      return state;
  }
};

const NewPost = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    isValid: false,
  });
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);

  const postSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <div>
      <form onSubmit={postSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          placeholder="Title"
          errorText="Enter a valid title."
          validators={[validatorRequire()]}
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          placeholder="description"
          errorText="Enter a valid description."
          validators={[validatorRequire()]}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Add Post
        </Button>
      </form>
    </div>
  );
};

export default NewPost;
