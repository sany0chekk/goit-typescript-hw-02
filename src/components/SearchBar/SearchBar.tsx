import { Button, TextField } from "@mui/material";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent } from "react";

type Props = {
  onSubmit: (query: string) => void;
};

const SearchBar: React.FC<Props> = ({ onSubmit }) => {
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const formData = new FormData(form);
    const query = formData.get("query");

    if (typeof query === "string" && query.trim()) {
      onSubmit(query);
      form.reset();
    } else {
      toast.error("Please enter a search query.");
    }
  };

  return (
    <>
      <header className={css.header}>
        <form className={css.form} onSubmit={handleFormSubmit}>
          <TextField
            label="Search images and photos"
            name="query"
            variant="outlined"
            type="text"
            autoComplete="off"
            autoFocus
            className={css.input}
            size="small"
          />
          <Button variant="contained" type="submit" className={css.btn}>
            Search
          </Button>
        </form>
      </header>
      <Toaster position="top-right" />
    </>
  );
};

export default SearchBar;
