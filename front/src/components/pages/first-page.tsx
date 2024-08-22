import Content from "./content";
import NavBar from "../navbar/navbar";

export default function FirstPage() {
  return (
    <div className="w-full flex bg-zinc-900 h-screen text-white">
      <NavBar />
      <Content />
    </div>
  );
}
