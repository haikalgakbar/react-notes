type Btn = {
  type: "default" | "FAB";
};

const bool = true;

export default function Button({ children, type: Btn = "default" }) {
  return <button className="">{children}</button>;
}
