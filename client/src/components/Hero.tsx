const Hero = () => {
  return (
    <div className="bg-blue-800 pb-16">
      {/* gap-2 adds spacing for child elements */}
      <div className="container mx-auto flex flex-col gap-2">
        <h1 className="text-5xl text-white font-bo">Find your next class</h1>
        <p className="text-2xl text-white">
          Search our catalog for your next class
        </p>
      </div>
    </div>
  );
};

export default Hero;
