// Goal Button Handling
const goalButtons = document.querySelectorAll('.goal-btn');
let selectedGoal = '';

goalButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    goalButtons.forEach(btn => btn.classList.remove('active'));
    
    // Set active class and value
    button.classList.add('active');
    selectedGoal = button.dataset.goal;
    document.getElementById('goalType').value = selectedGoal;
    validateForm();
  });
});

// Validate form and enable/disable Calculate button
function validateForm() {
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const weight = document.getElementById('weight').value;
  const feet = document.getElementById('feet').value;
  const inches = document.getElementById('inches').value;
  const activity = document.getElementById('activity').value;
  const goal = document.getElementById('goal').value;
  const goalType = document.getElementById('goalType').value;

  const isFilled = age && gender && weight && feet && inches && activity && goal && goalType;
  document.getElementById('calculateButton').disabled = !isFilled;
}

// Add event listeners to all required fields
const requiredFields = ['age', 'gender', 'weight', 'feet', 'inches', 'activity', 'goal', 'goalType'];
requiredFields.forEach(id => {
  const element = document.getElementById(id);
  const event = element.tagName === 'SELECT' ? 'change' : 'input';
  element.addEventListener(event, validateForm);
});

// Handle form submission
document.getElementById('calorieForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get user inputs
  const age = parseInt(document.getElementById('age').value);
  const gender = document.getElementById('gender').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const feet = parseFloat(document.getElementById('feet').value);
  const inches = parseFloat(document.getElementById('inches').value);
  const activity = parseFloat(document.getElementById('activity').value);
  const goal = parseFloat(document.getElementById('goal').value);
  const language = document.getElementById('language').value;
  const goalType = document.getElementById('goalType').value;

  // Convert height to centimeters
  const heightCm = (feet * 12 + inches) * 2.54;

  // Calculate BMR
  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * heightCm) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * heightCm) - (4.330 * age);
  }

  // Calculate TDEE and deficit/surplus
  const tdee = bmr * activity;
  const deficitPerDay = (goal * 7700) / 30;
  const calorieIntake = goalType === 'loss' ? tdee - deficitPerDay : tdee + deficitPerDay;

  // Display results
  document.getElementById('maintenanceCalories').textContent = tdee.toFixed(2);
  document.getElementById('calorieIntake').textContent = calorieIntake.toFixed(2);
  document.getElementById('dailyDeficit').textContent = Math.abs(deficitPerDay).toFixed(2);
  document.getElementById('deficitOrSurplus').textContent = goalType === 'loss' ? 'Deficit' : 'Surplus';

  // Generate descriptive report
  const reportList = document.getElementById('report');
  reportList.innerHTML = ''; // Clear previous content

  // Inside the form submission handler
if (language) {
  let reportPoints = [];
  const formattedTdee = tdee.toFixed(0);
  const formattedIntake = calorieIntake.toFixed(0);
  const formattedDeficit = Math.abs(deficitPerDay).toFixed(0);

  switch (language) {
    case 'english':
      reportPoints = [
        `To maintain your weight, you need around ${formattedTdee} Calories/day.`,
        `To achieve your goal, you should consume ${formattedIntake} Calories/day, creating a daily Calorie ${goalType === 'loss' ? 'deficit' : 'surplus'} of ${formattedDeficit}.`,
        `By consuming ${formattedIntake} Calories, you will ${goalType === 'loss' ? 'reduce' : 'gain'} ${goal} kg every month.`
      ];
      break;

      case 'urdu':
  reportPoints = [
    `آپ کو اپنے وزن کو برقرار رکھنے کے لیے تقریباً ${formattedTdee} کیلوریز روزانہ درکار ہیں۔`,
    `آپ کے ہدف کو حاصل کرنے کے لیے، آپ کو ${formattedIntake} کیلوریز روزانہ کھانی چاہئیں، جس سے ${formattedDeficit} کیلوریز روزانہ ${goalType === 'loss' ? 'کم' : 'زیادہ '} ہوں گی۔`,
    `${formattedIntake} کیلوریز کھا کر، آپ ہر مہینے ${goal} کلو گرام وزن ${goalType === 'loss' ? 'کم' : 'بڑھا'} سکیں گے۔`
  ];
  break;

      case 'french':
        reportPoints = [
          `Pour maintenir votre poids: ${formattedTdee} Calories/jour`,
          `Pour ${goal}kg/mois ${goalType === 'loss' ? 'perte' : 'gain'}: ${formattedIntake} Calories/jour`,
          `${goalType === 'loss' ? 'Déficit' : 'Surplus'} quotidien: ${formattedDeficit} Calories`
        ];
        break;
      case 'punjabi':
        reportPoints = [
          `ਤੁਹਾਨੂੰ ਆਪਣੇ ਵਜ਼ਨ ਨੂੰ ਕਾਇਮ ਰੱਖਣ ਲਈ: ${formattedTdee} ਕੈਲੋਰੀਜ਼/ਦਿਨ`,
          `${goal} ਕਿਲੋਗ੍ਰਾਮ/ਮਹੀਨਾ ${goalType === 'loss' ? 'ਕਮੀ' : 'ਵਾਧਾ'} ਲਈ: ${formattedIntake} ਕੈਲੋਰੀਜ਼/ਦਿਨ`,
          `ਰੋਜ਼ਾਨਾ ${goalType === 'loss' ? 'ਕਮੀ' : 'ਵਾਧਾ'}: ${formattedDeficit} ਕੈਲੋਰੀਜ਼`
        ];
        break;
      case 'spanish':
        reportPoints = [
          `Para mantener su peso: ${formattedTdee} Calorías/día`,
          `Para ${goal}kg/mes de ${goalType === 'loss' ? 'pérdida' : 'aumento'}: ${formattedIntake} Calorías/día`,
          `${goalType === 'loss' ? 'Déficit' : 'Superávit'} diario: ${formattedDeficit} Calorías`
        ];
        break;
      case 'arabic':
        reportPoints = [
          `للحفاظ على وزنك، تحتاج إلى حوالي ${formattedTdee} سعرة حرارية يومياً.`,
          `لتحقيق هدفك، يجب أن تستهلك ${formattedIntake} سعرة حرارية يومياً، مما يخلق ${formattedDeficit} سعرة حرارية ${goalType === 'loss' ? 'عجز' : 'فائض'} يومياً.`,
          `باستهلاك ${formattedIntake} سعرة حرارية، ستقوم ${goalType === 'loss' ? 'بخس' : 'بزيادة'} ${goal} كيلوجرام كل شهر.`
        ];
        break;
    }

    // Set direction for RTL languages
    if (language === 'urdu' || language === 'arabic') {
      reportList.setAttribute('dir', 'rtl');
    } else {
      reportList.removeAttribute('dir');
    }

    reportPoints.forEach(point => {
      const li = document.createElement('li');
      li.textContent = point;
      reportList.appendChild(li);
    });

    document.getElementById('reportHeading').style.display = 'block';
    reportList.style.display = 'block';
  } else {
    document.getElementById('reportHeading').style.display = 'none';
    reportList.style.display = 'none';
  }
});

// Handle dropdown placeholder styling
const dropdowns = document.querySelectorAll('select.placeholder');
dropdowns.forEach((dropdown) => {
  dropdown.addEventListener('change', function () {
    if (this.value) {
      this.classList.remove('placeholder');
    } else {
      this.classList.add('placeholder');
    }
  });
});
