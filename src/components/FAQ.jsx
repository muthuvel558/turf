import React, { useState } from 'react';
import { FAQ_DATA } from '../data/faq';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">COMMON QUESTIONS</span>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="lead">Everything you need to know about booking, slot cancellation, and venue rules.</p>
        </div>

        <div className="faq-list">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="faq-item">
                <button 
                  className="faq-question" 
                  onClick={() => toggleAccordion(idx)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
