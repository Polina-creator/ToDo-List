import React from "react";
import Button from "@material-ui/core/Button";

export default function FilterButtons({ setFilter, setCurrentPage }) {
  return (
    <>
      <Button
        id="done"
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
        size="large"
        color="secondary"
        variant="outlined"
        onClick={() => {
          setFilter('');
          setCurrentPage(1);
        }}
      >
        All
      </Button>
      <Button
        id="undone"
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
