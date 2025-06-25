import React from 'react';
import Container from '../Container/Container';

interface ContactInfo {
  phone: string;
  email: string;
  hours: string;
}

const contactInfo: ContactInfo = {
  phone: '+91-8010-024351',
  email: 'support@holkmakeup.com',
  hours: 'Monday to Saturday 10AM to 8PM',
};

const HelpDesk: React.FC = () => {
  return (
    <Container className={" "}>
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Help Desk</h3>
      <div className="space-y-2 text-gray-600 text-sm sm:text-base">
        <p>{contactInfo.phone}</p>
        <p>
          <a href={`mailto:${contactInfo.email}`} className="hover:text-gray-900 transition-colors">
            {contactInfo.email}
          </a>
        </p>
        <p>{contactInfo.hours}</p>
      </div>
    </Container>
  );
};

export default HelpDesk;