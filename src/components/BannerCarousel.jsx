// src/components/BannerCarousel.jsx
import Slider from "react-slick";
import banner1 from "../assets/img/banner1.png"
import banner2 from "../assets/img/banner2.png"
import banner3 from "../assets/img/banner3.png"

const banners = [
  banner1, banner2, banner3
];

export default function BannerCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <Slider {...settings}>
        {banners.map((src, idx) => (
          <div key={idx}>
            <img
              src={src}
              alt={`Banner ${idx + 1}`}
              className="w-full h-48 md:h-64 object-cover rounded-xl"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
