import React from 'react';
import { Database, ShieldAlert, Award, Calendar, BarChart3, Fingerprint } from 'lucide-react';

const Features = () => {
  const cards = [
    {
      icon: <Database size={24} />,
      title: 'एमईआरएन स्टैक एपीआई',
      description: 'मोंगोडीबी एटलस डेटाबेस से जुड़ा एक्सप्रेस एपीआई रूटर, जो तीव्र डेटा लुकअप एवं सुरक्षित संरचना सुनिश्चित करता है।'
    },
    {
      icon: <ShieldAlert size={24} />,
      title: 'प्राचार्य नियंत्रण केंद्र',
      description: 'पंजीकरण स्वीकृति, शिक्षक आवंटन, ऑडिट निगरानी एवं उच्च स्तरीय कक्षा प्रबंधन हेतु सशक्त डैशबोर्ड।'
    },
    {
      icon: <Award size={24} />,
      title: 'शिक्षक अंकपुस्तिका',
      description: 'शिक्षकों को छात्र मूल्यांकन दर्ज करने, टिप्पणी लिखने और व्याख्यान समय-सारणी प्रबंधित करने की सुविधा।'
    },
    {
      icon: <Calendar size={24} />,
      title: 'समय सारणी तुल्यकालन',
      description: 'विभिन्न डैशबोर्ड्स के बीच कक्षा समय, अवकाश एवं व्याख्यान शेड्यूल का स्वतः रीयल-टाइम अपडेट।'
    },
    {
      icon: <BarChart3 size={24} />,
      title: 'डेटा एवं विश्लेषण',
      description: 'नामांकन दर, औसत परिणाम, शिक्षक अनुभव एवं छात्र प्रदर्शन मैट्रिक्स का दृश्य विश्लेषण।'
    },
    {
      icon: <Fingerprint size={24} />,
      title: 'भूमिका-आधारित प्रमाणीकरण',
      description: 'जेएसओएन वेब टोकन (JWT) और एन्क्रिप्टेड सुरक्षा द्वारा कड़े पहुंच नियंत्रण का पालन।'
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="section-header">
        <h2>शैक्षणिक उत्कृष्टता हेतु निर्मित प्रणाली</h2>
        <p>प्राचार्य प्रबंधन, शिक्षण एवं डेटा विश्लेषण के लिए बहु-पोर्टल समाधान।</p>
      </div>

      <div className="features-grid">
        {cards.map((card, idx) => (
          <div key={idx} className="feature-card">
            <div className="feature-icon">
              {card.icon}
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
