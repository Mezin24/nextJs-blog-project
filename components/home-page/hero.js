import Image from 'next/image';
import classes from './hero.module.css';

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/max.png'
          alt='Max photo'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I am Max!</h1>
      <p>
        A blog about Web development - espetialy about frontend frameworks like
        Angular or React
      </p>
    </section>
  );
};

export default Hero;
