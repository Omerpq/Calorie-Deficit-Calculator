// Validate form and enable/disable Calculate button
function validateForm() {
  const age = document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const weight = document.getElementById('weight').value;
  const feet = document.getElementById('feet').value;
  const inches = document.getElementById('inches').value;
  const activity = document.getElementById('activity').value;
  const goal = document.getElementById('goal').value;

  const isFilled = age && gender && weight && feet && inches && activity && goal;
  document.getElementById('calculateButton').disabled = !isFilled;
}

// Add event listeners to all required fields
const requiredFields = ['age', 'gender', 'weight', 'feet', 'inches', 'activity', 'goal'];
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

  // Convert height to centimeters
  const heightCm = (feet * 12 + inches) * 2.54;

  // Calculate BMR
  let bmr;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * heightCm) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * heightCm) - (4.330 * age);
  }

  // Calculate TDEE and deficit
  const tdee = bmr * activity;
  const deficitPerDay = (goal * 7700) / 30;
  const calorieIntake = tdee - deficitPerDay;

  // Display results
  document.getElementById('maintenanceCalories').textContent = tdee.toFixed(2);
  document.getElementById('calorieIntake').textContent = calorieIntake.toFixed(2);
  document.getElementById('dailyDeficit').textContent = deficitPerDay.toFixed(2);

  // Generate descriptive report
  const reportList = document.getElementById('report');
  reportList.innerHTML = ''; // Clear previous content

  if (language) {
    let reportPoints = [];
    const formattedTdee = tdee.toFixed(0);
    const formattedIntake = calorieIntake.toFixed(0);
    const formattedDeficit = deficitPerDay.toFixed(0);

    switch (language) {
      case 'english':
        reportPoints = [
          `To maintain your weight, you need around ${formattedTdee} Calories/day.`,
          `To achieve your goal, you should consume ${formattedIntake} Calories/day, creating a daily Calorie deficit of ${formattedDeficit}.`,
          `By consuming ${formattedIntake} Calories, you will reduce ${goal} kg every month.`
        ];
        break;
      case 'urdu':
        reportPoints = [
          `آپ کو اپنے وزن کو برقرار رکھنے کے لیے تقریباً ${formattedTdee} کیلوریز روزانہ درکار ہیں۔`,
          `آپ کے ہدف کو حاصل کرنے کے لیے، آپ کو ${formattedIntake} کیلوریز روزانہ کھانی چاہئیں، جس سے ${formattedDeficit} کیلوریز کی روزانہ کمی ہوگی۔`,
          `${formattedIntake} کیلوریز کھا کر، آپ ہر مہینے ${goal} کلو گرام وزن کم کریں گے۔`
        ];
        break;
      case 'french':
        reportPoints = [
          `Pour maintenir votre poids, vous avez besoin d'environ ${formattedTdee} Calories/jour.`,
          `Pour atteindre votre objectif, consommez ${formattedIntake} Calories/jour, créant un déficit quotidien de ${formattedDeficit} Calories.`,
          `En consommant ${formattedIntake} Calories, vous perdrez ${goal} kg chaque mois.`
        ];
        break;
      case 'punjabi':
        reportPoints = [
          `ਤੁਹਾਨੂੰ ਆਪਣੇ ਵਜ਼ਨ ਨੂੰ ਕਾਇਮ ਰੱਖਣ ਲਈ ਲਗਭਗ ${formattedTdee} ਕੈਲੋਰੀਜ਼/ਦਿਨ ਦੀ ਲੋੜ ਹੈ।`,
          `ਆਪਣੇ ਟੀਚੇ ਨੂੰ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ, ਤੁਹਾਨੂੰ ${formattedIntake} ਕੈਲੋਰੀਜ਼/ਦਿਨ ਖਾਣੀਆਂ ਚਾਹੀਦੀਆਂ ਹਨ, ਜਿਸ ਨਾਲ ${formattedDeficit} ਕੈਲੋਰੀਜ਼ ਦੀ ਰੋਜ਼ਾਨਾ ਕਮੀ ਹੋਵੇਗੀ।`,
          `${formattedIntake} ਕੈਲੋਰੀਜ਼ ਖਾਣ ਨਾਲ, ਤੁਸੀਂ ਹਰ ਮਹੀਨੇ ${goal} ਕਿਲੋਗ੍ਰਾਮ ਕਮ ਕਰੋਗੇ।`
        ];
        break;
      case 'spanish':
        reportPoints = [
          `Para mantener su peso, necesita aproximadamente ${formattedTdee} Calorías/día.`,
          `Para alcanzar su objetivo, consuma ${formattedIntake} Calorías/día, creando un déficit diario de ${formattedDeficit} Calorías.`,
          `Al consumir ${formattedIntake} Calorías, reducirá ${goal} kg cada mes.`
        ];
        break;
      case 'arabic':
        reportPoints = [
          `للحفاظ على وزنك، تحتاج إلى حوالي ${formattedTdee} سعرة حرارية/يوم.`,
          `لتحقيق هدفك، يجب أن تستهلك ${formattedIntake} سعرة حرارية/يوم، مما يخلق عجزًا يوميًا قدره ${formattedDeficit} سعرة حرارية.`,
          `باستهلاك ${formattedIntake} سعرة حرارية، ستقلل ${goal} كجم كل شهر.`
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