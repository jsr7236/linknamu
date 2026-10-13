import LinkList from "@/components/LinkList";
import Profile from "@/components/Profile";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-6">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>

      <div className="mt-6">
        <Profile {...profile} />
      </div>

      <LinkList links={links} />

      <footer className="mt-auto pt-10 text-center text-xs text-neutral-400">링크나무</footer>
    </main>
  );
}
