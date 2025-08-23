import { useAppHook } from "../../../../shared/hooks/useAppHook";
import {
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} from "../../apiSlices/wishlistApiSlice";
import toastPromise from "../../../../utils/toast";
import {
  addToWishlistSlice,
  removeFromWishlistSlice,
} from "../../slices/wishlistSlice";
import Loader from "../../../../shared/components/Loader";
import { HeartIcon as HeartOutlinedIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartFilledIcon } from "@heroicons/react/16/solid";
import { Button } from "../../../../shared/components/form/Button";
import { useRequiresAuth } from "../../../../shared/hooks/useRequiresAuth";
import { Course } from "../../../../shared/types/types";

export const FavButton = ({
  course,
  className = "",
}: {
  course: Course;
  className?: string;
}) => {
  const requiresAuth = useRequiresAuth();
  const { wishlistCourses, dispatch } = useAppHook();

  const isWishlisted = wishlistCourses.some((c) => c.id === course.id);

  const [addToWishlist, { isLoading: isAdding }] = useAddToWishlistMutation();
  const [removeFromWishlist, { isLoading: isRemoving }] =
    useRemoveFromWishlistMutation();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const promise = isWishlisted
      ? removeFromWishlist(course.id)
      : addToWishlist(course.id);

    toastPromise(promise, {
      loadingMessage: isWishlisted
        ? "Removing from favorites..."
        : "Adding to favorites...",
      successMessage: isWishlisted
        ? "Removed from favorites."
        : "Added to favorites!",
      errorMessage: isWishlisted
        ? "Failed removing from favorites"
        : "Failed adding to favorites",
      onSuccess: () => {
        if (isWishlisted) {
          dispatch(removeFromWishlistSlice(course));
        } else {
          dispatch(addToWishlistSlice(course));
        }
      },
    });
  };

  const loading = isAdding || isRemoving;

  return (
    <div title={isWishlisted ? "Remove from favorites" : "Add to favorites"}>
      <Button
        onClick={(e) => requiresAuth(() => handleClick(e))}
        className={`relative m-0! p-2! rounded-full! ${className}`}
        variant="primaryInverted"
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        aria-pressed={isWishlisted}
        disabled={loading}
        tabIndex={0}
        type="button"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Loader />
          </span>
        ) : isWishlisted ? (
          <HeartFilledIcon className="w-6 h-6 transition-transform duration-200" />
        ) : (
          <HeartOutlinedIcon className="w-6 h-6 transition-transform duration-200" />
        )}
      </Button>
    </div>
  );
};
