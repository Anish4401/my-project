import Image from "next/image";

function Banner() {
  return (
    <div>
      <img
        className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] w-full
 "
        src="https://ascentialcdn.filespin.io/api/v1/conversion/7d8e44a8090b4b68bf7462af345a2328"
        alt="Banner Image"
        // layout='fill'
        // objectFit='cover'
      />
      <div className="absolute top-1/2 w-full text-center">
        <p className="text-sm sm:text-lg text-white ">
          Not Sure But Thinking to Move on Madrid With Anish..
        </p>
        <button
          className=" text-purple-500 bg-white px-10 py-4 shadow-lg
    rounded-full font-bold my-3 hover:shadow-xl active:scale-90 transition duration-160 "
        >
          I'm Flexible
        </button>
      </div>
    </div>
  );
}

export default Banner;
