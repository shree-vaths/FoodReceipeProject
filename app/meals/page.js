import Link from 'next/link';

import classes from './page.module.css';
import MealGrd from '@/components/meals/MealGrid';
import { getAllMeals } from '@/lib';

export default async function Home() {
    const meals = await getAllMeals();
  return (
    <>
      <header className={classes.header}>
            <h1>
                Delicious meals created{' '}
                <span className={classes.highlight}>by you</span>
            </h1>
            <p className={classes.cta}>
                <Link href="/meals/share">Share your receipe</Link>
            </p>
      </header>
      <main className={classes.main}>
            <MealGrd meals={meals}/>
      </main>
    </>
  );
}