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
  Avatar,
  Card,
  CardContent,
  Container,
  Backdrop,
  CircularProgress,
} from "@material-ui/core/";
import { red } from "@material-ui/core/colors";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/actions/postAction";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "70vh",
    backgroundColor: "#4d4d4d",
    borderRadius: "10px 10px 10px 10px",
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
  card: {
    marginTop: "3%",
  },
  details: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    backgroundColor: red[500],
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const validationPostSchema = yup.object({
  text: yup
    .string("Enter your email")
    .min(1, "Should be of minimum 1 characters length")
    .required("Text is required"),
});

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const CreatePost = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch()
  const loading = useSelector(state => state.post.loading)

  const formik = useFormik({
    initialValues: {
      text: "",
      tag: "ทั่วไป",
    },
    validationSchema: validationPostSchema,
    onSubmit: (values, actions) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch({type:"isLoading"})
      createPost(dispatch, values)
      handleClose();
      // handleToggle();
      actions.resetForm();
    },
  });
  // Modal
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // BackDrop
  const handleCloseBackDrop = () => {
    setIsLoading(false);
  };
  const handleToggle = () => {
    setIsLoading(!isLoading);
  };

  const modalBody = (
    <div className={classes.paper}>
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
          placeholder="คุณอยากโพสต์อะไร?"
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
          // style={{ backgroundColor: "blue", color: "white" }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={!formik.values.text}
        >
          โพสต์
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <Container>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.details}>
              <Avatar className={classes.avatar}></Avatar>
              <Button
                variant="contained"
                disableElevation
                onClick={handleOpen}
                fullWidth
                style={{
                  marginLeft: "2%",
                  borderRadius: "50px",
                  fontSize: "16px",
                  justifyContent: "flex-start",
                  textTransform: "none",
                }}
              >
                {!formik.values.text ? "คุณอยากโพสต์อะไร?" : formik.values.text}
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        {modalBody}
      </Modal>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CreatePost;
