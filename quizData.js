// 당신이 직접 문제를 추가하는 부분
const quizData = [
    {
      id: 1,
      title: "Les Misérables", // 작품명
      type: "가사",             // 문제 종류
      number: "Do You Hear the People Sing?", // 뮤지컬 넘버
      prompt: "Do you hear the people ____?", // 문제 문장 (빈칸 포함)
      answer: "sing"           // 정답
    },
    {
      id: 2,
      title: "Wicked",
      type: "대사",
      prompt: "Because I knew you, I have been changed for ____.",
      answer: "good"
    },
    {
      id: 3,
      title: "Hamilton",
      type: "가사",
      number: "My Shot",
      prompt: "I am not throwing away my ____.",
      answer: "shot"
    }
    // 문제는 이 형식대로 계속 추가하면 됩니다!
  ];
  