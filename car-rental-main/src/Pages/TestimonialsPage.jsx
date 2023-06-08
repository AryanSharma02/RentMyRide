import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import Testimonials from "../components/Testimonials";
import test from "../images/testimonials/Untitled.jpeg";

function TestimonialsPage() {
  return (
    <>
      <section className="testimonial-page">
        <HeroPages name="Carpool" />
        {/* <Testimonials /> */}
        <div style={{
          display:"flex",
          justifyContent:"center",
          fontSize:"4rem",
        }}>
          <div style={{
            backgroundColor:"rgba(255, 254, 255, 0.72)", 
               fontWeight:"bolder",
               width:"100%",
               height:"100%",
               position:"absolute",
          }}>
          </div>
            Under development.
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>(123) 456-7869</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default TestimonialsPage;
