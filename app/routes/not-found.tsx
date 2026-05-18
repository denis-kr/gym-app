import { useRouteError, isRouteErrorResponse } from "react-router";

export default function NotFound() {
  const error = useRouteError();

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      {isRouteErrorResponse(error) ? (
        <>
          <h1>{error.status}</h1>
          <p>{error.statusText || "Page not found"}</p>
          {error.data?.message && <p>{error.data.message}</p>}
        </>
      ) : (
        <>
          <h1>404</h1>
          <p>Page not found</p>
        </>
      )}
    </div>
  );
}
