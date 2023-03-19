import type { NextPage } from 'next';
import { GetStaticProps } from 'next';
import { ArticleJsonLd } from 'next-seo';

import {
  getCommandPalettePosts,
  PostForCommandPalette,
} from '@/components/cmd/cmd-post';
import { useCommandPalettePostActions } from '@/components/cmd/cmd-post-actions';
// import LayoutPerPage from '@/components/LayoutPerPage';
import PostList, { PostForPostList } from '@/components/posts/post-list';
import { siteConfigs } from '@/configs/site-config';
import { allPostsNewToOld } from '@/lib/contentlayer-adapter';
import generateRSS from '@/lib/rss';

type PostForIndexPage = PostForPostList;

type Props = {
  posts: PostForIndexPage[];
  commandPalettePosts: PostForCommandPalette[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const commandPalettePosts = getCommandPalettePosts();
  const posts = allPostsNewToOld.map((post) => ({
    slug: post.slug,
    date: post.date,
    title: post.title,
    description: post.description,
    path: post.path,
  })) as PostForIndexPage[];

  generateRSS();

  return {
    props: {
      posts,
      commandPalettePosts,
    },
  };
};

const Home: NextPage<Props> = ({ posts, commandPalettePosts }) => {

  useCommandPalettePostActions(commandPalettePosts);

  return (
<> <ArticleJsonLd
        type="Blog"
        url={siteConfigs.fqdn}
        title={siteConfigs.title}
        images={[siteConfigs.bannerUrl]}
        datePublished={siteConfigs.datePublished}
        authorName={siteConfigs.author}
        description={siteConfigs.description}
      />

      <div className="my-12 space-y-2 prose transition-colors dark:prose-dark md:prose-lg md:space-y-5">
        <h1 className="text-center sm:text-left">{('intro-title')}</h1>
        <p>{('intro-1')}</p>
        <p>{('intro-2')}</p>
        <p>{('intro-3')}</p>
      </div>

      <div className="my-4 transition-colors divide-y divide-gray-200 dark:divide-gray-700">
        <div className="my-8 prose prose-lg dark:prose-dark">
          <h2>{('latest-posts')}</h2>
        </div>

        <PostList posts={posts} />
      </div></>
     

  );
};

export default Home;