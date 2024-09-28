export const metadata = {
  title: "Dashboard",
};

import CategoryCard from "@/components/categoryCard";
import Header from "@/components/header";
import HeroCards from "@/components/heroCards";
import WallpaperCard from "@/components/wallpaperCard";
import { ArrowRightIcon } from "@radix-ui/react-icons";

function Dashboard() {
  return (
    <>
      <Header />
      <section className="lg:p-8 md:p-6 p-4">
        <HeroCards />
        <div className="mt-4 mb-2">
          <h1 className="inline-flex items-center mb-3 text-xl font-bold">
            Recently added Categories
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
        <div className="mt-4 mb-4">
          <h1 className="inline-flex items-center mb-3 text-xl font-bold">
            Recently added Wallpapers
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </h1>
          <div className="md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 md:gap-8 grid grid-cols-2 gap-4">
            <WallpaperCard
              wallpaperName="iPhone Wallpaper"
              wallpaperUri="/images/Whangaehu.svg"
            />
            <WallpaperCard
              wallpaperName="Samsung Wallpaper"
              wallpaperUri="/images/Whangaehu.svg"
            />
            <WallpaperCard
              wallpaperName="Google Pixel Wallpaper"
              wallpaperUri="/images/Whangaehu.svg"
            />
            <WallpaperCard
              wallpaperName="Oneplus Wallpaper"
              wallpaperUri="/images/Whangaehu.svg"
            />
            <WallpaperCard
              wallpaperName="Nothing Wallpaper"
              wallpaperUri="/images/Whangaehu.svg"
            />
            <WallpaperCard
              wallpaperName="Oppo Wallpaper"
              wallpaperUri="/images/Whangaehu.svg"
            />
            <WallpaperCard
              wallpaperName="Vivo Wallpaper"
              wallpaperUri="/images/Whangaehu.svg"
            />
            <WallpaperCard
              wallpaperName="Vivo Wallpaper"
              wallpaperUri="/images/Whangaehu.svg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
export default Dashboard;
