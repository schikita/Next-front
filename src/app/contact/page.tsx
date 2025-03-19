"use client";

import React from "react";

const Contact = () => {
  return (
    <div className="max-w-screen-md mx-auto p-6 mt-10  rounded">
      <h1 className="text-3xl font-semibold mb-6">Контакты</h1>
      <section className="space-y-6 text-sm sm:text-base">        
        
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Адрес</h3>
            <p>12345, Беларусь, Минск, улица Примерная, 10</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Телефон</h3>
            <p>+375 29 123-45-67</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Электронная почта</h3>
            <p>contact@yourwebsite.com</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Социальные сети</h3>
            <p>
              <a
                href="https://facebook.com"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Facebook
              </a>
            </p>
            <p>
              <a
                href="https://twitter.com"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Twitter
              </a>
            </p>
            <p>
              <a
                href="https://instagram.com"
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                Instagram
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
