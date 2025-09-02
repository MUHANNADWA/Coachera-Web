// features/search/pages/SearchPage.tsx
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersSidebar from "../../courses/components/FiltersSidebar";
import CourseCardSkeleton from "../../skeletons/CourseCardSkeleton";
import Message from "../../../shared/components/Message";
import Pagination from "../../courses/components/Pagination";
import { useSearchQuery } from "../api/searchApiSlice";
import { showErrorMessage } from "../../../shared/utils/errorMessage";
import { renderSearchResults } from "../utills/renderSearchResults";

type SortDir = "asc" | "desc";
type EntityType = "courses" | "instructors" | "categories" | string;

const parseIntOr = (val: string | null, fallback: number) => {
  const n = Number.parseInt(String(val ?? ""), 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
};
const parseSortDir = (val: string | null, fallback: SortDir): SortDir =>
  val === "asc" || val === "desc" ? val : fallback;
const parseEntityType = (
  val: string | null,
  fallback: EntityType
): EntityType =>
  val && val.trim().length > 0 ? (val as EntityType) : fallback;

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // initial snapshot once
  const initialState = useMemo(() => {
    const query = searchParams.get("q") || "";
    const pg = parseIntOr(searchParams.get("pg"), 0);
    const sz = parseIntOr(searchParams.get("sz"), 9);
    const srt = (searchParams.get("srt") || "createdAt").trim();
    const dir = parseSortDir(searchParams.get("dir"), "desc");
    const type = parseEntityType(searchParams.get("type"), "courses");
    return { pg, sz, srt, dir, type, query };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // don't depend on searchParams here

  // state
  const [page, setPage] = useState<number>(initialState.pg);
  const [size, setSize] = useState<number>(initialState.sz);
  const [sortBy, setSortBy] = useState<string>(initialState.srt);
  const [entityType, setEntityType] = useState<EntityType>(initialState.type);
  const [sortDirection, setSortDirection] = useState<SortDir>(initialState.dir);
  const [searchTerm, setSearchTerm] = useState<string>(initialState.query);

  // keep URL in sync (including q)
  useEffect(() => {
    const next = new URLSearchParams(searchParams);
    next.set("pg", String(page));
    next.set("sz", String(size));
    next.set("srt", sortBy);
    next.set("dir", sortDirection);
    next.set("type", String(entityType));
    next.set("q", searchTerm);
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, size, sortBy, sortDirection, entityType, searchTerm]);

  // when URL q changes (e.g., user used SearchBar elsewhere), update state
  useEffect(() => {
    const qInUrl = searchParams.get("q") || "";
    if (qInUrl !== searchTerm) {
      setSearchTerm(qInUrl);
      setPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get("q")]); // only react to q changes

  // reset pagination when entityType changes from sidebar
  useEffect(() => {
    setPage(0);
  }, [entityType]);

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
            Search Results for "{" "}
            <p className="inline text-primary">{searchTerm || "…"}</p> "
          </h2>

          <div className="flex gap-8">
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  Array.from({ length: size }).map((_, i) => (
                    <CourseCardSkeleton key={i} />
                  ))
                ) : error ? (
                  showErrorMessage(error)
                ) : results.length === 0 ? (
                  <Message variant="info">
                    No {entityType} found matching your search.
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
