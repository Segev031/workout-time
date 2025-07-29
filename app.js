const exercises = [
	{ name: "האק סקוואט", sets: 3, reps: 8, weight: "15 קילו", icon: "🏋️" },
	{ name: "כפיפת ברכיים במכשיר סלקטור ייעודי", sets: 3, reps: 10, weight: "38 קילו", icon: "🦵" },
	{ name: "לחיצת חזה", sets: 3, reps: 8, weight: "27 קילו", icon: "💪" },
	{ name: "משיכת מוט לחזה כנגד פולי עליון", sets: 3, reps: 10, weight: "27 קילו", icon: "🔙" },
	{ name: "הרחקת כתפיים", sets: 3, reps: 10, weight: "5 קילו", icon: "🤲" },
	{ name: "כפיפת מרפקים כנגד משקולות", sets: 3, reps: 7, weight: "5 קילו", icon: "💪" },
	{ name: "פשיטת מרפקים", sets: 3, reps: 20, weight: "20 קילו", icon: "🔥" },
	{ name: "כפיפות בטן בשיפוע", sets: 3, reps: 12, weight: "", icon: "🔥" },
];

let completedSets = new Set();

// טעינת נתונים מ-localStorage עם טיפול בשגיאות
function loadCompletedSets() {
	try {
		const stored = localStorage.getItem("completedSets");
		if (stored) {
			const parsed = JSON.parse(stored);
			if (Array.isArray(parsed)) {
				completedSets = new Set(parsed);
			}
		}
	} catch (e) {
		console.warn("שגיאה בעת טעינת הנתונים מ־localStorage:", e);
		localStorage.removeItem("completedSets");
	}
}
loadCompletedSets();

const encouragementMessagesByExercise = {
	"האק סקוואט": [
		"האק סקוואט? עכשיו אתה מרגיש כמו סופרמן עם רגליים של פלדה!",
		"כל סקוואט מקרב אותך לעוצמה של שריר שלא ידע שאפשר להרים!",
		"רגליים חזקות? בטח! עכשיו רק לא ליפול כשאתה קם מהמיטה.",
	],
	"כפיפת ברכיים במכשיר סלקטור ייעודי": [
		"ברכיים בכושר, כמו אגרוף של אלוף!",
		"כפיפות ברכיים – כל צעד קדימה זה ניצחון!",
		"אל תשכח לנשום, הברכיים שלך גאים בך!",
	],
	"לחיצת חזה": [
		"לחיצת חזה? עכשיו יש לך חזה שאפשר לפתוח איתו דלתות!",
		"כוח בחזה, פשוט מדהים! היכונו למבטא השרירים!",
		"לחיצה כזאת מזכירה לי לחיצות יד של אלופים.",
	],
	"משיכת מוט לחזה כנגד פולי עליון": [
		"משיכת מוט? כאילו אתה מושך את כל היקום לכיוון שלך!",
		"שרירי הגב מתעוררים – ותודה שלא נשכחת!",
		"הגב שלך אומר תודה – ממש כמו גיבור על!",
	],
	"הרחקת כתפיים": [
		"כתפיים כמו של שריף מהמערב הפרוע – הכי מגניב!",
		"כל הרחקה מקרבת אותך לכתפיים של טניסאי מקצוען.",
		"הרחקת כתפיים? נראה שאתה מוכן לחבק את העולם!",
	],
	"כפיפת מרפקים כנגד משקולות": [
		"כפיפות מרפקים – כי זרועות חזקות זה סיפור הצלחה!",
		"כל כפיפה מקרבת אותך לזרועות של נינג'ה.",
		"תתכונן – בקרוב כל מי שיחבק אותך ירגיש את הכוח!",
	],
	"פשיטת מרפקים": [
		"פשיטת מרפקים, כי גם המרפקים רוצים קצת אהבה!",
		"הידיים שלך מתחילים לדבר – ומספרים סיפורים של כוח!",
		"פשיטות כאלה מרימות אותך מעל כל אתגר.",
	],
	"כפיפות בטן בשיפוע": [
		"כפיפות בטן – לכושר ולקרע בבטן מצחוק!",
		"כל כפיפה מקרבת אותך לאביס מושלם – או לפחות לבטן שטוחה!",
		"בטן של בריאות וכיף – זה מה שמניע אותך!",
	],
};

const encouragementCharacters = [
	"💃", "🕺", "🏋️‍♂️", "🔥", "🎉", "🥳", "🤸‍♂️",
];

function renderExercises() {
	const container = document.getElementById("workoutContainer");
	container.innerHTML = "";

	exercises.forEach((exercise, exerciseIndex) => {
		const exerciseCard = document.createElement("div");
		exerciseCard.className = "exercise-card";

		let setsHTML = "";
		for (let setIndex = 0; setIndex < exercise.sets; setIndex++) {
			const setId = `${exerciseIndex}-${setIndex}`;
			const isCompleted = completedSets.has(setId);

			setsHTML += `
				<div class="set-item ${isCompleted ? 'completed' : ''}">
					<div class="set-info">
						<div class="set-number">${setIndex + 1}</div>
						<div>${exercise.reps} חזרות</div>
						<div>${exercise.weight}</div>
					</div>
					<button class="complete-btn ${isCompleted ? 'completed' : ''}" 
							onclick="toggleSet('${setId}', ${exerciseIndex})">
						${isCompleted ? '✓ הושלם' : 'סמן כהושלם'}
					</button>
				</div>
			`;
		}

		exerciseCard.innerHTML = `
			<div class="exercise-header">
				<div class="exercise-image">${exercise.icon}</div>
				<div class="exercise-info">
					<h3>${exercise.name}</h3>
					<div class="exercise-stats">
						${exercise.sets} סטים × ${exercise.reps} חזרות × ${exercise.weight}
					</div>
				</div>
			</div>
			<div class="sets-container">
				${setsHTML}
			</div>
		`;

		container.appendChild(exerciseCard);
	});

	updateStats();
}

function toggleSet(setId, exerciseIndex) {
	const wasCompleted = completedSets.has(setId);

	if (wasCompleted) {
		completedSets.delete(setId);
	} else {
		completedSets.add(setId);
		showEncouragementPopup(exerciseIndex);
		setTimeout(() => {
			startRestTimer(27)
		}, 3000); // ⏱️ מופעל בכל סימון סט
	}

	localStorage.setItem("completedSets", JSON.stringify([...completedSets]));
	renderExercises();
}

function updateStats() {
	const totalSets = exercises.reduce((sum, exercise) => sum + exercise.sets, 0);
	const completed = completedSets.size;
	const completionRate = Math.round((completed / totalSets) * 100);

	document.getElementById("completedSets").textContent = completed;
	document.getElementById("totalSets").textContent = totalSets;
	document.getElementById("completionRate").textContent = completionRate + "%";

	const progressFill = document.getElementById("progressFill");
	progressFill.style.width = completionRate + "%";

	const cards = document.querySelectorAll(".exercise-card");

	exercises.forEach((exercise, exerciseIndex) => {
		const exerciseCompleted = Array.from({ length: exercise.sets }, (_, i) =>
			completedSets.has(`${exerciseIndex}-${i}`)
		).every(Boolean);

		if (cards[exerciseIndex]) {
			cards[exerciseIndex].classList.toggle("completed", exerciseCompleted);

			if (exerciseCompleted) {
				const card = cards[exerciseIndex];
				card.classList.remove("pulse");
				void card.offsetWidth;
				card.classList.add("pulse");
			}
		}
	});

	if (completionRate === 100) {
		showPopup("כל הכבוד! הגוף זוכר, השריר מגיב, והספה מחכה. מחר – אותו דבר, רק יותר חזק!");
	}
}

function showEncouragementPopup(exerciseIndex) {
	const exerciseName = exercises[exerciseIndex].name;
	const messages = encouragementMessagesByExercise[exerciseName] || [
		"כל סט כזה מקרב אותך להצלחה!",
		"כל חזרה שווה זהב!",
	];
	const msg = messages[Math.floor(Math.random() * messages.length)];
	const char = encouragementCharacters[Math.floor(Math.random() * encouragementCharacters.length)];

	const popup = document.createElement("div");
	popup.className = "encouragement-popup";
	popup.innerHTML = `<span class="encouragement-char">${char}</span> ${msg}`;

	document.body.appendChild(popup);

	setTimeout(() => {
		popup.classList.add("fade-out");
		setTimeout(() => {
			popup.remove();
		}, 500);
	}, 2500);
}

function showPopup(message) {
	const popup = document.getElementById("popup");
	const popupMessage = document.getElementById("popup-message");
	popupMessage.textContent = message;
	popup.style.display = "flex";

	setTimeout(() => {
		closePopup();
	}, 3000);
}

function closePopup() {
	const popup = document.getElementById("popup");
	popup.style.display = "none";

	completedSets.clear();
	localStorage.removeItem("completedSets");
	renderExercises();
}

// ⏱️ פונקציית טיימר מנוחה
let restInterval = null;

function startRestTimer(seconds = 27) {
	clearInterval(restInterval);
	const timerBox = document.getElementById("rest-timer");
	const countdown = document.getElementById("rest-countdown");
	let timeLeft = seconds;

	timerBox.style.display = "block";
	countdown.textContent = timeLeft;

	restInterval = setInterval(() => {
		timeLeft--;
		countdown.textContent = timeLeft;
		if (timeLeft <= 0) {
			clearInterval(restInterval);
			timerBox.style.display = "none";
		}
	}, 1000);
}

// התחלה
renderExercises();
