import React, { useState, useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  makeStyles,
  Modal,
  Avatar,
  Card,
  CardContent,
  Container,
} from "@material-ui/core/";
import { red } from "@material-ui/core/colors";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/actions/postAction";
import PostForm from "../../forms/PostForm";
import { SocketContext } from "../../context/socket";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginTop: theme.spacing(2),
    borderRadius: 20,
  },
  details: {
    display: "flex",
    flexDirection: "row",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const validationPostSchema = yup.object({
  text: yup
    .string("Enter your text")
    .min(1, "Should be of minimum 1 characters length")
    .required("Text is required"),
});

const CreatePost = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);
  const user_id = useSelector((state) => state.user.user._id);
  const selectedTag = useSelector((state) => state.tag.selectedTag);
  
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    socket.on("new-post", (userObjects) => {
      dispatch({ type: "COUNT_NEW_POST" });
      console.log(userObjects);
    });
  }, [dispatch, socket]);

  const SentMessage = () => {
    socket.emit("sent-post", user_id);
    // console.log(socket);
  };

  const formik = useFormik({
    initialValues: {
      text: "",
      tag: "ทั่วไป",
    },
    validationSchema: validationPostSchema,
    onSubmit: (values, actions) => {
      createPost(dispatch, SentMessage, values, selectedTag);
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

  return (
    <>
      <Container style={{ marginBottom: "1%", padding: 0 }}>
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
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
      >
        <>
          <PostForm actions="create" formik={formik} />
        </>
      </Modal>
    </>
  );
};

export default CreatePost;
