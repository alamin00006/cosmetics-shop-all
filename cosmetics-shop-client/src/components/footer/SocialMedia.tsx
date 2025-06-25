import React from 'react';
import Container from '../Container/Container';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

interface SocialLink {
  name: string;
  href: string;
  icon: 'facebook' | 'twitter' | 'instagram';
}

const socialLinks: SocialLink[] = [
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
];

const SocialMedia: React.FC = () => {
  const iconComponents = {
    facebook: <FaFacebookF className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600 hover:text-gray-900 transition-colors" />,
    twitter: <FaTwitter className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600 hover:text-gray-900 transition-colors" />,
    instagram: <FaInstagram className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600 hover:text-gray-900 transition-colors" />,
  };

  return (
    <Container className={" "}>
      <h3 className="text-base sm:text-lg font-semibold mb-4 text-gray-800">Follow us on</h3>
      <div className="flex space-x-3 sm:space-x-4">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 bg-gray-200 rounded-full transition-colors"
            aria-label={link.name}
          >
            {iconComponents[link.icon]}
          </a>
        ))}
      </div>
    </Container>
  );
};

export default SocialMedia;