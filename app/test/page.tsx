import NeonGrid from "@/components/hero/neonGrid";
import Timeline from "@/components/timeline/page";

const test = () => {
  return (
    <>
      <NeonGrid />
      <Timeline
        events={[
          { title: "Registration begins", time: "test" },
          { title: "Registration Ends", time: "test2" },
          { title: "Presentation submission begins", time: "test5" },
          { title: "Presentation submission deadline", time: "test6" },
          { title: "First Day Of Hackathon", time: "test3" },
          { title: "Final Day and Results", time: "test4" },
        ]}
      />
      <section className="h-screen bg-blue-950"></section>
    </>
  );
};

export default test;
