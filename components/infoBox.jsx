const InfoBox = ({
  children,
  heading,
  btninfo,
  backgroundColor = "bg-gray-100",
  textColor = "text-gray-800",
  btnColor = "bg-black hover:bg-gray-700",
}) => {
  return (
    <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
      <h2 className={`${textColor} text-2xl font-bold`}>{heading}</h2>
      <p className={`${textColor} mt-2 mb-4`}>{children}</p>
      <a
        href={btninfo.link}
        className={`inline-block ${btnColor} text-white rounded-lg px-4 py-2 `}
      >
        {btninfo.text}
      </a>
    </div>
  );
};

export default InfoBox;
