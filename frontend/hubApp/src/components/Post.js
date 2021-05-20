import React, { useState } from "react";
// Mui
import {
  Avatar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Divider,
  Button,
  makeStyles,
  Grid,
  Paper,
} from "@material-ui/core/";
// Icon
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
// Redux
import { deletePost, editPost } from "../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
// Formik
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
    borderRadius: "10px",
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
  root: {
    borderRadius: "20px",
    padding: theme.spacing(2, 2, 1),
    marginBottom: theme.spacing(2),
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
  const current_user = useSelector((state) => state.user.user);
  const isAuthor = current_user._id === post.author._id;
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
      <Paper className={classes.root}>
        <Grid container spacing={2} direction="column">
          <Grid item container justify="center" alignItems="flex-start">
            <Grid item xs={1}>
              <Avatar></Avatar>
            </Grid>
            <Grid item xs={10}>
              <Box minWidth={1}>
                <Typography style={{ wordWrap: "break-word" }}>
                  {post.text}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={1}>
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
                    width: "25ch",
                  },
                }}
              >
                <MenuItem disabled={isAuthor} onClick={() => handleOpenModal()}>
                  <EditIcon fontSize="small" />
                  <Typography variant="inherit">แก้ไขโพสต์</Typography>
                </MenuItem>
                <MenuItem disabled={isAuthor} onClick={() => handleDeletePost(post._id)}>
                  <DeleteIcon fontSize="small" />
                  <Typography variant="inherit">ลบโพสต์</Typography>
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
          <Grid item container xs direction='row'>
            <Grid item xs={6}>
              <Button>LIKE</Button>
            </Grid>
            <Grid item xs={6}>
              <Button>Comment</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
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
