import MealItem from "./MealItem";

import classes from './meal-grid.module.css';

export default function MealGrd({ meals }) {
    return (
        <ul className={classes.meals}>
            {
                meals.map((meal) => (
                    <li key={meal.id}>
                        <MealItem {...meal}/>
                    </li>
                ))
            }
        </ul>
    )
}