import Image from "next/image";

const PropertyHeaderImage = ({ image }) => {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt="Property image"
            className="object-cover h-100 w-full"
            width={0}
            height={0}
            sizes="100"
            
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
