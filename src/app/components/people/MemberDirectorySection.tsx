function NameList({ names }: { names: string[] }) {
  return (
    <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
      {names.map((name) => <li key={name} className="text-black">{name}</li>)}
    </ul>
  );
}

export function MemberDirectorySection({ title, description, names, last = false }: { title: string; description: string; names: string[]; last?: boolean }) {
  return (
    <section className={last ? undefined : "mb-14"}>
      <div className="mb-6 max-w-3xl">
        <h2 className="mb-2 text-2xl font-semibold">{title}</h2>
        <p className="leading-7 text-[color:var(--muted-foreground)]">{description}</p>
      </div>
      <NameList names={names} />
    </section>
  );
}
