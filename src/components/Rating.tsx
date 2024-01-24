import { Star } from "lucide-react";

export default function Rating(props: { count: number }) {
  const fill = Math.max(Math.min(props.count, 5), 0);
  const empty = 5 - fill;
  return (
    <div className="flex items-start gap-1">
      {Array.from("x".repeat(fill)).map((n, i) => {
        return (
          <Star
            key={i}
            fill="true"
            className="h-4 w-4 fill-yellow-500 text-yellow-500"
          />
        );
      })}
      {Array.from("x".repeat(empty)).map((n, i) => {
        return (
          <Star
            key={i}
            fill="true"
            className="h-4 w-4 fill-gray-400 text-gray-400"
          />
        );
      })}
    </div>
  );
}
