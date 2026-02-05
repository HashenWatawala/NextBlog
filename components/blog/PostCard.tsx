import Link from "next/link"

interface PostCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  date: string;
  readTime?: string;
}

export default function PostCard({
  title,
  description,
  image,
  href,
  date,
  readTime = "5 min read",
}: PostCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
      {/* Image */}
      <div className="p-3">
        <img
          src={image}
          alt={title}
          className="h-56 w-full object-cover rounded-xl"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 leading-tight">
          {title}
        </h3>

        <p className="mt-3 text-gray-600 text-sm line-clamp-2">
          {description}
        </p>

        <div className="mt-auto pt-6 flex items-center justify-between text-xs font-medium text-gray-500">
          <span>Published on {date}</span>
          <span>{readTime}</span>
        </div>
      </div>

      <Link href={href} className="absolute inset-0">
        <span className="sr-only">View post</span>
      </Link>
    </div>
  )
}
