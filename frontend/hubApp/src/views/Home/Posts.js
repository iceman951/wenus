import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import Post from "./Post";
import { Container } from "@material-ui/core/";
import { getMyPost, getPosts } from "../../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

const WINDOW_HEIGHT_20 = window.innerHeight / 5;

export default function Posts() {
  const dispatch = useDispatch();
  // const allPosts = useSelector((state) => state.post.allPosts);
  const posts = useSelector((state) => state.post.posts);
  const selectedTag = useSelector((state) => state.tag.selectedTag);
  const isLoading = useSelector((state) => state.post.loading);
  const dbPostsLength = useSelector((state) => state.post.dbPostsLength);
  const [skip, setSkip] = useState(0);

  //Load post when selectedTag changed
  useEffect(() => {
    dispatch({ type: "RESET_POST" });
    setSkip(0);
    if (selectedTag === "โพสต์ของฉัน") getMyPost(dispatch, 0);
    else getPosts(dispatch, selectedTag, 0, 0);
  }, [dispatch, selectedTag]);

  //Load next posts
  useEffect(() => {
    // console.log(skip);
    if (skip !== 0) {
      getPosts(dispatch, selectedTag, skip, dbPostsLength);
    }
  }, [dispatch, skip]);

  //scroll
  useEffect(() => {
    const handleScroll = (e) => {
      const { clientHeight, scrollTop, scrollHeight } =
        e.target.scrollingElement;
      // console.log(clientHeight, scrollTop, scrollHeight, e);

      if (clientHeight + scrollTop + WINDOW_HEIGHT_20 >= scrollHeight && !isLoading) {
        setSkip(skip + 5);
        // console.log("---------", clientHeight, scrollTop, scrollHeight)
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [posts.length]);

  return (
    <Container>
      {posts.map((post, i) => (
        <LazyLoad key={post._id} placeholder={<Loading />}>
          <Post key={post._id} post={post} />
        </LazyLoad>
      ))}
      {isLoading && <Loading />}
    </Container>
  );
}
