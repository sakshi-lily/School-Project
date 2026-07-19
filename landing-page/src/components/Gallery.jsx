import React, { useState } from 'react';
import { Eye, X, Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('सभी');
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = [
    'सभी',
    'परिसर व भवन',
    'खेलकूद',
    'वार्षिक उत्सव',
    'गणतंत्र दिवस',
    'स्वतंत्रता दिवस',
    'विज्ञान प्रदर्शनी',
    'सांस्कृतिक कार्यक्रम'
  ];

  const galleryItems = [
    {
      id: 1,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVIcmizT-3O6y4SLXo71oXk1Her_lu-TwNLYbyzTxE94iuiXPI4wlP8WY&s=10",
      title: "विद्यालय मुख्य परिसर",
      category: "परिसर व भवन",
      span: "md:col-span-2 md:row-span-2"
    },
    {
      id: 2,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX7cdmRt9S8POGawmp-kSdiPs2O3G-TRks1pvQJxMSWw&s=10",
      title: "गणतंत्र दिवस ध्वजारोहण समारोह",
      category: "गणतंत्र दिवस",
      span: "md:col-span-1"
    },
    {
      id: 3,
      image: "https://scontent.fdel65-3.fna.fbcdn.net/v/t39.30808-6/480493505_1045466114054978_3664448866943322620_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x922&ctp=s2048x922&_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=gLMm62dcrI0Q7kNvwETiVTZ&_nc_oc=AdpENH3kcVxlvd1CcOFGk6q-eDIy5dplhihjbwH0U41xfrd1Jv0N3ZS2WTLyX7c5sL67nvc4U3bZk5S653ZLYqmf&_nc_zt=23&_nc_ht=scontent.fdel65-3.fna&_nc_gid=bZxoZzIsYKNrQ-Q-YINTtw&_nc_ss=7b289&oh=00_AQBM_x3IXUvxPjIZlXsyGab4p5loUfZrPeQ0kTmdF3-ZZg&oe=6A51C0CF",
      title: "रसायन विज्ञान प्रयोगशाला",
      category: "विज्ञान प्रदर्शनी",
      span: "md:col-span-1"
    },
    {
      id: 4,
      image: "https://scontent.fdel65-1.fna.fbcdn.net/v/t39.30808-6/480770870_1048338667101056_5545854820068143091_n.jpg?stp=dst-jpg_tt6&cstp=mx1160x522&ctp=s1160x522&_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=OaT8dJ7GFdoQ7kNvwHa908i&_nc_oc=Adqfb2Gke9bxHW4okJKUsAlpffIgc-XA3d8lVq3Cl2YwfVtzYB1sWLOkU-r8BefhJQFBhnuBNt4jijeFExP8TcNB&_nc_zt=23&_nc_ht=scontent.fdel65-1.fna&_nc_gid=W1cU0vZzdudMps4aW4o8Dw&_nc_ss=7b289&oh=00_AQCfTW8wRZV9kHte7eFna-VqY03mAxzsgIlESbbx3wTyqg&oe=6A51B06D",
      title: "स्मार्ट क्लासरूम व्याख्यान",
      category: "परिसर व भवन",
      span: "md:col-span-1"
    },
    {
      id: 5,
      image: "https://scontent.fdel65-3.fna.fbcdn.net/v/t39.30808-6/470836248_1005553691379554_6935519924730069896_n.jpg?stp=dst-jpg_tt6&cstp=mx960x543&ctp=s960x543&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_ohc=PB4Z6r-tsBgQ7kNvwGHu2Go&_nc_oc=AdryapbGrymktjylARq3NlZ6RLxkkS9shuaajvzcBhZ8JW9ChcfUr9L8jbqwymknZQ5VX_UHVKCDUovZu17Q2Sqm&_nc_zt=23&_nc_ht=scontent.fdel65-3.fna&_nc_gid=pC-i89cA0BpwDC8679uNLQ&_nc_ss=7b289&oh=00_AQDyH4YUUYqD4ywL3Qf29ZGJBPJBbzfF8HwWsUufOHcLtA&oe=6A519317",
      title: "वार्षिक खेलकूद प्रतियोगिता",
      category: "खेलकूद",
      span: "md:col-span-2"
    },
    {
      id: 6,
      image: "https://scontent.fdel65-3.fna.fbcdn.net/v/t39.30808-6/470881165_1004183291516594_299517183996126784_n.jpg?stp=dst-jpg_tt6&cstp=mx1422x640&ctp=s1422x640&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ieivMR75UyoQ7kNvwHEqllq&_nc_oc=AdooyzpDBPBsC2m9UbRm-LseVzjuuCqijD00Z7Oew4NuVZpToLi23Hrlq2iDsMlH9klAqGqoPyG_qLyrQFVWEz2X&_nc_zt=23&_nc_ht=scontent.fdel65-3.fna&_nc_gid=p3pCv0PQ2BNbPKjcmbaIrQ&_nc_ss=7b289&oh=00_AQAIqqNvrzlZMJU6IfylIsl9glpbElMYTm_iMAKWvIPiEg&oe=6A51B496",
      title: "स्वतंत्रता दिवस परेड मार्च",
      category: "स्वतंत्रता दिवस",
      span: "md:col-span-1"
    },
    {
      id: 7,
      image: "https://scontent.fdel65-4.fna.fbcdn.net/v/t39.30808-6/472573045_1015577210377202_6465107675459385330_n.jpg?stp=dst-jpg_tt6&cstp=mx2048x922&ctp=s2048x922&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_ohc=wkVkw7fXQdUQ7kNvwGwN7y3&_nc_oc=AdobsNzmCdSsqm0FdW2uAbrcPoexiuqb9RqNZp5GTOjtQzisWvLOofKktkCzV3bm7HV0I1q4fPUpvCX9F2DbX3qU&_nc_zt=23&_nc_ht=scontent.fdel65-4.fna&_nc_gid=hUNThcpex7oYe00stPFy4g&_nc_ss=7b289&oh=00_AQAbSkIxwS_8KXtVALRsrKHVVfs3zOMUaa7tlvP0zZfVJg&oe=6A519569",
      title: "सरस्वती वंदना व सांस्कृतिक नृत्य",
      category: "वार्षिक उत्सव",
      span: "md:col-span-1"
    },
    {
      id: 8,
      image: "https://scontent.fdel65-2.fna.fbcdn.net/v/t39.30808-6/481450775_1049342617000661_3116204305083626026_n.jpg?stp=dst-jpg_tt6&cstp=mx1600x1298&ctp=s1600x1298&_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_aid=0&_nc_ohc=M_x6dzB9ssYQ7kNvwElGJYT&_nc_oc=AdrJXNGuMs5-EQ509YknHoHZkI-9YdHbbXcZ3-3oMoVVR1QjHK-RJDctYW2JDzkJYZP18ehPJhqqSZhsDvDJvKtv&_nc_zt=23&_nc_ht=scontent.fdel65-2.fna&_nc_gid=OhOsPjQCpwjufUWHTkN5Nw&_nc_ss=7b289&oh=00_AQDYkDtpvJWLsnm2N-6usTXziLkg1GtMNHN_750h15y-6w&oe=6A519415",
      title: "विज्ञान प्रदर्शनी (भौतिक विज्ञान मॉडल)",
      category: "विज्ञान प्रदर्शनी",
      span: "md:col-span-1"
    },
    {
      id: 9,
      image: "https://scontent.fdel65-3.fna.fbcdn.net/v/t39.30808-6/472698979_1016013100333613_7508981147472520434_n.jpg?stp=dst-jpg_tt6&cstp=mx1280x720&ctp=s1280x720&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_ohc=bjXFvl1JawUQ7kNvwFa7IL0&_nc_oc=Adqj_6-JUEOjBFWnLsGk4mF_EF3cf4j5ZxCRAfnKX_VR3rWC3YTJk_graDjf4VCifkVTA8Xw-kG13eQQ2d7uXrYN&_nc_zt=23&_nc_ht=scontent.fdel65-3.fna&_nc_gid=vzH_Ox6SvIKiMYazFUfpLA&_nc_ss=7b289&oh=00_AQDyPqEEJTDpZbtW_i3FW7LUd-8J92GkYF0fZenj04AurQ&oe=6A51BFC6",
      title: "समूह गान प्रस्तुति - सांस्कृतिक समारोह",
      category: "सांस्कृतिक कार्यक्रम",
      span: "md:col-span-1"
    }
  ];

  const filteredItems = activeCategory === 'सभी'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs md:text-sm font-heading font-extrabold text-primary tracking-widest uppercase bg-blue-50 px-3 py-1.5 rounded-full">
            गैलरी चित्र
          </span>
          <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-slate-900 mt-4 leading-tight">
            विद्यालय परिसर एवं आयोजनों की झलकियां
          </h2>
          <p className="text-slate-500 text-sm md:text-base mt-3">
            ठाकुर बीरी सिंह इण्टर कॉलेज के उत्सवों, खेलकूद प्रतियोगिताओं, प्रयोगशालाओं तथा शैक्षणिक जीवन के स्वर्णिम पलों को देखें।
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-heading font-bold transition-all ${activeCategory === cat
                ? 'bg-primary text-white shadow-md shadow-primary/10'
                : 'bg-white border border-slate-100 hover:border-slate-200 text-slate-500 hover:text-slate-800 shadow-sm'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry-like Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[160px] md:auto-rows-[180px]">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setLightboxImage(item)}
              className={`${item.span || 'md:col-span-1'} group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-premium-hover border border-slate-100/50 bg-slate-100 cursor-zoom-in transition-all duration-500`}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Blur Overlay & Details */}
              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 md:p-6 z-10">
                <span className="text-[10px] uppercase font-bold text-secondary tracking-wider">
                  {item.category}
                </span>
                <h3 className="text-white font-heading font-extrabold text-sm md:text-base leading-snug mt-1 flex items-center justify-between gap-2">
                  <span>{item.title}</span>
                  <span className="p-1.5 bg-white/20 rounded-lg text-white backdrop-blur-sm shrink-0">
                    <Eye size={16} />
                  </span>
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state when no items in category */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center">
            <ImageIcon size={48} className="text-slate-300 mb-3" />
            <h3 className="font-heading font-bold text-slate-600 text-lg">कोई चित्र उपलब्ध नहीं हैं</h3>
            <p className="text-slate-400 text-sm mt-1">हम वर्तमान में इस श्रेणी के लिए चित्र संकलित कर रहे हैं। कृपया शीघ्र पुनः देखें!</p>
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-colors z-50 border border-white/10"
            aria-label="Close Lightbox"
          >
            <X size={24} />
          </button>

          <div className="max-w-4xl w-full flex flex-col items-center animate-in zoom-in-95 duration-200">
            <div className="relative max-h-[75vh] overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl">
              <img
                src={lightboxImage.image}
                alt={lightboxImage.title}
                className="max-h-[70vh] object-contain mx-auto"
              />
            </div>

            <div className="text-center text-white mt-4 max-w-xl">
              <span className="text-xs font-semibold text-secondary uppercase tracking-widest">
                {lightboxImage.category}
              </span>
              <h3 className="font-heading font-bold text-lg md:text-xl mt-1 leading-snug">
                {lightboxImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
