import './Technology.css';

export default function Technology() {
  return (
    <section className="technology">
      <div className="technology__container">
        <h2 className="technology__title">Технологии</h2>
        <h3 className="technology__quantity">7 технологий</h3>
        <p className="technology__about">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="technology__stack">
          <li className="technology__stack-item">
            <p className="technology__stack-name">HTML</p>
          </li>
          <li className="technology__stack-item">
            <p className="technology__stack-name">CSS</p>
          </li>
          <li className="technology__stack-item">
            <p className="technology__stack-name">JS</p>
          </li>
          <li className="technology__stack-item">
            <p className="technology__stack-name">React</p>
          </li>
          <li className="technology__stack-item">
            <p className="technology__stack-name">Git</p>
          </li>
          <li className="technology__stack-item">
            <p className="technology__stack-name">Express.js</p>
          </li>
          <li className="technology__stack-item">
            <p className="technology__stack-name">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
