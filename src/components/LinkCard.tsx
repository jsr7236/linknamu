"use client";

import type { LinkItem } from "@/data/profile";

function recordClick(id: string) {
  const body = JSON.stringify({ id });
  // sendBeacon은 페이지를 떠나는 중에도 전송이 보장됨
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/clicks", new Blob([body], { type: "application/json" }));
  } else {
    fetch("/api/clicks", { method: "POST", body, keepalive: true });
  }
}

type LinkCardProps = {
  link: LinkItem;
  count: number;
  onClick?: () => void;
};

export default function LinkCard({ link, count, onClick }: LinkCardProps) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        recordClick(link.id);
        onClick?.();
      }}
      className="relative block w-full rounded-xl border border-neutral-300 bg-white px-14 py-4 text-center font-medium shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-500 hover:shadow-md active:translate-y-0 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-emerald-400"
    >
      {link.title}
      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-normal tabular-nums text-neutral-400">
        {count.toLocaleString()}
      </span>
    </a>
  );
}
