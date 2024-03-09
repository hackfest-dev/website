import Marquee from "react-fast-marquee";
import Link from "next/link";
export default function NewsBanner() {
  return (
    <Marquee className="bg-[#06103d] text-sm py-2 text-white fixed">
      <Link href="/register" className="flex items-center">
        {[0, 1, 2, 3, 4, 5, 6, 7,9,10].map((item) => {
          return (
            <div key={item} className="mr-5 flex">
              Registrations closed{" "}
              <span className="ml-5">◆</span>
            </div>
          );
        })}
      </Link>
    </Marquee>
  );
}
