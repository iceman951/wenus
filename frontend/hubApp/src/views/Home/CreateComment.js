import React, { useState } from "react";
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
import CommentForm from "../../forms/CommentForm";

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
}));
const CreateComment = ({ post_id }) => {
  const classes = useStyles();
  //   const [openModal, setOpenModal] = useState(false);

  // Modal
  //   const handleOpenModal = () => {
  //     setOpenModal(true);
  //   };
  //   const handleCloseModal = () => {
  //     setOpenModal(false);
  //   };
  //   const modalBody = (
  //     <div className={classes.paper}>
  //       <Typography align="center" variant="h6" className={classes.typography}>
  //         แสดงความคิดเห็น....
  //       </Typography>
  //       <Divider
  //         style={{
  //           marginBottom: "3%",
  //           marginTop: "3%",
  //         }}
  //       />
  //       <CommentForm post_id={post_id} />
  //     </div>
  //   );

  return (
    <>
      <CommentForm post_id={post_id} />
      {/* <Button
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
          {"แสดงความคิดเห็น"}
        </Button> */}
      {/* <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
      >
        {modalBody}
      </Modal> */}
    </>
  );
};

export default CreateComment;
