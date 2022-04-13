import SearchBar from "./components/SearchBar";

const categories = [
  {
    name: "Hamburgers",
    image: "assets/food-drink/svg/hamburger-30703.svg",
  },
  {
    name: "Fried",
    image: "assets/food-drink/svg/fried-30660.svg",
  },
  {
    name: "Meat",
    image: "assets/food-drink/svg/meat-30667.svg",
  },
  {
    name: "Food",
    image: "assets/food-drink/svg/hamburger-30703.svg",
  },
  {
    name: "Rice",
    image: "assets/food-drink/svg/rice-30697.svg",
  },
  {
    name: "Wines",
    image: "assets/food-drink/svg/wine-30692.svg",
  },
  {
    name: "Roasted",
    image: "assets/food-drink/svg/roasted-30678.svg",
  },
  {
    name: "Breads",
    image: "assets/food-drink/svg/bread-30654.svg",
  },
  {
    name: "Fruits",
    image: "assets/food-drink/svg/banana-30652.svg",
  },
];

export default function Home() {
  return (
    <div className="text-customDark">
      <div className="pl-6 py-6 w-full flex items-center space-x-5 overflow-x-scroll scrollbar-none">
        {categories.map((categorie, index) => (
          <CategorieCard key={index} {...categorie} />
        ))}
      </div>
    </div>
  );
}

export const CategorieCard = ({ name, image }) => (

  <div className="flex justify-center items-center py-2 px-4 rounded-xl text-xs font-medium bg-secondary text-customDark" >
    <img src={image} alt={name} className="w-4 h-4 mr-2" />
    {name}
  </div>

)
