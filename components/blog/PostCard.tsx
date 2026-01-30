import Link from "next/link"

export default function PostCard({
  title,
  description,
  image,
  href,
  date,
  badge = "Latest",
}) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between h-full">
        <div>
          <span className="text-sm text-blue-600 font-semibold">
            {badge}
          </span>

          <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
            {title}
          </h3>

          <p className="mt-2 text-gray-600 text-sm line-clamp-3">
            {description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>📅 {date}</span>

          <Link
            href={href}
            className="text-blue-600 font-medium hover:underline"
          >
            Read →
          </Link>
        </div>
      </div>
    </div>
  )
}
