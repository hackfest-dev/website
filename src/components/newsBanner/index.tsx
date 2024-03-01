import Marquee from "react-fast-marquee";
import Link from "next/link";
export default function NewsBanner() {
  return (
    <Marquee className="bg-[#06103d] py-2 text-sm text-white">
      <Link href="/register" className="flex items-center">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
          return (
            <div key={item} className="mr-5 flex">
              Registrations extended till March 9 2024{" "}
              <span className="ml-5">◆</span>
            </div>
          );
        })}
      </Link>
    </Marquee>
  );
}
