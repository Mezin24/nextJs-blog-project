import Hero from '../components/home-page/hero';
import FeaturedPosts from '../components/home-page/featured-posts';
import { DUMMY_POSTS as posts } from '../dummy_data';

const HomePage = () => {
  console.log(posts);
  return (
    <>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export default HomePage;
