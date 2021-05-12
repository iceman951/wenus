import React from "react";
import { TextField, makeStyles, Button } from "@material-ui/core/";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "70vh",
      background: "white",
    },
  },
  input: {
    color: "#2EFF22",
  },
}));

export default function PostsInput({ token }) {
  const classes = useStyles();
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div>
      <form className={classes.root}>
        <TextField
          id="outlined-multiline-static"
          label="Type someting here..."
          multiline
          rows={4}
          value={value}
          onChange={handleChange}
          variant="outlined"
          color="secondary"
          InputProps={{
            className: classes.input,
          }}
        />
        <br />
        <Button color="primary" variant="contained" type="submit">
          POST
        </Button>
      </form>
    </div>
  );
}
