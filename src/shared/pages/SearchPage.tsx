import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSearchQuery } from "../slices/searchApiSlice";
import FiltersSidebar from "../../features/courses/components/FiltersSidebar";
import CourseCardSkeleton from "../../features/skeletons/CourseCardSkeleton";
import Message from "../components/Message";
import Pagination from "../../features/courses/components/Pagination";
import { showErrorMessage } from "../../utils/errorMessage";
import { renderSearchResults } from "../../utils/renderSearchResults";

type SortDir = "asc" | "desc";
type EntityType = "courses" | "instructors" | "categories" | string; // extend as needed

// Safe parsers for query params
const parseIntOr = (val: string | null, fallback: number) => {
  const n = Number.parseInt(String(val ?? ""), 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
};

const parseSortDir = (val: string | null, fallback: SortDir): SortDir => {
  return val === "asc" || val === "desc" ? val : fallback;
};

const parseEntityType = (
  val: string | null,
  fallback: EntityType
): EntityType => {
  return val && val.trim().length > 0 ? (val as EntityType) : fallback;
};

export default function SearchPage() {
  // route param e.g. /search/:query
  const { query: searchTerm } = useParams();

  // correct use of useSearchParams()
  const [searchParams, setSearchParams] = useSearchParams();

  // derive initial state from query string once (lazy initializer)
  const initialState = useMemo(() => {
    const pg = parseIntOr(searchParams.get("pg"), 0);
    const sz = parseIntOr(searchParams.get("sz"), 9);
    const srt = (searchParams.get("srt") || "createdAt").trim();
    const dir = parseSortDir(searchParams.get("dir"), "desc");
    const type = parseEntityType(searchParams.get("type"), "courses");
    return { pg, sz, srt, dir, type };
  }, []); // run once on mount

  // component state
  const [page, setPage] = useState<number>(initialState.pg);
  const [size, setSize] = useState<number>(initialState.sz);
  const [sortBy, setSortBy] = useState<string>(initialState.srt);
  const [entityType, setEntityType] = useState<EntityType>(initialState.type);
  const [sortDirection, setSortDirection] = useState<SortDir>(initialState.dir);

  // keep URL in sync when controls change
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    next.set("pg", String(page));
    next.set("sz", String(size));
    next.set("srt", sortBy);
    next.set("dir", sortDirection);
    next.set("type", String(entityType));
    setSearchParams(next, { replace: true });
  }, [page, size, sortBy, sortDirection, entityType, setSearchParams]); // do not include searchParams to avoid loops

  // reset page when search term changes
  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  // data fetch
  const { data, isLoading, error } = useSearchQuery({
    data: {
      page,
      size,
      sortBy,
      sortDirection,
      searchTerm,
    },
    entityType,
  });

  const results = data?.data?.content ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  return (
    <div className="page flex">
      <FiltersSidebar
        setPage={setPage}
        size={size}
        setSize={setSize}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        entityType={entityType}
        setEntityType={setEntityType}
      />

      <main className="relative flex-1 py-8 ml-8 pr-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Search Results for "{searchTerm}"
          </h2>

          <div className="flex gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  // render skeletons based on current page size
                  Array.from({ length: size }).map((_, i) => (
                    <CourseCardSkeleton key={i} />
                  ))
                ) : error ? (
                  showErrorMessage(error)
                ) : results.length === 0 ? (
                  <Message variant="info">
                    No {entityType} found matching your search
                  </Message>
                ) : (
                  renderSearchResults(results, entityType)
                )}
              </div>

              <Pagination
                setPage={setPage}
                page={page}
                totalPages={totalPages}
                isLoading={isLoading}
                isError={!!error}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
