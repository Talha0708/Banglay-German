// scripts/build-all-1200.js
const fs = require('fs');
const path = require('path');

const vocabDir = path.join(__dirname, '..', 'data', 'vocabulary');
if (!fs.existsSync(vocabDir)) {
  fs.mkdirSync(vocabDir, { recursive: true });
}

function save(name, list) {
  const filePath = path.join(vocabDir, name);
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf-8');
  console.log(`Saved ${name}: ${list.length} words`);
  return list.length;
}

const { greetings } = require('./vocab-part1');
const { basicsPersonal, familyPeople } = require('./vocab-data-basics-family');
const { homeLiving, foodDrinks } = require('./vocab-set-home-food');
const { dailyRoutineTime, cityTransportTravel, workOfficeEducation } = require('./vocab-set-routine-travel-work');
const { healthBody, hobbiesLeisureSports, clothingShoppingColors, numbersMoneyQuantities } = require('./vocab-set-health-hobbies-shop-num');
const { essentialVerbs, essentialAdjectives, prepositionsConjunctions, goetheExamWords } = require('./vocab-set-verbs-adj-prep-exam');

let total = 0;
total += save('greetings.json', greetings);
total += save('basics_personal.json', basicsPersonal);
total += save('family_people.json', familyPeople);
total += save('home_living.json', homeLiving);
total += save('food_drinks.json', foodDrinks);
total += save('daily_routine_time.json', dailyRoutineTime);
total += save('city_transport_travel.json', cityTransportTravel);
total += save('work_office_education.json', workOfficeEducation);
total += save('health_body.json', healthBody);
total += save('hobbies_leisure_sports.json', hobbiesLeisureSports);
total += save('clothing_shopping_colors.json', clothingShoppingColors);
total += save('numbers_money_quantities.json', numbersMoneyQuantities);
total += save('essential_verbs.json', essentialVerbs);
total += save('essential_adjectives.json', essentialAdjectives);
total += save('prepositions_conjunctions.json', prepositionsConjunctions);
total += save('goethe_exam_words.json', goetheExamWords);

console.log(`========================================`);
console.log(`GRAND TOTAL: ${total} Goethe-Institut A1 words saved!`);
console.log(`========================================`);
