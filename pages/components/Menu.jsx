import Dropdown from "./Dropdown";
import ProductCard from "./ProductCard";

export default function Menu({ data }) {

  return (
    <>
      <TopMenu />
      <div className="px-6 mt-4 grid grid-cols-2 gap-4 pb-24">
        {!data ? (
          <div>Cargando... </div>
        ) : (
          data.map((food, index) => (
            <ProductCard key={index} delay={index} name={food.name} slug={food.slug} image={food.image} />
          ))
        )}
      </div>
    </>
  );
}

export const TopMenu = () => (
  <div className="px-6 py-2 text-customDark flex items-center justify-between">
    <p className="text-sm font-semibold">Category</p>
    <Dropdown />
  </div>
);
