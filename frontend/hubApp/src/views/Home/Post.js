import React, { useState, useEffect } from "react";
//component
import Comment from "./Comment";
// Mui
import {
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Button,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Container,
  Collapse,
  List,
  Divider,
} from "@material-ui/core/";
// Icon
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import MessageOutlinedIcon from "@material-ui/icons/MessageOutlined";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
// Redux
import { deletePost, editPost, likePost } from "../../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
// Formik
import { useFormik } from "formik";
import * as yup from "yup";
import CommentForm from "../../forms/CommentForm";
import PostForm from "../../forms/PostForm";
import moment from "moment";
import "moment/locale/th";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  post: {
    borderRadius: "20px",
    padding: theme.spacing(2, 2, 1),
    marginBottom: theme.spacing(2),
  },
  post_title: {
    textAlign: "left",
  },
  numbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
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
  const handleDeletePost = () => {
    deletePost(dispatch, post);
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

  return (
    <>
      <Card className={classes.post}>
        <CardHeader
          className={classes.post_title}
          avatar={<Avatar style={{ backgroundColor: isAuthor ? "red" : "" }} />}
          action={
            isAuthor && (
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
                    onClick={() => handleDeletePost()}
                    style={{ color: "red" }}
                  >
                    <DeleteIcon fontSize="small" />
                    <Typography variant="inherit">ลบโพสต์</Typography>
                  </MenuItem>
                </Menu>
              </>
            )
          }
          title={
            <>
              {`${post.author.firstName} ${post.author.lastName}`}
              <LocalOfferIcon
                style={{ fontSize: "20px", paddingLeft: "1%", color: "gray" }}
              />
              {post.tag}
            </>
          }
          subheader={
            moment(post.createDate) > moment().subtract(1, "days")
              ? `${moment(post.createDate).fromNow()}`
              : `${moment(post.createDate).format("วันddddที่ DD MMM YYYY เวลา HH:mm น.")}`
          }
        />
        <CardContent>
          <Typography
            paragraph
            style={{ wordWrap: "break-word", textAlign: "left" }}
          >
            {post.text}
          </Typography>
          <Container className={classes.numbar}>
            {nLike !== 0 ? <Typography>ถูกใจ: {nLike}</Typography> : <Typography />}
            {nComment !== 0 ? (
              <Typography>ความคิดเห็น: {nComment} รายการ</Typography>
            ) : (
              <Typography />
            )}
          </Container>
          <Divider
            style={{
              marginTop: "1%",
            }}
          />
        </CardContent>
        <CardActions style={{ padding: 0 }}>
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
        {expanded && (
          <Divider
            style={{
              margin: "1%",
            }}
          />
        )}
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
        <>
          <PostForm actions="Edit" formik={formik} />
        </>
      </Modal>
    </>
  );
};

export default Post;
