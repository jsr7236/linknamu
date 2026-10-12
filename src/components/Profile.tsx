import Image from "next/image";

type ProfileProps = {
  name: string;
  bio: string;
  image: string;
};

export default function Profile({ name, bio, image }: ProfileProps) {
  return (
    <section className="flex flex-col items-center text-center">
      <Image
        src={image}
        alt={`${name} 프로필 사진`}
        width={96}
        height={96}
        priority
        className="h-24 w-24 rounded-full border-2 border-emerald-500 object-cover"
      />
      <h1 className="mt-4 text-xl font-bold">{name}</h1>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{bio}</p>
    </section>
  );
}
