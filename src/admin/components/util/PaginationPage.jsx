/* eslint-disable react/prop-types */
import { Pagination } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
export default function PaginationPage({ count, setPage }) {
  const params = useParams();
  const navigate = useNavigate();
  const handelPage = (_, value) => {
    setPage(value);
    navigate(`/admin/${params.url}/${value}`);
  };
  return (
    <div className="flex justify-center items-center p-9 ">
      <Pagination
        count={count}
        page={Number(params.id) || 1}
        color="primary"
        onChange={handelPage}
      />
    </div>
  );
}
