import React, { useEffect } from "react";
import LazyLoad from "react-lazyload";
import Post from "./Post";
import { getMyPost, getPosts } from "../../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Loading";

export default function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const selectedTag = useSelector((state) => state.tag.selectedTag);
  const isLoading = useSelector((state) => state.post.loading);
  const dbPostsLength = useSelector((state) => state.post.dbPostsLength);
  const skip = useSelector((state) => state.post.skip);

  //Load Post First Time && Change Tag
  useEffect(() => {
    console.log("First Time or Change Tag");
    dispatch({ type: "RESET_POST" });
    selectedTag === "ฉัน"
      ? getMyPost(dispatch, 0)
      : getPosts(dispatch, selectedTag, 0, 0);
  }, [dispatch, selectedTag]);
  //Load New Post When Change skip
  useEffect(() => {
    if (skip !== 0) {
      console.log("Next: New Skip", skip);
      selectedTag === "ฉัน"
        ? getMyPost(dispatch, skip)
        : getPosts(dispatch, selectedTag, skip, dbPostsLength);
    }
  }, [dispatch, skip, dbPostsLength]);
  //Load new post at bottom When scrolling
  useEffect(() => {
    const handleScroll = (e) => {
      if (!isLoading) {
        const { clientHeight, scrollTop, scrollHeight } =
          e.target.scrollingElement;

        if (clientHeight + scrollTop === scrollHeight && !isLoading) {
          console.log("Hit Bottom Zone");
          dispatch({ type: "NEXT_PAGE_POST" });
        }
      }
    };
    
    if(posts.length < 5 && posts.length !== 0 && !isLoading){
      dispatch({ type: "NEXT_PAGE_POST" });
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, isLoading, posts]);

  return (
    <>
      {posts.map((post, i) => (
        <LazyLoad key={post._id} placeholder={<Loading />}>
          <Post key={post._id} post={post} />
        </LazyLoad>
      ))}
      {isLoading && <Loading />}
    </>
  );
}
