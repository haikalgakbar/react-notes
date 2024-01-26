export default function ButtonChildren({
  children,
  isOpen,
  mp,
}: {
  children: any;
  isOpen: any;
  mp: string;
}) {
  return (
    <button
      className={`fixed p-4 bg-white rounded-full ${mp} m-4 shadow-xl`}
      onClick={() => isOpen(true)}
    >
      {children}
    </button>
  );
}
