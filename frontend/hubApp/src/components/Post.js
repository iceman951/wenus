import React, { useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@material-ui/core/";
import { Grid } from "@material-ui/core";
import { deletePost, editPost } from "../store/actions/postAction";
import { useDispatch } from "react-redux";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";

import {
  Modal,
  TextField,
  Divider,
  Button,
  makeStyles,
} from "@material-ui/core/";
import { useFormik } from "formik";
import * as yup from "yup";

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
}));

const validationPostSchema = yup.object({
  text: yup
    .string("Enter your text")
    .min(1, "Should be of minimum 1 characters length")
    .required("Text is required"),
});

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  //Kebab
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //Action
  const handleDeletePost = (post_id) => {
    deletePost(dispatch, post_id);
    dispatch({ type: "isLoading" });
  };

  //Modal
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    handleClose();
  };

  //Formik
  const formik = useFormik({
    initialValues: {
      post_id: post._id,
      text: post.text,
    },
    validationSchema: validationPostSchema,
    onSubmit: (values, actions) => {
      dispatch({ type: "isLoading" });
      editPost(dispatch, values);
      handleCloseModal();
      actions.resetForm();
    },
  });

  const modalBody = (
    <div className={classes.paper}>
      <Typography align="center" variant="h6" className={classes.typography}>
        แก้ไขโพสต์
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
          placeholder="กรุณาพิมพ์ข้อความเพื่อแก้ไขโพสต์"
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
          แก้ไข
        </Button>
      </form>
    </div>
  );

  return (
    <>
      <Card key={post._id} style={{ marginBottom: "1%" }}>
        <CardContent>
          <Grid container justify="center" alignItems="flex-start">
            <Grid item xs={2}>
              <Avatar></Avatar>
            </Grid>
            <Grid item xs={8}>
              <Box minWidth={1}>
                <Typography style={{ wordWrap: "break-word" }}>
                  {post.text}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                aria-label="more"
                aria-controls="post-menu"
                aria-haspopup="true"
                onClick={handleClickOpen}
              >
                <MoreVertIcon fontSize="small" />
              </IconButton>
              <Menu
                id="post-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    width: "20ch",
                  },
                }}
              >
                <MenuItem onClick={() => handleOpenModal()}>
                  <EditIcon fontSize="small" />
                  <Typography variant="inherit">แก้ไขโพสต์</Typography>
                </MenuItem>
                <MenuItem onClick={() => handleDeletePost(post._id)}>
                  <DeleteIcon fontSize="small" />
                  <Typography variant="inherit">ลบโพสต์</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Modal
        className={classes.modal}
        open={openModal}
        onClose={handleCloseModal}
      >
        {modalBody}
      </Modal>
    </>
  );
};

export default Post;
