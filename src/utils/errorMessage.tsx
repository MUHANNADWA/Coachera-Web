import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Message from "../shared/components/Message";

export function showErrorMessage(
  error: FetchBaseQueryError | SerializedError | unknown
) {
  return (
    <Message variant="danger">
      {(error as any)?.data?.message ??
        (error as any)?.message ??
        `An unexpected
      error occurred`}
    </Message>
  );
}
