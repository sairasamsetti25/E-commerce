import { localFoods } from './config.js';
import { saveState, state } from './state.js';
import { calculateMetrics } from './calculations.js';
import { escapeHtml } from './ui.js';

export function createFoodFeature({ updateDashboard, closeDialog, showToast }) {
  function renderFoodLog() {
    const total = state.foodLog.reduce((sum, item) => sum + item.calories, 0);
    document.querySelector('#food-total').textContent = total.toLocaleString();
    document.querySelector('#food-progress-bar').style.width = `${Math.min(100, Math.round((total / calculateMetrics(state).maintain) * 100))}%`;
    const list = document.querySelector('#food-log-list');
    list.innerHTML = state.foodLog.length ? state.foodLog.map((item, index) => `<div class="logged-food"><div><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.serving)} · ${item.calories} kcal</small></div><button type="button" data-remove-food="${index}" aria-label="Remove ${escapeHtml(item.name)}">×</button></div>`).join('') : '<p class="empty-log">Search a food to start your day.</p>';
    list.querySelectorAll('[data-remove-food]').forEach((button) => button.addEventListener('click', () => { state.foodLog.splice(Number(button.dataset.removeFood), 1); saveState(); updateDashboard(); showToast('Food removed from today.'); }));
  }

  function renderFoodResults(results, source = 'local catalog') {
    const container = document.querySelector('#food-results');
    document.querySelector('#food-search-status').textContent = results.length ? `${results.length} results from ${source}. Select an item to add it.` : 'No matching foods found. Try a broader search.';
    container.innerHTML = results.map((food) => `<button type="button" class="food-result" data-food='${escapeHtml(JSON.stringify(food))}'><span><strong>${escapeHtml(food.name)}</strong><small>${escapeHtml(food.brand || 'Food database')} · ${escapeHtml(food.serving || '100 g')}</small></span><b>${Number(food.calories || 0).toLocaleString()} kcal</b></button>`).join('');
    container.querySelectorAll('[data-food]').forEach((button) => button.addEventListener('click', () => { const food = JSON.parse(button.dataset.food); state.foodLog.push({ ...food, calories: Math.round(Number(food.calories) || 0) }); saveState(); updateDashboard(); closeDialog(); showToast(`${food.name} added to today’s food log.`); }));
  }

  async function searchFoods(query) {
    const localResults = localFoods.filter((food) => `${food.name} ${food.brand}`.toLowerCase().includes(query.toLowerCase()));
    renderFoodResults(localResults, 'Carewell starter foods');
    const sources = [];
    const openFoodFacts = fetch(`https://world.openfoodfacts.org/api/v2/search?categories_tags_en=foods&search_terms=${encodeURIComponent(query)}&fields=product_name,brands,nutriments,serving_size&page_size=8`, { headers: { Accept: 'application/json' } }).then((response) => response.ok ? response.json() : Promise.reject(new Error('Open Food Facts unavailable'))).then((data) => (data.products || []).filter((product) => product.product_name && product.nutriments?.['energy-kcal_100g']).map((product, index) => ({ id: product.code || `off-${index}`, name: product.product_name, brand: product.brands || 'Open Food Facts', calories: Math.round(product.nutriments['energy-kcal_100g']), protein: Number(product.nutriments.proteins_100g || 0), carbs: Number(product.nutriments.carbohydrates_100g || 0), fat: Number(product.nutriments.fat_100g || 0), serving: product.serving_size || '100 g' })));
    const usdaKey = window.CAREWELL_USDA_API_KEY || 'DEMO_KEY';
    const usda = fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(usdaKey)}&query=${encodeURIComponent(query)}&pageSize=8`, { headers: { Accept: 'application/json' } }).then((response) => response.ok ? response.json() : Promise.reject(new Error('USDA unavailable'))).then((data) => (data.foods || []).filter((food) => food.description && food.foodNutrients?.some((nutrient) => nutrient.nutrientName === 'Energy' && nutrient.value !== undefined)).map((food) => { const nutrients = Object.fromEntries((food.foodNutrients || []).map((nutrient) => [nutrient.nutrientName, nutrient.value])); return { id: `usda-${food.fdcId}`, name: food.description, brand: food.brandOwner || 'USDA FoodData Central', calories: Math.round(nutrients.Energy || 0), protein: Number(nutrients.Protein || 0), carbs: Number(nutrients['Carbohydrate, by difference'] || 0), fat: Number(nutrients['Total lipid (fat)'] || 0), serving: '100 g' }; }));
    const [offResult, usdaResult] = await Promise.allSettled([openFoodFacts, usda]);
    const combined = []; if (offResult.status === 'fulfilled') { combined.push(...offResult.value); sources.push('Open Food Facts'); } if (usdaResult.status === 'fulfilled') { combined.push(...usdaResult.value); sources.push('USDA FoodData Central'); }
    const unique = [...new Map(combined.map((food) => [`${food.name}-${food.brand}`, food])).values()].slice(0, 12);
    renderFoodResults(unique.length ? unique : localResults, unique.length ? sources.join(' + ') : 'Carewell starter foods');
    if (!unique.length && !localResults.length) document.querySelector('#food-search-status').textContent = 'Live food services are unavailable. Try oats, banana, yogurt, chicken, rice, or egg.';
  }

  return { renderFoodLog, searchFoods };
}
