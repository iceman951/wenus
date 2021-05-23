import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import Post from "./Post";
import { Container } from "@material-ui/core/";
import { getPosts } from "../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";

export default function Posts() {
  const dispatch = useDispatch();
  // const allPosts = useSelector((state) => state.post.allPosts);
  const posts = useSelector((state) => state.post.posts);
  const selectedTag = useSelector((state) => state.tag.selectedTag);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    console.log(skip)
    getPosts(dispatch, selectedTag, skip);
  }, [dispatch, selectedTag, skip]);


  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [posts.length]);

  const handleScroll = (e) => {
    const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
    // console.log(clientHeight, scrollTop, scrollHeight, e);

    if (clientHeight + scrollTop === scrollHeight) {
      setSkip(posts.length);
    }
  };
  return (
    <Container>
      {posts.map((post) => (
        <LazyLoad key={post._id} placeholder={<div>loading....</div>}>
          <Post key={post._id} post={post} />
        </LazyLoad>
      ))}
    </Container>
  );
}
