import React from "react";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { validatorRequire } from "../../shared/util/validators";
import { useFrom } from "../../shared/hooks/form-hook";

const NewPost = () => {
  const [formState, inputHandler] = useFrom(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
    },
    false
  );

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
