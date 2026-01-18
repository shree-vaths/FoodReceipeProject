import sql from 'better-sqlite3';
const db = sql('meals.db');
import slugify from 'slugify';
import xss from 'xss';

export async function getAllMeals() {
  try {
    const stmt = db.prepare('SELECT * FROM meals');
    const meals = stmt.all();
    return meals;
  } catch (error) {
    console.error('Error fetching meals:', error);
    return [];
  }
}

export async function getMealBySlug(slug) {
  try {
    const stmt = db.prepare('SELECT * FROM meals WHERE slug = ?');
    const meal = stmt.get(slug);
    return meal;
  } catch (error) {
    console.error('Error fetching meal:', error);
    return null;
  }
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, {lower: true});
  meal.instructions = xss(meal.instructions);
  meal.image = "/images/logo.png";

  console.log(meal);
  
  const stmt = db.prepare(`
    INSERT INTO meals (slug, title, image, summary, instructions, creator, creator_email)
    VALUES (@slug, @title, @image, @summary, @instructions, @creator, @creator_email)
  `);
  
  stmt.run(meal);

}
