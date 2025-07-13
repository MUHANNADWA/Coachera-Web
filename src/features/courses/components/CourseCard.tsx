import { Course } from "../../../shared/types/types";
import { placeholderImage, renderStars } from "../utils/Utils";
import { Button } from "../../../shared/components/Button";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useAppHook } from "../../../shared/hooks/useAppHook";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../wishlistApiSlice";
import toastPromise from "../../../utils/toast";

interface CourseCardProps {
  course: Course;
  isFav: boolean;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { navigate } = useAppHook();

  return (
    <div className="card">
      <img
        onClick={() => navigate(`/courses/${course.id}`)}
        src={course.image ?? placeholderImage(course.title)}
        alt={course.title}
        className="h-40 w-full object-cover rounded-t-2xl"
      />
      <div className="p-4" onClick={() => navigate(`/courses/${course.id}`)}>
        <h3 className="font-semibold text-lg text-primary-dark">
          {course.title}
        </h3>
        <p className="flex text-sm text-gray-500 mt-1 gap-1">
          {course.instructor ?? "Abo Mahmoud Org"}
        </p>

        <div className="text-primary font-bold text-lg mt-2">
          ${course.price ?? 0}
        </div>

        <div className="flex items-center justify-between mt-2 text-sm">
          <div className="flex gap-2 items-center text-primary-dark font-semibold">
            {course.rating?.toFixed(1) ?? "0.0"}
            <span className="flex gap-0.5">
              {renderStars(course.rating ?? 0)}
            </span>
            <span className="text-gray-500">({course.ratingCount ?? 0})</span>
          </div>
        </div>
      </div>
      <div>
        <span
          onClick={() => navigate(`/search/${course.categories?.[0]}`)}
          className="text-sm absolute top-2 right-2 text-primary bg-primary-light border-primary border-1 p-2 rounded-2xl">
          {course.categories?.[0]}
        </span>
        <FavButton id={course.id} />
      </div>
    </div>
  );
}

export const FavButton = ({ id }: { id: number }) => {
  const { wishlistIds, setWishlistIds } = useAppHook();

  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const isFav = wishlistIds?.includes(id);

  const toggleFav = async () => {
    if (isFav) {
      await toastPromise(removeFromWishlist(id).unwrap(), {
        loadingMessage: "Removing from wishlist...",
        successMessage: "Removed!",
        errorMessage: "Failed to remove.",
        onSuccess: () => {
          setWishlistIds(wishlistIds?.filter((cid) => cid !== id) || []);
        },
      });
    } else {
      await toastPromise(addToWishlist(id).unwrap(), {
        loadingMessage: "Adding to wishlist...",
        successMessage: "Added!",
        errorMessage: "Failed to add.",
        onSuccess: () => {
          setWishlistIds([...(wishlistIds || []), id]);
        },
      });
    }
  };

  return (
    <Button
      type="button"
      onClick={toggleFav}
      className="inline absolute bottom-4 right-4 text-primary hover:text-emerald-600">
      {!isFav ? (
        <IconHeart size={36} className="bg-primary-light p-2 rounded-2xl" />
      ) : (
        <IconHeartFilled
          size={36}
          className="bg-primary-light p-2 rounded-2xl"
        />
      )}
    </Button>
  );
};
