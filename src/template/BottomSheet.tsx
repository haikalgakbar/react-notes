export default function BottomSheet({ children }) {
  return (
    <>
      <div className="fixed bg-background-alpha-light/50 dark:bg-background-alpha-dark/50 top-0 right-0 bottom-0 left-0 min-h-screen">
        {children}
      </div>
    </>
  );
}
