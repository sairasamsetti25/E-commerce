export const storageKey = 'carewell-demo-state-v1';

export const defaultState = {
  waterMl: 1600, waterGoalMl: 2200, planComplete: false, movementDone: 3,
  profileName: '', profileGoal: 'Better sleep', profileAge: 32, profileSex: 'female',
  profileHeight: 178, profileWeight: 71, profileActivity: 1.55, reminders: true,
  insights: true, selectedRange: 'D', selectedPlan: 'Monthly', foodLog: [],
};

export const localFoods = [
  { id: 'local-oats', name: 'Oats, dry', brand: 'Common food', calories: 389, protein: 16.9, carbs: 66.3, fat: 6.9, serving: '100 g' },
  { id: 'local-banana', name: 'Banana', brand: 'Common food', calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, serving: '100 g' },
  { id: 'local-yogurt', name: 'Greek yogurt, plain', brand: 'Common food', calories: 59, protein: 10.3, carbs: 3.6, fat: 0.4, serving: '100 g' },
  { id: 'local-chicken', name: 'Chicken breast, cooked', brand: 'Common food', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '100 g' },
  { id: 'local-rice', name: 'Rice, white, cooked', brand: 'Common food', calories: 130, protein: 2.7, carbs: 28.2, fat: 0.3, serving: '100 g' },
  { id: 'local-egg', name: 'Egg, whole, cooked', brand: 'Common food', calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: '100 g' },
];
