import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Axios } from "../../components/HttpClient";
import {
  Button,
  Divider,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "70vh",
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: "#4d4d4d",
    // border: "1px solid #000",
    borderRadius: "10px 10px 10px 10px",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 3, 2),
  },
  typography: {
    color: "#fff",
  },
  input: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
    color: "white",
  },
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //   },
}));

const validationPostSchema = yup.object({
  text: yup
    .string("Enter your email")
    .min(1, "Should be of minimum 1 characters length")
    .required("Text is required"),
});

const CreatePost = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      text: "",
      tag: "ทั่วไป",
    },
    validationSchema: validationPostSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      Axios.post(`/posts`, values).then((res) => {
        console.log(res.data);
        console.log(res);
      });
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div className={classes.paper}>
      {/* init commented */}
      {/* <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p>
      <SimpleModal /> */}
      <Typography align="center" variant="h6" className={classes.typography}>
        สร้างโพสต์
      </Typography>
      <Divider
        style={{
          marginBottom: "3%",
          marginTop: "3%",
        }}
      />
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="tag">Tags</InputLabel>
          <Select
            id="tag"
            value={formik.values.tag}
            onChange={formik.handleChange("tag")}
            autoWidth
            className={classes.input}
          >
            <MenuItem value="ทั่วไป">ทั่วไป</MenuItem>
            <MenuItem value="ความรัก">ความรัก</MenuItem>
            <MenuItem value="การศึกษา">การศึกษา</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="text"
          placeholder="Type someting here..."
          multiline
          rows={6}
          fullWidth
          InputProps={{ className: classes.input }}
          value={formik.values.text}
          onChange={formik.handleChange("text")}
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
        />
        <Button
          fullWidth
          style={{ backgroundColor: "blue", color: "white" }}
          type="submit"
        >
          โพสต์
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <button
        type="button"
        onClick={handleOpen}
        style={{ marginTop: "2%", width: "70vh", fontSize: "20px" }}
      >
        คุณอยากโพสต์อะไร
      </button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        // aria-labelledby="simple-modal-title"
        // aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    </div>
  );
};

export default CreatePost;
