/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { getDetailProduct } from "../../../service/detailProduct";
import { useParams } from "react-router";

export default function PaginationReviewDetail({ page, pram }) {
  const params = useParams();
  const handlChangerPage = (_, value) => {
    getDetailProduct(params.id, 2);
    console.log(value);
  };
  return (
    <div>
      <Stack spacing={2}>
        <Pagination
          count={page}
          defaultPage={1}
          siblingCount={0}
          boundaryCount={2}
          onChange={handlChangerPage}
          size="small"
          sx={{
            "& .MuiPaginationItem-root": {
              fontSize: { xs: "0.75rem", sm: "1rem" },
            },
          }}
        />
      </Stack>
    </div>
  );
}
