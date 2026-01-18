import classes from './page.module.css';
import Image from 'next/image';
import { getMealBySlug } from '@/lib';

export default async function mealsDynamicPage({ params }){
    const meal = await getMealBySlug(params.mealSlug);
    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={meal.image} alt={meal.title} fill/>
                </div>
                <div className={classes.headerText}>
                    <h1>
                        {meal.title}
                    </h1>
                    <p className={classes.creator}>
                        {meal.creator}
                    </p>
                    <p className={classes.summary}>
                        {meal.summary}
                    </p>
                </div>
            </header>
            <main>
                <p  className={classes.instructions} dangerouslySetInnerHTML={{
                    __html:meal.instructions.replace(/\n/g,'<br />')
                }}>

                </p>
            </main>
        </>
    )
}