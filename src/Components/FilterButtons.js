import React from "react";
import Button from "@material-ui/core/Button";

export default function FilterButtons({handleFilter}) {
  return (
    <>
      <Button
      id="Done"
        size="large"
        color="secondary"
        variant="outlined"
        onClick={({currentTarget}) => handleFilter(currentTarget.id)}
      >
        Done
      </Button>
      <Button
      id="All"
        size="large"
        color="secondary"
        variant="outlined"
        onClick={({currentTarget}) => handleFilter(currentTarget.id)}
      >
        All
      </Button>
      <Button
      id="Undone"
        size="large"
        color="secondary"
        variant="outlined"
        onClick={({currentTarget}) => handleFilter(currentTarget.id)}
      >
        Undone
      </Button>
    </>
  );
}
