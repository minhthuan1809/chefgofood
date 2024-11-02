// /* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getDetailProduct } from "../../../redux/middlewares/detailProduct";

export default function PaginationReviewDetail({ page }) {
  const params = useParams();
  const dispatch = useDispatch();
  const handlChangerPage = (_, value) => {
    dispatch(getDetailProduct(params.id, value));
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
