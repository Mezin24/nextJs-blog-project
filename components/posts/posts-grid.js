import classes from './post-grid.module.css';
import PostItem from './post-item';

const PostGrid = ({ posts }) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.id} />
      ))}
    </ul>
  );
};

export default PostGrid;
