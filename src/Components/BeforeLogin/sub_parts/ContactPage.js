import "./CSS File/ContactPage.css";

const ContactPage = ({ getUseRef }) => {
  return (
    <div className={`contact-info `} ref={getUseRef}>
      <div className="get_in_touch">
        <h3>Get in Touch</h3>
        <p>
          We would love to hear from you! If you have any questions or need
          assistance, feel free to reach out to us:
        </p>
      </div>

      <div className="contact_details">
        <h3>Contact Details</h3>
        <div className="email_and_phone">
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:weddingwhisper3@gmail.com">
              weddingwhisper3@gmail.com
            </a>
          </p>
          <p>
            <strong>Phone:</strong> <a href="tel:+1234567891">+1 234 567 891</a>
          </p>
        </div>
      </div>
      <div className="follow_us">
        <h3>Follow Us</h3>
        <div className="links_social_media">
          <p>Stay connected with us on social media:</p>
          <p>
            <a
              href="https://facebook.com/WeddingWhisper"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>{" "}
            |{" "}
            <a
              href="https://instagram.com/WeddingWhisper"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{" "}
            |{" "}
            <a
              href="https://twitter.com/WeddingWhisper"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
