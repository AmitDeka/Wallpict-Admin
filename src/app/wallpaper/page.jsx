import Header from "@/components/header";
import WallpaperCard from "@/components/wallpaperCard";
import { ArrowRightIcon } from "@radix-ui/react-icons";

function Wallpaper() {
  return (
    <>
      <Header />
      <section className="lg:p-8 md:p-6 p-4">
        <div className="my-4">
          <h1 className="inline-flex items-center mb-3 text-xl font-bold">
            All Wallpapers
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
export default Wallpaper;
