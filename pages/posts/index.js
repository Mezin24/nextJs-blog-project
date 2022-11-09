import AllPosts from '../../components/posts/all-posts';
import { DUMMY_POSTS as posts } from '../../dummy_data';

const AllPostsPage = () => {
  return <AllPosts posts={posts} />;
};

export default AllPostsPage;
