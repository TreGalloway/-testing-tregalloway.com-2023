// contentlayer.config.ts
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";

// src/lib/contentlayer-adapter.js
import {
  defineDocumentType,
  defineNestedType,
  makeSource
} from "contentlayer/source-files";
import { compareDesc } from "date-fns";
var allPostsNewToOld = (void 0)?.sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date));
}) || [];

// contentlayer.config.ts
import imageMetadata from "@/lib/image-meta";
var Post2 = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `content/posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    description: {
      type: "string",
      required: true
    },
    slug: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    socialImage: {
      type: "string"
    },
    redirectFrom: {
      type: "list",
      of: { type: "string" }
    }
  },
  computedFields: {
    path: {
      type: "string",
      resolve: (post) => `/posts/${post.slug}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post2],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      // For generating slugs for headings
      rehypeCodeTitles,
      // For adding titles to code blocks
      [rehypePrism, { ignoreMissing: true }],
      // For code syntax highlighting
      imageMetadata
      // For adding image metadata (width, height)
    ]
  }
});
export {
  Post2 as Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-A3BHMH6K.mjs.map
