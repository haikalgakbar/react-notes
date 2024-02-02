export default function EmptyNotes() {
  return (
    <section className="flex h-screen w-full flex-col items-center justify-center">
      <h1 className="text-xl font-semibold text-foreground-base-1-light dark:text-foreground-base-1-dark">
        Create first note📝
      </h1>
      <p className="text-foreground-base-2-light dark:text-foreground-base-2-dark">
        Tap the pencil button to get started
      </p>
    </section>
  );
}
