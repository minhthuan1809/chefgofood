import Nav from "../header/Nav";
import PageFooter from "../footer/PageFooter";
import { useSelector } from "react-redux";
import { renderFavorite } from "../../service/favorite_api";
import { useEffect } from "react";

export default function Favorite() {
  const profile = useSelector((state) => state.profile.profile);
  const fetchData = async () => {
    const data = await renderFavorite(profile.id);
    console.log(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <header>
        <Nav />
      </header>
      <PageFooter />
    </div>
  );
}
