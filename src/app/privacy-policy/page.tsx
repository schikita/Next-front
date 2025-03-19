// app/privacy-policy/page.tsx
"use client";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto p-6 mt-4">
      <h1 className="text-3xl md:text-4xl font-semibold text-center mb-6 text-gray-800 dark:text-white transition-colors duration-300">Политика конфиденциальности</h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-all duration-300">
        Ваша конфиденциальность важна для нас. В этой Политике конфиденциальности описывается, как мы
        собираем, используем и защищаем вашу информацию, когда вы используете наш веб-сайт.
      </p>

      <section className="mt-6">
      <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-2">1. Собираемая информация</h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-all duration-300">
          Мы собираем информацию, которую вы предоставляете нам напрямую, такую как имя, адрес электронной
          почты, и любую другую информацию, которую вы нам предоставляете при регистрации или использовании
          наших услуг.
        </p>
      </section>

      <section className="mt-6">
      <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-2">2. Использование информации</h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-all duration-300">
          Мы используем вашу информацию для обеспечения предоставления наших услуг, а также для анализа
          работы нашего сайта и улучшения пользовательского опыта.
        </p>
      </section>

      <section className="mt-6">
      <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-2">3. Защита информации</h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-all duration-300">
          Мы принимаем все необходимые меры для защиты вашей личной информации, включая использование
          современных технологий безопасности, чтобы предотвратить несанкционированный доступ, утечку или
          потерю данных.
        </p>
      </section>

      <section className="mt-6">
      <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-2">4. Согласие</h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-all duration-300">
          Используя наш сайт, вы соглашаетесь с условиями этой Политики конфиденциальности. Если вы не
          согласны с нашей политикой, пожалуйста, не используйте наши услуги.
        </p>
      </section>

      <section className="mt-6">
      <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-2">5. Изменения в политике конфиденциальности</h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-all duration-300">
          Мы оставляем за собой право обновлять или изменять эту Политику конфиденциальности. Мы уведомим
          вас о любых изменениях, размещая обновленную версию на нашем сайте.
        </p>
      </section>

      <section className="mt-6">
      <h2 className="text-xl font-medium text-gray-800 dark:text-white mb-2">6. Контакты</h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-4 transition-all duration-300">
          Если у вас есть вопросы или замечания относительно нашей Политики конфиденциальности, пожалуйста,
          свяжитесь с нами по адресу электронной почты: info@example.com.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
