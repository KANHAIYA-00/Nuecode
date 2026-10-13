const Card = () => {
  return (
    <div className="w-60 h-70 bg-neutral-800 rounded-3xl text-neutral-300 p-4 flex flex-col items-start justify-center gap-3">
      <div className="w-52 h-40 bg-sky-300 rounded-2xl"></div>
      <div className="">
        <p className="font-extrabold">pdf converter</p>
      </div>
      <button className="bg-sky-700 font-extrabold p-2 px-6 rounded-xl">
        Open
      </button>
    </div>
  );
};

export default Card;
