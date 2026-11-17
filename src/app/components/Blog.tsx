import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { PageShell } from "./PageShell";
import { getUpdatePosts, updateExcerpt, updatePictureUrl, type UpdatePost } from "../content/updatesContent";

function InlineText({ post }: { post: UpdatePost }) {
  const paragraphs = post.text.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  return (
    <div className="space-y-5 text-lg leading-8">
      {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      {post.link && (
        <a className="inline-flex items-center gap-2 font-semibold text-[color:var(--primary)] hover:underline" href={post.link} target="_blank" rel="noreferrer">
          {post.linkLabel || "Learn more"} <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      )}
      {post.links.length > 0 && (
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          {post.links.map((link) => (
            <a key={link.url} className="inline-flex items-center gap-2 font-semibold text-[color:var(--primary)] hover:underline" href={link.url} target="_blank" rel="noreferrer">
              {link.label} <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function InlineImage({ post, side = false }: { post: UpdatePost; side?: boolean }) {
  const src = updatePictureUrl(post);
  if (!src) return null;
  return <img src={src} alt={`Illustration for ${post.title}`} className={side ? "aspect-[4/3] h-full max-h-[560px] w-full object-cover" : "aspect-[16/9] max-h-[640px] w-full object-cover"} />;
}

function FullUpdate({ post }: { post: UpdatePost }) {
  const metadata = [post.author, post.date].filter(Boolean).join(" · ");
  const side = post.picture && (post.picturePlacement === "left" || post.picturePlacement === "right");
  return (
    <article className="border-l-4 border-[color:var(--accent)] bg-[color:var(--secondary)] p-6 lg:p-8">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--clay)]">Research Update</p>
      <h2 className="text-2xl font-semibold lg:text-3xl">{post.title}</h2>
      {metadata && <p className="mt-2 text-base text-[color:var(--muted-foreground)]">{metadata}</p>}
      {post.picturePlacement === "up" && <div className="mt-6"><InlineImage post={post} /></div>}
      {side ? (
        <div className="mt-6 grid items-start gap-8 lg:grid-cols-2">
          {post.picturePlacement === "left" && <InlineImage post={post} side />}
          <InlineText post={post} />
          {post.picturePlacement === "right" && <InlineImage post={post} side />}
        </div>
      ) : <div className="mt-6"><InlineText post={post} /></div>}
      {post.picturePlacement === "down" && <div className="mt-6"><InlineImage post={post} /></div>}
    </article>
  );
}

export function Blog() {
  const posts = getUpdatePosts();
  return (
    <PageShell breadcrumb={[["Home", "/"], ["Updates"]]}>
      <header className="mb-8 max-w-4xl">
        <h1 className="mb-5 text-4xl font-semibold lg:text-5xl">Research Updates</h1>
        <p className="text-lg leading-8 text-[color:var(--muted-foreground)]">Project news, research progress, field notes, and stories from across LASER.</p>
      </header>
      {posts.length === 0 ? (
        <p className="text-lg leading-8 text-[color:var(--muted-foreground)]">We do not have any research updates ready to share at this time.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => {
            const metadata = [post.author, post.date].filter(Boolean).join(" · ");
            if (!post.separatePage) return <FullUpdate key={post.slug} post={post} />;
            return (
              <article key={post.slug} className="border-l-4 border-[color:var(--accent)] bg-[color:var(--secondary)] p-6 lg:p-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--clay)]">Research Update</p>
                <h2 className="text-2xl font-semibold lg:text-3xl"><Link to={`/blog/${post.slug}`} className="hover:text-[color:var(--primary)]">{post.title}</Link></h2>
                {metadata && <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">{metadata}</p>}
                {post.text && <p className="mt-4 max-w-5xl leading-7">{updateExcerpt(post.text)}</p>}
                <Link to={`/blog/${post.slug}`} className="mt-4 inline-flex items-center gap-2 font-semibold text-[color:var(--primary)] hover:underline">
                  Read the update <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </PageShell>
  );
}
