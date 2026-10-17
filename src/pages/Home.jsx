
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-label">WELCOME TO MODELS3GO</p>

          <h1>Get your dream model today!</h1>

          <p className="hero-description">
            Discover quality 3D-printed products designed
            to make everyday life easier. From desk
            accessories to custom organizers, we bring
            useful ideas into the real world.
          </p>

          <Link to="/shop" className="primary-button">
            Explore Products
          </Link>
        </div>

        <div className="hero-visual">
          <div className="hero-icon">⬡</div>
          <h2>Designed with purpose.</h2>
          <p>Made one layer at a time.</p>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <h3>Custom Designs</h3>
          <p>Functional products made for everyday needs.</p>
        </div>

        <div className="feature">
          <h3>Quality Materials</h3>
          <p>Carefully printed using PLA and PETG materials.</p>
        </div>

        <div className="feature">
          <h3>Made with Precision</h3>
          <p>Thoughtful designs with attention to detail.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
