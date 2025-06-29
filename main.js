// 작품명 리스트 뽑기
const titles = [...new Set(quizData.map(q => q.title))];

// 선택된 작품들
const selectedTitles = new Set();

// 내부 상태 변수
let quizPool = [];
let currentIndex = 0;
let correctCount = 0;
let quizCount = 10;
let currentQuiz = null;
let stats = {};

// 체크박스 만들기
const checkboxesDiv = document.getElementById("checkboxes");

titles.forEach(title => {
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = title;
  checkbox.onchange = () => {
    if (checkbox.checked) selectedTitles.add(title);
    else selectedTitles.delete(title);
  };
  label.appendChild(checkbox);
  label.append(" " + title);
  checkboxesDiv.appendChild(label);
  checkboxesDiv.appendChild(document.createElement("br"));
});

// 모두 선택/해제 기능
let toggleState = false;
function toggleAll() {
  toggleState = !toggleState;
  const checkboxes = checkboxesDiv.querySelectorAll("input");
  checkboxes.forEach(cb => {
    cb.checked = toggleState;
    if (toggleState) selectedTitles.add(cb.value);
    else selectedTitles.delete(cb.value);
  });
}

// 문제 개수 조절 기능
function updateQuizCountDisplay() {
  document.getElementById("quizCountDisplay").innerText = quizCount;
}

function increaseCount() {
  const filtered = quizData.filter(q => selectedTitles.has(q.title));
  if (quizCount + 5 <= filtered.length) {
    quizCount += 5;
    updateQuizCountDisplay();
  }
}

function decreaseCount() {
  if (quizCount > 10) {
    quizCount -= 5;
    updateQuizCountDisplay();
  }
}

// 퀴즈 시작
function startQuiz() {
  const filtered = quizData.filter(q => selectedTitles.has(q.title));
  if (filtered.length === 0) {
    alert("작품을 선택해주세요!");
    return;
  }

  if (filtered.length < quizCount) {
    alert(`선택한 작품의 문제 수가 ${quizCount}개보다 적습니다.`);
    return;
  }

  quizPool = [...filtered]
    .sort(() => Math.random() - 0.5)
    .slice(0, quizCount);

  currentIndex = 0;
  correctCount = 0;
  stats = {};
  quizPool.forEach(q => {
    stats[q.title] = (stats[q.title] || 0) + 1;
  });

  document.getElementById("summary").style.display = "none";
  nextQuiz();
}

// 문제 출제
function nextQuiz() {
  currentQuiz = quizPool[currentIndex];
  document.getElementById("quizPrompt").innerText =
    `[${currentQuiz.title}] ${currentQuiz.type === "가사" ? `🎵 ${currentQuiz.number}` : ''}\n\n${currentQuiz.prompt}`;
  document.getElementById("quizBox").style.display = "block";
  document.getElementById("result").innerText = "";
  document.getElementById("userAnswer").value = "";
}

// 정답 제출
function submitAnswer() {
  const userAnswer = document.getElementById("userAnswer").value.trim().toLowerCase();
  const correctAnswer = currentQuiz.answer.toLowerCase();
  const result = document.getElementById("result");

  if (userAnswer === correctAnswer) {
    correctCount++;
    result.innerText = "✅ 정답입니다!";
  } else {
    result.innerText = `❌ 오답입니다! 정답: "${correctAnswer}"`;
  }

  currentIndex++;
  setTimeout(() => {
    if (currentIndex < quizPool.length) {
      nextQuiz();
    } else {
      showSummary();
    }
  }, 1500);
}

// 결과 요약 화면
function showSummary() {
  document.getElementById("quizBox").style.display = "none";

  const summary = document.getElementById("summary");
  summary.innerHTML = `<h3>결과 요약</h3>
    <p>총 문제: ${quizCount}</p>
    <p>맞춘 문제: ${correctCount}</p>
    <h4>작품별 출제 수:</h4>
    <ul>
      ${Object.entries(stats).map(([title, count]) => `<li>${title}: ${count}문제</li>`).join("")}
    </ul>
    <button onclick="startQuiz()">다시 시작</button>
  `;
  summary.style.display = "block";
}
