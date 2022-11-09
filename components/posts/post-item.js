import Image from 'next/image';
import Link from 'next/link';
import classes from './post-item.module.css';

const PostItem = ({ post }) => {
  const { title, image, excerpt, date, slug } = post;
  const formatedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const imagePath = `/images/posts/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <div className={classes.img}>
          <Image
            src={imagePath}
            alt={title}
            width={300}
            height={200}
            layout='responsive'
          />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <time>{formatedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
