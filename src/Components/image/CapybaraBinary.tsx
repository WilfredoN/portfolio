const AboutMe = () => {
  return (
    <div className="flex m-0 flex-col items-center justify-center">
      <img
        src="https://i.ibb.co/V250X53/capybara-variant-2.png"
        alt="Capybara image in zeros and ones style"
        className="p-3 hover:p-0 transition-padding duration-300 ease-in-out
         rounded-full sm:w-1/3 xl:w-1/4 border-2"
        draggable="false"
      />
      <p
        className="text-2xl m-0 p-2 text-center flex justify-start leading-loose"
        style={{ minWidth: "55%" }}
      >
        Hi, I'm a Software Developer.
        <br /> I love to build web applications from start to finish.
        <br /> I have experience in Java, Spring on the backend, React and
        Angular on the frontend.
        <br /> Let's connect and create something amazing together!
      </p>
    </div>
  );
};

export default AboutMe;
