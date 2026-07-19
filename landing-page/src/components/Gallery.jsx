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
      image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop",
      title: "विद्यालय मुख्य परिसर",
      category: "परिसर व भवन",
      span: "md:col-span-2 md:row-span-2"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=1200&auto=format&fit=crop",
      title: "गणतंत्र दिवस ध्वजारोहण समारोह",
      category: "गणतंत्र दिवस",
      span: "md:col-span-1"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1200&auto=format&fit=crop",
      title: "रसायन विज्ञान प्रयोगशाला",
      category: "विज्ञान प्रदर्शनी",
      span: "md:col-span-1"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
      title: "स्मार्ट क्लासरूम व्याख्यान",
      category: "परिसर व भवन",
      span: "md:col-span-1"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=1200&auto=format&fit=crop",
      title: "वार्षिक खेलकूद प्रतियोगिता",
      category: "खेलकूद",
      span: "md:col-span-2"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop",
      title: "स्वतंत्रता दिवस परेड मार्च",
      category: "स्वतंत्रता दिवस",
      span: "md:col-span-1"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop",
      title: "सरस्वती वंदना व सांस्कृतिक नृत्य",
      category: "वार्षिक उत्सव",
      span: "md:col-span-1"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop",
      title: "विज्ञान प्रदर्शनी (भौतिक विज्ञान मॉडल)",
      category: "विज्ञान प्रदर्शनी",
      span: "md:col-span-1"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
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
