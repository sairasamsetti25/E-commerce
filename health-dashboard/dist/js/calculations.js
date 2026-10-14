export function calculateMetrics(state) {
  const height = Number(state.profileHeight) || 178;
  const weight = Number(state.profileWeight) || 71;
  const age = Number(state.profileAge) || 32;
  const bmi = weight / ((height / 100) ** 2);
  const category = bmi < 18.5 ? 'Below healthy range' : bmi < 25 ? 'Healthy range' : bmi < 30 ? 'Above healthy range' : 'Higher range';
  const bmr = (10 * weight) + (6.25 * height) - (5 * age) + (state.profileSex === 'male' ? 5 : -161);
  const maintain = Math.round(bmr * (Number(state.profileActivity) || 1.55));
  return { bmi, category, bmr: Math.round(bmr), maintain, lose: Math.max(1200, maintain - 500), gain: maintain + 250, surface: Math.sqrt((height * weight) / 3600) };
}
