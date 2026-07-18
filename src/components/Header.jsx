import React from 'react'
import Slider from 'react-slick'
import img1 from '/public/assets/images/slider-image-1.jpeg'
import img2 from '/public/assets/images/slider-image-2.jpeg'
import img3 from '/public/assets/images/slider-image-3.jpeg'
import blog1 from '/public/assets/images/blog-img-1.jpeg'
import blog2 from '/public/assets/images/blog-img-2.jpeg'

export default function Header() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    dotsClass: 'slick-dots !bottom-4',
  }

  return (
    <header className="mb-6 sm:mb-8">
      <div className="container px-4 sm:px-6">
        {/* Mobile: stacked layout */}
        <div className="md:hidden rounded-2xl overflow-hidden space-y-3">
          <Slider {...settings}>
            {[img1, img2, img3].map((img, i) => (
              <div key={i}>
                <img src={img} className="h-[200px] w-full object-cover" alt={`Slide ${i + 1}`} />
              </div>
            ))}
          </Slider>
          <div className="flex gap-3">
            <img src={blog1} className="h-28 w-1/2 object-cover rounded-xl" alt="Featured 1" />
            <img src={blog2} className="h-28 w-1/2 object-cover rounded-xl" alt="Featured 2" />
          </div>
        </div>

        {/* Desktop: side-by-side layout */}
        <div className="hidden md:flex gap-4 rounded-2xl overflow-hidden">
          <div className="w-2/3">
            <Slider {...settings}>
              {[img1, img2, img3].map((img, i) => (
                <div key={i}>
                  <img src={img} className="h-[250px] lg:h-[450px] w-full object-cover" alt={`Slide ${i + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-1/3 flex flex-col gap-4">
            <img src={blog1} className="h-[120px] lg:h-[218px] w-full object-cover rounded-xl" alt="Featured 1" />
            <img src={blog2} className="h-[120px] lg:h-[218px] w-full object-cover rounded-xl" alt="Featured 2" />
          </div>
        </div>
      </div>
    </header>
  )
}
