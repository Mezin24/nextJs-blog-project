import classes from './featured-posts.module.css';
import PostGrid from '../posts/posts-grid';

const FeaturedPosts = ({ posts }) => {
  return (
    <div className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostGrid posts={posts} />
    </div>
  );
};

export default FeaturedPosts;
