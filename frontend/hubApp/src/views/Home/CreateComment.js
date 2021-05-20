import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
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
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../store/actions/postAction";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    position: "absolute",
    width: "50vw",
    backgroundColor: theme.palette.primary.dark,
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
    marginTop: theme.spacing(2),
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
    .string("Enter your text")
    .min(1, "Should be of minimum 1 characters length")
    .required("Text is required"),
});

const CreateComment = ({post_id}) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);

  //redux
  const dispatch = useDispatch()
  const loading = useSelector(state => state.post.loading)

  const formik = useFormik({
    initialValues: {
      text: "",
    },
    validationSchema: validationPostSchema,
    onSubmit: (values, actions) => {
      dispatch({type:"isLoading"})
      createComment(dispatch, {...values, post_id:post_id})
      handleCloseModal();
      actions.resetForm();
    },
  });
  
  // Modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
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
      <Container style={{ marginBottom: "1%"}}>
        <Card className={classes.card}>
          <CardContent>
            <div className={classes.details}>
              <Avatar className={classes.avatar}></Avatar>
              <Button
                variant="contained"
                disableElevation
                onClick={handleOpenModal}
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
      <Modal className={classes.modal} open={openModal} onClose={handleCloseModal}>
        {modalBody}
      </Modal>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default CreateComment;
