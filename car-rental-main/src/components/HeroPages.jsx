import { Link } from "react-router-dom";

function HeroPages({ name }) {
  return (
    <>
      <section className="hero-pages" style={{height:"30rem"}}>
        <div className="hero-pages__overlay"></div>
        <div className="container" style={{height:"70%"}} >
          <div className="hero-pages__text" >
            <h3>{name}</h3>
            <p>
              <Link to="/">Home</Link> / {name}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroPages;
