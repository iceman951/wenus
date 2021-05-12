import React from "react";
import { TextField, makeStyles } from "@material-ui/core/";
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
      </form>
    </div>
  );
}
