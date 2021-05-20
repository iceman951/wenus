import React, { useState, useEffect } from "react";
//component
import Comment from "./Comment";
// Mui
import {
  Avatar,
  Typography,
  IconButton,
  // Box,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Divider,
  Button,
  makeStyles,
  // Paper,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Container,
  Collapse,
  List,
} from "@material-ui/core/";
// Icon
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
// Redux
import { deletePost, editPost, likePost } from "../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
// Formik
import { useFormik } from "formik";
import * as yup from "yup";
import CommentForm from "../forms/CommentForm";

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
  post: {
    borderRadius: "20px",
    padding: theme.spacing(2, 2, 1),
    marginBottom: theme.spacing(2),
  },
  numbar: {
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
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

  const [expanded, setExpanded] = React.useState(false);

  const handleCommentClick = () => {
    setExpanded(!expanded);
  };
  //liked
  const [nLike, setNLike] = useState(0);
  const [nComment, setNComment] = useState(0);
  const [liked, setLiked] = useState(null);

  useEffect(() => {
    setLiked(post.liked_users.some((luser) => luser._id === current_user._id));
    setNLike(post.liked_users.length);
    setNComment(post.comments.length);
  }, [current_user._id, post]);

  const handleClickLike = () => {
    if (liked) {
      setNLike(nLike - 1);
    } else {
      setNLike(nLike + 1);
    }
    likePost(post._id);
    setLiked(!liked);
  };

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
      <Card className={classes.post}>
        <CardHeader
          avatar={<Avatar />}
          action={
            <>
              <IconButton
                aria-controls="post-menu"
                aria-haspopup="true"
                onClick={handleClickOpen}
              >
                <MoreVertIcon />
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
                <MenuItem
                  disabled={!isAuthor}
                  onClick={() => handleOpenModal()}
                >
                  <EditIcon fontSize="small" />
                  <Typography variant="inherit">แก้ไขโพสต์</Typography>
                </MenuItem>
                <MenuItem
                  disabled={!isAuthor}
                  onClick={() => handleDeletePost(post._id)}
                >
                  <DeleteIcon fontSize="small" />
                  <Typography variant="inherit">ลบโพสต์</Typography>
                </MenuItem>
              </Menu>
            </>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          {/* <Box minWidth={1}> */}
          <Typography
            paragraph
            style={{ wordWrap: "break-word", textAlign: "left" }}
          >
            {post.text}
          </Typography>
          {/* </Box> */}
          <Container className={classes.numbar}>
            {nLike !== 0 ? <Typography>ถูกใจ: {nLike}</Typography> : <></>}
            {nComment !== 0 ? (
              <Typography>ความคิดเห็น: {nComment} รายการ</Typography>
            ) : (
              <></>
            )}
          </Container>
        </CardContent>
        <CardActions>
          <Button
            color={liked ? "secondary" : "default"}
            fullWidth
            onClick={() => handleClickLike()}
          >
            {liked ? (
              <ThumbUpIcon fontSize="small" />
            ) : (
              <ThumbUpOutlinedIcon fontSize="small" />
            )}
            {/* {nLike} */}
            <Typography>ถูกใจ</Typography>
          </Button>
          <Button
            fullWidth
            onClick={handleCommentClick}
            aria-expanded={expanded}
          >
            <MessageOutlinedIcon fontSize="small" />
            <Typography>แสดงความคิดเห็น</Typography>
          </Button>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <List>
            {post.comments.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </List>
          <CardContent>
            <CommentForm post_id={post._id} />
          </CardContent>
        </Collapse>
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
