import { Pagination } from "@mui/material";

export default function PaginationPage({ count, setPage }) {
  return (
    <div className="flex justify-center items-center p-9 ">
      <Pagination
        count={count}
        color="primary"
        onChange={(_, value) => setPage(value)}
      />
    </div>
  );
}
