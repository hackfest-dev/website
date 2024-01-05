import { BorderedContainer, Button } from '@/src/components/ui';
import Hero from '@/src/components/hero';

const test = () => {
  return (
    <>
      <Hero></Hero>
      {/* <Timeline
        events={[
          { title: "Registration begins", time: "test" },
          { title: "Registration Ends", time: "test2" },
          { title: "Presentation submission begins", time: "test5" },
          { title: "Presentation submission deadline", time: "test6" },
          { title: "First Day Of Hackathon", time: "test3" },
          { title: "Final Day and Results", time: "test4" },
        ]}
      /> */}
      <section className="h-screen bg-blue-950 flex flex-col justify-center items-center gap-5">
        <Button size="extraLarge" varient="secondary">
          See how to use below!!
        </Button>

        <BorderedContainer
          className="p-5 w-full"
          parentClassName="w-80"
          varient="primary"
        >
          {/* 
            varient: primary | secondary (changes the color of the border)
            borderFace: default | inverted (changes the direction of the border faced)

            className is styling for inside the bordered container
            parentClassName is styling for the container itself 
            - for eg. if you want to add margin to the container set it in parentClassName, if you want to create a grid insede the container set it in className
          */}
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatur
            cumque, officia doloremque iusto voluptas, sed placeat dolorem
            voluptate minima vel quasi dolores a ipsum eum, beatae totam?
            Eligendi, rerum omnis?
          </p>
          <div>Lorem, ipsum dolor.</div>
        </BorderedContainer>

        <Button size="medium" varient="primaryOutline">
          {/* 
            size: large | medium | small | extraLarge
            varient: primary | secondary | primaryOutline | secondaryOutline

            and most the other props of react-aria-components/Button (https://react-spectrum.adobe.com/react-aria/Button.html)
          */}
          {/* Hover me */}
          hello
        </Button>
      </section>
    </>
  );
};

export default test;
