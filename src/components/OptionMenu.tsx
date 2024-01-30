export default function OpenMenu({ getRef, className, children }) {
  return (
    <div
      ref={getRef}
      className={className}
      // className="absolute flex flex-col p-1 bottom-16 right-[${right}] bg-background-base-1-light dark:bg-background-base-1-dark shadow-md border-[.5px] rounded-md border-stroke-base-3-light dark:border-stroke-base-3-dark min-w-36"
    >
      {children}
    </div>
  );
}
