import Contact from "./contact.model.js";

const createContactUs = async (contactUsData) => {
  const contactData = {
    ...contactUsData,
  };

  const newContact = new Contact(contactData);
  const contactSave = await newContact.save();

  return contactSave;
};

export const ContactUsService = {
  createContactUs,
};
