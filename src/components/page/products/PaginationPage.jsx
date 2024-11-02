/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useDispatch } from "react-redux";
import { getProducts } from "../../../redux/middlewares/addProduct";
export default function PaginationPage({ page }) {
  const dispatch = useDispatch();
  const handleSetPage = (_, value) => {
    dispatch(getProducts("", value));
  };
  return (
    <div>
      <Stack spacing={2}>
        <Pagination
          count={page}
          defaultPage={1}
          siblingCount={0}
          boundaryCount={2}
          onChange={handleSetPage}
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
