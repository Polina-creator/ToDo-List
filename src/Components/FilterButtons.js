import React from "react";
import Button from "@material-ui/core/Button";

export default function FilterButtons({ setFilter, setCurrentPage }) {
  return (
    <>
      <Button
        id="Done"
        size="large"
        color="secondary"
        variant="outlined"
        onClick={({ currentTarget }) => {
          setFilter(currentTarget.id);
          setCurrentPage(1);
        }}
      >
        Done
      </Button>
      <Button
        id="All"
        size="large"
        color="secondary"
        variant="outlined"
        onClick={({ currentTarget }) => {
          setFilter(currentTarget.id);
          setCurrentPage(1);
        }}
      >
        All
      </Button>
      <Button
        id="Undone"
        size="large"
        color="secondary"
        variant="outlined"
        onClick={({ currentTarget }) => {
          setFilter(currentTarget.id);
          setCurrentPage(1);
        }}
      >
        Undone
      </Button>
    </>
  );
}
