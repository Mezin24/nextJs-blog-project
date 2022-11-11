import PostContent from '../../components/posts/post-detail/post-content';
import { getPostData, readFiles } from '../../lib/post-util';

const SinglePostPage = ({ post }) => {
  return <PostContent post={post} />;
};

export const getStaticProps = async (ctx) => {
  const { params } = ctx;
  const { slug } = params;

  const post = getPostData(slug);
  return {
    props: {
      post: post,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = async () => {
  const paths = readFiles().map((file) => ({
    params: { slug: file.replace(/\.md$/, '') },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default SinglePostPage;
