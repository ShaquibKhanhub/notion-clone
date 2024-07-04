import Image from "next/image";

export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
        <Image
            src="/idea.svg"
            fill
            className="object-contain dark:hidden"
            alt="Idea"
          />
          <Image
            src="/idea-dark.svg"
            fill
            className="hidden object-contain dark:block"
            alt="Idea"
          />
        </div>
        <div className="relative hidden h-[25rem] w-[25rem] md:block">
          <Image
            src="/team.svg"
            fill
            className="object-contain dark:hidden"
            alt="Team"
          />
          <Image
            src="/team-dark.svg"
            fill
            className="hidden object-contain dark:block"
            alt="Team"
          />
        </div>
      </div>
    </div>
  );
};
