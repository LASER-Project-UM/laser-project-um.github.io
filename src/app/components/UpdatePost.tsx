import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useParams } from "react-router";
import { getUpdatePosts, updatePictureUrl, type UpdatePost as UpdatePostData } from "../content/updatesContent";
import { PageShell } from "./PageShell";

function PostText({ post }: { post: UpdatePostData }) {
  const paragraphs = post.text.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  return (
    <div className="space-y-5 text-lg leading-8 text-[color:var(--muted-foreground)]">
      {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      {post.link && (
        <a className="inline-flex items-center gap-2 font-semibold text-[color:var(--primary)] hover:underline" href={post.link} target="_blank" rel="noreferrer">
          {post.linkLabel || "Learn more"} <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

function PostImage({ post, side = false }: { post: UpdatePostData; side?: boolean }) {
  const src = updatePictureUrl(post);
  if (!src) return null;
  return (
    <figure className="overflow-hidden">
      <img
        src={src}
        alt={`Illustration for ${post.title}`}
        className={side ? "aspect-[4/3] h-full max-h-[620px] w-full object-cover" : "aspect-[16/9] max-h-[680px] w-full object-cover"}
      />
    </figure>
  );
}

export function UpdatePost() {
  const { slug } = useParams();
  const post = getUpdatePosts().find((item) => item.slug === slug);

  if (!post) {
    return (
      <PageShell breadcrumb={[["Home", "/"], ["Updates", "/blog"], ["Post not found"]]}>
        <h1 className="mb-4 text-4xl font-semibold">Update not found</h1>
        <Link to="/blog" className="font-semibold text-[color:var(--primary)] hover:underline">Return to Updates</Link>
      </PageShell>
    );
  }

  const isSideLayout = post.picture && (post.picturePlacement === "left" || post.picturePlacement === "right");
  const metadata = [post.author, post.date].filter(Boolean).join(" · ");

  return (
    <PageShell breadcrumb={[["Home", "/"], ["Updates", "/blog"], [post.title]]}>
      <article>
        <header className="mb-8 max-w-5xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--clay)]">Research Update</p>
          <h1 className="text-4xl font-semibold leading-tight lg:text-5xl">{post.title}</h1>
          {metadata && <p className="mt-4 text-base text-[color:var(--muted-foreground)]">{metadata}</p>}
        </header>

        {post.picturePlacement === "up" && <div className="mb-8"><PostImage post={post} /></div>}

        {isSideLayout ? (
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            {post.picturePlacement === "left" && <PostImage post={post} side />}
            <PostText post={post} />
            {post.picturePlacement === "right" && <PostImage post={post} side />}
          </div>
        ) : (
          <div className="max-w-4xl"><PostText post={post} /></div>
        )}

        {post.picturePlacement === "down" && <div className="mt-8"><PostImage post={post} /></div>}

        <Link to="/blog" className="mt-12 inline-flex items-center gap-2 font-semibold text-[color:var(--primary)] hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Updates
        </Link>
      </article>
    </PageShell>
  );
}

