import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postDir = path.join(process.cwd(), 'content', 'posts');

export const readFiles = () => fs.readdirSync(postDir);

export const getPostData = (postName) => {
  const postSlug = postName.replace(/\.md$/, '');
  const filePath = path.join(postDir, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
};

export const getAllPosts = () => {
  const postFiles = readFiles();
  const allPosts = postFiles.map((file) => getPostData(file));
  const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date);

  return sortedPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.isFeatured);
};
