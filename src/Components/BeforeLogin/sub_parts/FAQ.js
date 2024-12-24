import React, { useState } from "react";
import "./CSS File/FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Frequently Asked Questions
  const faqs = [
    {
      question: "What services do you offer?",
      answer:
        "We provide photography, video editing, camera rentals, and wedding-related services tailored to your needs.",
    },
    {
      question: "How can I book a session?",
      answer:
        "You can book a session by selecting your preferred photographer and filling out the booking form available on our website.",
    },
    {
      question: "Do you offer destination shoots?",
      answer:
        "Yes, we offer destination shoots. Please contact us in advance to discuss location, availability, and pricing.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Cancellations are accepted up to 48 hours before the scheduled session. Refunds will be processed based on our policy.",
    },
    {
      question: "How soon will I receive my photos?",
      answer:
        "Edited photos are typically delivered within 7-10 business days. Expedited processing is available upon request.",
    },
  ];

  // Toggle function to open and close answers
  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1>
        Frequently Asked Questions{" "}
        <span
          style={{
            backgroundColor: "rgb(186, 244, 99)",
            borderRadius: "4px",
            padding: "2px 4px",
          }}
        >
          (FAQ)
        </span>
      </h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">{faq.question}</div>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
