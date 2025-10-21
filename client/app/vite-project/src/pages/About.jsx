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
          <li>📚 Multiple genres and story types</li>
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

      <style jsx>{`
        .about-page {
          max-width: 800px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 2.5rem;
          color: #2d3748;
          margin-bottom: 2rem;
          text-align: center;
        }

        .about-section {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .about-section h2 {
          color: #667eea;
          margin-bottom: 1rem;
          font-size: 1.8rem;
        }

        .about-section p {
          color: #4a5568;
          line-height: 1.8;
          font-size: 1.05rem;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .step {
          text-align: center;
        }

        .step-number {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0 auto 1rem;
        }

        .step h3 {
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .step p {
          color: #718096;
          font-size: 0.95rem;
        }

        .features-list {
          list-style: none;
          padding: 0;
        }

        .features-list li {
          padding: 0.75rem 0;
          color: #4a5568;
          font-size: 1.05rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .features-list li:last-child {
          border-bottom: none;
        }

        @media (max-width: 768px) {
          .page-title {
            font-size: 2rem;
          }

          .about-section {
            padding: 1.5rem;
          }

          .steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default About;
