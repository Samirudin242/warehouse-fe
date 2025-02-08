import { FaCheckCircle } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";

import moment from "moment";

interface CommentProps {
  comment: string;
  rating: number;
  date: string;
  className?: string;
}

export default function CommentCard({
  comment,
  rating,
  date,
  className,
}: CommentProps) {
  return (
    <article className={`border rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex text-amber-400">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < rating ? "opacity-100" : "opacity-30"}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">
          {moment(date).format("ll")}
        </span>
      </div>

      <div className="flex items-start gap-2">
        <FaCheckCircle className="text-green-600 shrink-0 mt-1" />
        <p className="text-gray-700 leading-relaxed">"{comment}"</p>
      </div>
    </article>
  );
}
