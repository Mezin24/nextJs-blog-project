import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const postDir = path.join(process.cwd(), 'content', 'posts');

const getPostData = (fileName) => {
  const filePath = path.join(postDir, fileName);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const postSlug = fileName.replace(/\.md$/, '');
  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
};

export const getAllPosts = () => {
  const postFiles = fs.readdirSync(postDir);
  const allPosts = postFiles.map((file) => getPostData(file));
  const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date);

  return sortedPosts;
};

export const getFeaturedPosts = () => {
  const allPosts = getAllPosts();
  return allPosts.filter((post) => post.isFeatured);
};
