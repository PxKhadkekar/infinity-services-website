// Import image assets from src/assets/Images
import cctvInstallation1 from '../assets/Images/cctv-installation-1.jpeg';
import cctvWorkingMobile from '../assets/Images/cctv-working-mobile.jpeg';
import cctvWorkingMonitor from '../assets/Images/cctv-working-monitor.jpeg';
import electricalWork1 from '../assets/Images/electrical-work-1.jpeg';
import electricalWork2 from '../assets/Images/electrical-work-2.jpeg';
import electricalWork3 from '../assets/Images/electrical-work-3.jpeg';
import laptopRefurbished from '../assets/Images/laptop-refurbished.jpeg';
import monitorRepair from '../assets/Images/monitor-repair.jpeg';
import peopleCounterInstallation from '../assets/Images/people-counter-installation.jpeg';

// Import video assets from src/assets/Videos
import cctvInstallationVideo from '../assets/Videos/CCTV-Installation.mp4';
import printerWorkingDemoVideo from '../assets/Videos/printer-working-demo.mp4';
import heroBackVideo from '../assets/Videos/Hero-back-video.mp4';

export const config = {
  company: {
    name: 'INFINITY SERVICES',
    shortName: 'INFINITY SERVICES',
    tagline: 'Computer, CCTV & Electrical Solutions',
    description: 'INFINITY SERVICES provides Computer Repair, CCTV Installation, Electrical Services, Printer Repair, Data Recovery, Home Wiring, and Technical Support in Ichalkaranji and nearby areas.',
    owner: 'Akshay Kumbhar',
    phone: '+91 95614 87508', // Owner phone number
    whatsAppPhone: '919561487508', // WhatsApp number in international format without + or 00 or spaces
    whatsAppMessage: 'Hi, I would like to inquire about your repair and installation services.',
    email: 'infinityservices@gmail.com',
    address: 'INFINITY SERVICES, Main Road, Ichalkaranji - 416115, Maharashtra, India',
    hours: 'Monday - Saturday: 9:00 AM - 8:00 PM, Sunday: Emergency Calls Only',
    emergencyText: 'Fast Response Available For Urgent Repairs & Emergency Fault Finding',
    mapsUrl: 'https://maps.app.goo.gl/1QZpcxCkGo6C7ybq5',
    socials: {
      instagram: 'https://www.instagram.com/akshay_k007?igsh=MXM0bDc1MWF6OHNpeg==',
      facebook: '', // empty to hide
      youtube: '', // empty to hide
    }
  },
  navigation: {
    links: [
      { label: 'Home', href: '#' },
      { label: 'Services', href: '#services' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Videos', href: '#videos' },
      { label: 'Contact', href: '#contact' },
      { label: 'Offers', href: '#products' },
    ]
  },
  stats: [
    { value: '500+', label: 'Repairs Completed', description: 'Computers & appliances fixed' },
    { value: '100+', label: 'CCTV Installations', description: 'Securing properties daily' },
    { value: '300+', label: 'Happy Customers', description: 'Five-star rated service' },
    { value: '5+', label: 'Years Experience', description: 'Industry certified team' },
  ],
  heroMedia: {
    type: 'video', // 'video' or 'image'
    src: heroBackVideo,
  },
  services: [
    {
      category: 'Computer Services',
      badge: 'Computer Services',
      description: 'Reliable repair, setup, and recovery services for your computers and surveillance systems.',
      iconName: 'Monitor',
      imageUrl: cctvWorkingMonitor, // CCTV-Working-demo.jpeg
      items: [
        'Computer Hardware Repair',
        'Software Installation & Updates',
        'Data Recovery',
        'Operating System Reinstallation',
        'Virus & Malware Removal',
        'Printer Troubleshooting & Repair',
        'CCTV Installation & Maintenance'
      ]
    },
    {
      category: 'Electrical Services',
      badge: 'Electrical Services',
      description: 'Safe, certified electrical engineering, wiring solutions, and device repairs for your home.',
      iconName: 'Zap',
      imageUrl: electricalWork1, // Electric-Work1.jpeg
      items: [
        'Home Wiring & Repair',
        'Light Fitting & Repair',
        'Fan Installation & Repair',
        'Switchboard Replacement',
        'Electrical Fault Finding',
        'Inverter Installation & Repair',
        'UPS Installation & Repair'
      ]
    },
    {
      category: 'Second-Hand Products',
      badge: 'Second-Hand Products',
      description: 'Affordable, fully tested, and certified pre-owned electronics backed by a warranty.',
      iconName: 'Package',
      imageUrl: laptopRefurbished, // 2nd-Hand_Laptop.jpeg
      items: [
        'Desktop PCs',
        'All-in-One Systems',
        'Laptops',
        'Monitors',
        'Printers',
        'CCTV Cameras'
      ]
    }
  ],
  gallery: [
    {
      id: 1,
      src: cctvInstallation1,
      title: 'CCTV Camera Setup',
      category: 'CCTV',
      description: 'Installing a high-definition dome security camera for retail property surveillance.'
    },
    {
      id: 2,
      src: cctvWorkingMonitor,
      title: 'Control Room Security Feed',
      category: 'CCTV',
      description: 'Multi-screen security feed configuration displaying active real-time surveillance.'
    },
    {
      id: 3,
      src: cctvWorkingMobile,
      title: 'Mobile Monitoring App Integration',
      category: 'CCTV',
      description: 'Configuring live video streaming and cloud alert connectivity on smartphone.'
    },
    {
      id: 4,
      src: electricalWork1,
      title: 'Distribution Board Wiring',
      category: 'Electrical',
      description: 'Main panel switchgear installation, wiring alignment, and electrical safety check.'
    },
    {
      id: 5,
      src: electricalWork2,
      title: 'Circuit Testing & Diagnostics',
      category: 'Electrical',
      description: 'Troubleshooting electrical load distribution and diagnosing breaker issues.'
    },
    {
      id: 6,
      src: electricalWork3,
      title: 'Industrial Electrical Socket Installation',
      category: 'Electrical',
      description: 'High-amperage wall outlet setup for commercial kitchen electrical appliances.'
    },
    {
      id: 7,
      src: laptopRefurbished,
      title: 'Refurbished Business Laptops',
      category: 'Products',
      description: 'Quality-tested pre-owned laptops, cleaned and upgraded with fast solid-state drives.'
    },
    {
      id: 8,
      src: monitorRepair,
      title: 'IPS Monitor Panel Calibration',
      category: 'Repairs',
      description: 'Hardware calibration and troubleshooting backlight issues on professional display panels.'
    },
    {
      id: 9,
      src: peopleCounterInstallation,
      title: 'People Counting Sensor Installation',
      category: 'Specialized',
      description: 'Ceiling mount installation of automated pedestrian traffic sensor system.'
    }
  ],
  videos: [
    {
      id: 'vid-cctv',
      src: cctvInstallationVideo,
      poster: cctvInstallation1,
      title: 'Professional CCTV Installation Demo',
      description: 'Watch a step-by-step clip of our security technician mounting and testing a professional surveillance dome camera.',
      duration: '0:35'
    },
    {
      id: 'vid-printer',
      src: printerWorkingDemoVideo,
      poster: peopleCounterInstallation,
      title: 'Refurbished Printer Performance Run',
      description: 'Real-time demonstration of a serviced HP LaserJet printer running high-speed duplex test prints.',
      duration: '1:12'
    }
  ],
  footer: {
    servicesLinks: [
      { label: 'Computer Repair', href: '#services' },
      { label: 'CCTV Installation', href: '#services' },
      { label: 'Electrical Repair', href: '#services' },
      { label: 'Data Recovery', href: '#services' },
      { label: 'Printer Repair', href: '#services' },
    ]
  }
};
