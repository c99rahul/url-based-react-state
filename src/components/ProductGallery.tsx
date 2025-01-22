interface ProductGalleryProps {
  thumbnail: string;
  images: string[];
  title: string;
}

export default function ProductGallery({ thumbnail, images, title }: ProductGalleryProps) {
  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${title} - Image ${index + 1}`}
            className="aspect-square rounded border border-gray-200 object-cover"
          />
        ))}
      </div>
    </div>
  );
}
