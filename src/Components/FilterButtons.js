import React from "react";
import Button from "@material-ui/core/Button";

export default function FilterButtons(props) {
  return (
    <>
      <Button
      id="Done"
        size="large"
        color="secondary"
        variant="outlined"
        onClick={props.handleFilter}
      >
        Done
      </Button>
      <Button
      id="All"
        size="large"
        color="secondary"
        variant="outlined"
        onClick={props.handleFilter}
      >
        All
      </Button>
      <Button
      id="Undone"
        size="large"
        color="secondary"
        variant="outlined"
        onClick={props.handleFilter}
      >
        Undone
      </Button>
    </>
  );
}
