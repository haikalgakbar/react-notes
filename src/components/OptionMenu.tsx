export default function OpenMenu({ getRef, children }) {
  return (
    <div
      ref={getRef}
      className="absolute flex flex-col p-1 bottom-16 right-4 bg-background-base-1-light dark:bg-background-base-1-dark shadow-md border-[.5px] rounded-md border-stroke-base-3-light dark:border-stroke-base-3-dark min-w-32"
    >
      {children}
    </div>
  );
}
