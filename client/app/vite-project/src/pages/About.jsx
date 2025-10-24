import logo from '../assets/logo.jpg';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <h1 className="page-title">About EasyTales</h1>
      
      <section className="about-section">
        <h2>What is EasyTales?</h2>
        <p>
          EasyTales is a collaborative storytelling platform where writers from around the world
          come together to create unique stories, one paragraph at a time. Each story is a
          collective masterpiece, shaped by the creativity and imagination of our community.
        </p>
      </section>

      <section className="about-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Create or Join</h3>
            <p>Start a new story with an opening paragraph, or join an existing story that catches your interest.</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Write & Contribute</h3>
            <p>Add your paragraph to continue the narrative. Be creative, engaging, and respectful of the story's direction.</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Vote & Engage</h3>
            <p>Vote on paragraphs you love. The best contributions rise to the top and shape the story's evolution.</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Discover & Enjoy</h3>
            <p>Read completed stories, follow your favorites, and watch as collaborative tales unfold.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>Features</h2>
        <ul className="features-list">
          <li>✍️ Collaborative paragraph-by-paragraph storytelling</li>
          <li>👥 Community-driven narrative development</li>
          <li>🗳️ Voting system to highlight the best contributions</li>
          <li>✨ AI-powered writing suggestions (coming soon)</li>
          <li className="logo-text-container"><img src={logo} alt="Feature" className="feature-logo" /> Multiple genres and story types</li>
          <li>🎨 Clean, intuitive interface</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          We believe that everyone has a story to tell, and that the best stories come from
          collaboration. EasyTales provides a welcoming space for writers of all skill levels
          to practice their craft, learn from others, and create something amazing together.
        </p>
      </section>
    </div>
  );
};

export default About;
