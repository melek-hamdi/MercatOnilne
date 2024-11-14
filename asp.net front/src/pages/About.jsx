import React from "react";
import { SectionTitle } from "../components";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <SectionTitle title="About Us" path="Home | About" />
      <div className="about-content text-center max-w-2xl mx-auto mt-5">
      <h2 className="text-6xl text-center mb-10 max-sm:text-3xl text-accent-content">We love our customers!</h2>
      <p className="text-lg text-center max-sm:text-sm max-sm:px-2 text-accent-content">
      Siamo dedicati a offrirvi i migliori prodotti con un servizio clienti eccellente. La nostra missione è fornire una vasta gamma di articoli di alta qualità a prezzi competitivi, garantendo una piacevole esperienza di acquisto.

      Perché scegliere noi?

      Qualità: Solo i prodotti migliori, accuratamente selezionati.
      Convenienza: Prezzi competitivi e offerte imperdibili.
      Assistenza clienti: Un team sempre pronto ad aiutarti.
      
      Grazie per aver scelto di fare acquisti con noi!
      </p>
      <Link to="/contact" className="btn btn-wide bg-blue-600 hover:bg-blue-500 text-white mt-5">Contact Us</Link>
      </div>
    </div>
  );
};

export default About;
