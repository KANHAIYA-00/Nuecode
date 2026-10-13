const Animation = () => {
  return (
    <div className="duration-500 hover:duration-500">
      <div className="bg-transparent hover:scale-150 -top-10 left-32 absolute shadow-yellow-800 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-30 h-30"></div>

      <div className="bg-transparent hover:scale-150 top-80 left-2 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-20 h-20"></div>

      <div className="bg-transparent hover:scale-150 top-20 left-150 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-40 h-40"></div>

      <div className="bg-transparent hover:scale-150 top-100 left-200 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-70 h-70"></div>

      <div className="bg-transparent hover:scale-150 top-10 left-250 absolute shadow-green-800 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-30 h-30"></div>

      <div className="bg-transparent hover:scale-150 top-120 left-320 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-45 h-45"></div>

      <div className="bg-transparent hover:scale-150 top-120 left-80 absolute shadow-sky-500 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-35 h-35"></div>

      <div className="bg-transparent hover:scale-150 top-150 left-280 absolute shadow-yellow-800 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-15 h-15"></div>

      <div className="bg-transparent hover:scale-150 top-150 left-150 absolute shadow-red-800 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-20 h-20"></div>

      <div className="bg-transparent hover:scale-150 top-80 left-140 absolute shadow-sky-800 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-10 h-10"></div>

      <div className="bg-transparent hover:scale-150 top-50 left-40 absolute shadow-amber-800  shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-50 h-50"></div>

      <div className="bg-transparent hover:scale-150 top-150 left-20 absolute shadow-green-800 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-50 h-50"></div>

      <div className="bg-transparent hover:scale-150 top-50 left-300 absolute shadow-amber-800 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-40 h-40"></div>

      <div className="bg-transparent hover:scale-150 top-10 left-350 absolute shadow-sky-500 shadow-inner rounded-full transition-all ease-in-out hover:duration-500 duration-500 w-45 h-45"></div>
    </div>
  );
};
const Animation2 = () => {
  return (
    <div className="duration-500 hover:duration-500 group">
      <div className="group-hover:-rotate-45 bg-transparent group-hover:scale-150 -top-12 -left-12 absolute shadow-yellow-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-24 h-24"></div>
      <div className="group-hover:rotate-45 bg-transparent group-hover:scale-150 top-44 left-14 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-24 h-24"></div>
      <div className="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-24 left-56 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-24 h-24"></div>
      <div className="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-12 h-12"></div>
      <div className="group-hover:rotate-45 bg-transparent group-hover:scale-150 top-12 left-12 absolute shadow-green-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-44 h-44"></div>
      <div className="group-hover:rotate-45 bg-transparent group-hover:scale-150 -top-24 -left-12 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-64 h-64"></div>
      <div className="group-hover:-rotate-45 bg-transparent group-hover:scale-150 top-24 left-12 absolute shadow-sky-500 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-4 h-4"></div>
    </div>
  );
};
const Animation3 = () => {
  return (
    <div className="group duration-500 hover:duration-500">
      <div className="group-hover:-top-3 bg-transparent -top-12 -left-12 absolute shadow-yellow-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-24 h-24"></div>
      <div className="group-hover:top-60 bg-transparent top-44 left-14 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-24 h-24"></div>
      <div className="group-hover:-left-12 bg-transparent top-24 left-56 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-24 h-24"></div>
      <div className="group-hover:-top-44 bg-transparent top-12 left-12 absolute shadow-red-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-12 h-12"></div>
      <div className="group-hover:left-44 bg-transparent top-12 left-12 absolute shadow-green-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-44 h-44"></div>
      <div className="group-hover:-left-2 bg-transparent -top-24 -left-12 absolute shadow-sky-800 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-64 h-64"></div>
      <div className="group-hover:top-44 bg-transparent top-24 left-12 absolute shadow-sky-500 shadow-inner rounded-xl transition-all ease-in-out group-hover:duration-500 duration-500 w-4 h-4"></div>
    </div>
  );
};

export { Animation, Animation2, Animation3 };
