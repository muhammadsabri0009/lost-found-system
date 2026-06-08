import { Link } from "react-router-dom"

function ItemCard({ item }) {
  return (
    <div className="bg-white rounded-3xl shadow-md overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      <div className="relative h-52 bg-slate-200 flex-shrink-0">
        {item.imageUrl ? (
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}

        <div className="absolute top-4 left-4 flex gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
              item.type === "lost"
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {item.type === "lost" ? "Lost" : "Found"}
          </span>

          <span
            className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
              item.status === "active"
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {item.status === "active" ? "Active" : "Resolved"}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-sm font-semibold text-blue-700">
          {item.category}
        </p>

        <h2 className="text-xl font-bold text-gray-800 mt-2 line-clamp-1 min-h-[28px]">
          {item.title}
        </h2>

        <p className="text-gray-600 mt-3 line-clamp-2 text-sm leading-relaxed min-h-[44px]">
          {item.description}
        </p>

        <div className="mt-5 grid grid-cols-1 gap-2 text-sm">
          <div className="bg-slate-50 p-3 rounded-xl min-h-[64px]">
            <p className="text-gray-500">Location</p>
            <p className="font-semibold text-gray-700 line-clamp-1">
              {item.location}
            </p>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl min-h-[64px]">
            <p className="text-gray-500">Date</p>
            <p className="font-semibold text-gray-700">{item.date}</p>
          </div>
        </div>

        <Link
          to={`/items/${item.id}`}
          className="block text-center mt-auto bg-blue-700 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  )
}

export default ItemCard