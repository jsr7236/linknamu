export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

// TODO: 아래는 보여주기용 더미 값입니다. 실제 내용으로 교체하세요.
export const profile = {
  name: "정개밣",
  bio: "풀스택 개발자 | 요즘에는 AI 개발에 관심이 많아요",
  image: "/profile.png",
};

// 링크 카드 목록. id는 클릭 수 집계 키로 쓰이므로 정한 뒤에는 바꾸지 마세요.
export const links: LinkItem[] = [
  { id: "github", title: "GitHub", url: "https://github.com/username" },
  { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/in/username" },
  { id: "blog", title: "Blog", url: "https://example.com" },
];
