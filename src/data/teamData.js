// Team member data
import founderImg from '../assets/images/team/Founder.jpg';
import coFounderImg from '../assets/images/team/Co-Founder.jpg';
import managerImg from '../assets/images/team/Community-Manager.jpg';
import eventLeadImg from '../assets/images/team/Team-Lead.jpg';
import { HiOutlineStar } from 'react-icons/hi';
import { FiUser, FiUsers, FiSettings, FiCalendar } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

export const teamMembers = [
  {
    name: 'Deepansu',
    role: 'Founder',
    description: 'Visionary leader with 10+ years in full-stack development. Passionate about building communities and mentoring developers.',
    image: founderImg,
    icon: HiOutlineStar,
    color: '#e74c3c',
    socialLinks: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/in/deepansu-214a7b269', icon: FaLinkedin },
      { platform: 'instagram', url: 'https://www.instagram.com/deepansu.me', icon: FaInstagram },
      { platform: 'github', url: 'https://github.com/DeepanshuS1', icon: FaGithub },
      { platform: 'website', url: 'https://deepansu.me', icon: FiUser }
    ]
  },
  {
    name: 'Ayush Yadav',
    role: 'Co-Founder',
    description: 'Expert in UI/UX design and frontend technologies. Dedicated to creating inclusive and accessible tech solutions.',
    image: coFounderImg,
    icon: FiUser,
    color: '#9b59b6',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/ayushyadav', icon: FaLinkedin },
      { platform: 'instagram', url: 'https://instagram.com/ayushyadav', icon: FaInstagram },
      { platform: 'github', url: 'https://github.com/ayushyadav', icon: FaGithub },
      { platform: 'website', url: 'https://ayushyadav.dev', icon: FiUser }
    ]
  },
  {
    name: 'Rajan Jha',
    role: 'Community Manager',
    description: 'Community building specialist focused on member engagement and organizing impactful tech events.',
    image: managerImg,
    icon: FiUsers,
    color: '#3498db',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/rajanjha', icon: FaLinkedin },
      { platform: 'instagram', url: 'https://instagram.com/rajanjha', icon: FaInstagram },
      { platform: 'github', url: 'https://github.com/rajanjha', icon: FaGithub },
      { platform: 'website', url: 'https://rajanjha.dev', icon: FiUser }
    ]
  },
  {
    name: 'Akshit Tiwari',
    role: 'Event Lead',
    description: 'Event coordination expert with a passion for organizing hackathons, workshops, and networking meetups.',
    image: eventLeadImg,
    icon: FiCalendar,
    color: '#1abc9c',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/akshit-tiwarii', icon: FaLinkedin },
      { platform: 'instagram', url: 'https://instagram.com/akshittiwarii', icon: FaInstagram },
      { platform: 'github', url: 'https://github.com/AkshitTiwarii', icon: FaGithub },
      { platform: 'website', url: 'https://github.com/AkshitTiwarii', icon: FiUser }
    ]
  }
];

export const additionalMembers = [
  {
    name: 'Deepansu',
    role: 'Technical Writer',
    description: 'Creating comprehensive documentation and tutorials for our community.',
    image: founderImg,
    icon: FiSettings,
    color: '#f39c12',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/priyasharma', icon: FaLinkedin },
      { platform: 'instagram', url: 'https://instagram.com/priyasharma', icon: FaInstagram },
      { platform: 'github', url: 'https://github.com/priyasharma', icon: FaGithub },
      { platform: 'website', url: 'https://priyasharma.dev', icon: FiUser }
    ]
  },
  {
    name: 'Ayush',
    role: 'Mentor',
    description: 'Guiding junior developers and conducting technical sessions.',
    image: coFounderImg,
    icon: FiUser,
    color: '#8e44ad',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/rohitkumar', icon: FaLinkedin },
      { platform: 'instagram', url: 'https://instagram.com/rohitkumar', icon: FaInstagram },
      { platform: 'github', url: 'https://github.com/rohitkumar', icon: FaGithub },
      { platform: 'website', url: 'https://rohitkumar.dev', icon: FiUser }
    ]
  }
];

export const topMembers = [
  {
    name: 'Rajan',
    role: 'Top Contributor',
    description: 'Most active community member with 50+ contributions.',
    image: managerImg,
    icon: HiOutlineStar,
    color: '#e67e22',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/aniketsingh', icon: FaLinkedin },
      { platform: 'instagram', url: 'https://instagram.com/aniketsingh', icon: FaInstagram },
      { platform: 'github', url: 'https://github.com/aniketsingh', icon: FaGithub },
      { platform: 'website', url: 'https://aniketsingh.dev', icon: FiUser }
    ]
  },
  {
    name: 'Akshit',
    role: 'Rising Star',
    description: 'Promising developer showing exceptional growth and participation.',
    image: eventLeadImg,
    icon: HiOutlineStar,
    color: '#27ae60',
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/snehapatel', icon: FaLinkedin },
      { platform: 'instagram', url: 'https://instagram.com/snehapatel', icon: FaInstagram },
      { platform: 'github', url: 'https://github.com/snehapatel', icon: FaGithub },
      { platform: 'website', url: 'https://snehapatel.dev', icon: FiUser }
    ]
  }
];

export const dynamicTitles = [
  "Meet Our Team",
  "Our Amazing Crew", 
  "The DNA Family",
  "Behind the Code",
  "Our Core Members"
];
