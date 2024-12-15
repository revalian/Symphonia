export default function CardItem({ image, title, description }) {
    return (
        <div className="overflow-hidden rounded-lg border shadow-lg">
            <img src={image} alt={title} className="h-40 w-full object-cover" />
            <div className="p-4">
                <h2 className="mb-2 text-lg font-semibold">{title}</h2>
                <p className="mb-4 text-gray-600">{description}</p>
                <button className="rounded bg-orange-500 px-4 py-2 text-white hover:bg-orange-600">
                    Sewa Sekarang
                </button>
            </div>
        </div>
    );
}
