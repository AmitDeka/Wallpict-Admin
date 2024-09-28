import CategoryCard from "@/components/categoryCard";
import Header from "@/components/header";
import { ArrowRightIcon } from "@radix-ui/react-icons";

function Category() {
  return (
    <>
      <Header />
      <section className="lg:p-8 md:p-6 p-4">
        <div className="my-4">
          <h1 className="inline-flex items-center mb-3 text-xl font-bold">
            All Categories
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </h1>

          <div className="md:grid-cols-3 lg:grid-cols-4 md:gap-8 grid grid-cols-2 gap-4">
            <CategoryCard
              categoryName="iPhone Wallpaper"
              categoryBgUri="/images/Oreti.svg"
            />
            <CategoryCard
              categoryName="Samsung Wallpaper"
              categoryBgUri="/images/Oreti.svg"
            />
            <CategoryCard
              categoryName="Google Pixel Wallpaper"
              categoryBgUri="/images/Oreti.svg"
            />
            <CategoryCard
              categoryName="Google Pixel Wallpaper"
              categoryBgUri="/images/Oreti.svg"
            />
            <CategoryCard
              categoryName="Oneplus Wallpaper"
              categoryBgUri="/images/Oreti.svg"
            />
            <CategoryCard
              categoryName="Oppo Wallpaper"
              categoryBgUri="/images/Oreti.svg"
            />
            <CategoryCard
              categoryName="Vivo Wallpaper"
              categoryBgUri="/images/Oreti.svg"
            />
            <CategoryCard />
          </div>
        </div>
      </section>
    </>
  );
}
export default Category;
