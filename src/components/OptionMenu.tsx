export default function OpenMenu({ getRef, className, children }) {
  return (
    <form ref={getRef} className={className}>
      {children}
    </form>
  );
}
