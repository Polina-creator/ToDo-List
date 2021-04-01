import React from "react";
import Button from "@material-ui/core/Button";

export default function FilterButtons({setFilter}) {
  return (
    <>
      <Button
      id="Done"
        size="large"
        color="secondary"
        variant="outlined"
        onClick={({currentTarget}) => setFilter(currentTarget.id)}
      >
        Done
      </Button>
      <Button
      id="All"
        size="large"
        color="secondary"
        variant="outlined"
        onClick={({currentTarget}) => setFilter(currentTarget.id)}
      >
        All
      </Button>
      <Button
      id="Undone"
        size="large"
        color="secondary"
        variant="outlined"
        onClick={({currentTarget}) => setFilter(currentTarget.id)}
      >
        Undone
      </Button>
    </>
  );
}
