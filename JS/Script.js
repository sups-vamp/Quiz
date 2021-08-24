class Quiz {
  /**
   * @param  {string} tells which quiz are the functions invoked for
   */
  constructor(pos) {
    this.pos = pos;
    this.x = 0;
    this.y = 0;
    this.operator = "";
    this.flag = 0;
    this.question = "";
    this.incorrectAnswers = [];
    this.correctAnswers = [];
    this.questionCount = 0;
    this.score = 0;
  }

  /**
   * @param  {} --
   * @return  {} --
   * @description Evaluates the answers and displays the score
   */
  next() {
    this.flag = 0;
    const ans = document.getElementById(`answer-${this.pos}`).value;
    if (isNaN(ans)) {
      alert("Kindly enter a Valid Numeric value.");
    } else {
      this.questionCount++;
      switch (this.operator) {
        case "+":
          const sum = this.x + this.y;
          if (ans == sum) {
            this.flag = 1;
            break;
          }

        case "-":
          const diff = this.x - this.y;
          if (ans == diff) {
            this.flag = 1;
            break;
          }

        case "/":
          const div = this.x / this.y;
          if (ans == div) {
            this.flag = 1;
            break;
          }

        case "*":
          const pro = this.x * this.y;
          if (ans == pro) {
            this.flag = 1;
            break;
          }
      }
      if (!(ans === "") && this.flag) {
        this.score = this.score + 1;
        this.correctAnswers.push(`${this.question}, Answer: ${ans}`);
      } else {
        this.incorrectAnswers.push(this.question);
      }
      document.getElementById(
        `score-${this.pos}`
      ).innerHTML = `Your Score is : <b>${this.score}</b>`;
      document.getElementById(`answer-${this.pos}`).value = "";
      this.generateQuestions();
    }
  }

  /**
   * @param  {} --
   * @return  {} --
   * @description 1.Generates random arithmatic questions on basis of user input for no. of questions and range of numbers
   *              2.Displays the score at the end with a list of incorrect questions
   */
  generateQuestions() {
    if (
      this.questionCount < document.getElementById(`qcount-${this.pos}`).value
    ) {
      document.getElementById(`pre-quiz-${this.pos}`).style.display = "none";

      this.x = Math.floor(
        Math.random() *
          document.getElementById(`number-limit-${this.pos}`).value
      );
      this.y = Math.floor(
        Math.random() *
          document.getElementById(`number-limit-${this.pos}`).value
      );
      const operator_arr = ["+", "-", "/", "*"];
      this.operator = operator_arr[Math.floor(Math.random() * 3)];
      this.question = `<b>Question ${this.questionCount + 1} :</b> ${this.x} ${
        this.operator
      } ${this.y}`;
      document.getElementById(`quiz-questions-${this.pos}`).innerHTML =
        this.question;
    } else {
      document.getElementById(`quiz-time-${this.pos}`).style.display = "none";
      document.getElementById(
        `post-quiz-${this.pos}`
      ).innerHTML = `Thank you for attempting this test! <br> Here is your final score : <b>${
        this.score
      }/${document.getElementById(`qcount-${this.pos}`).value}<br>${
        this.incorrectAnswers.length > 0
          ? `<b><br><font color="red">Following are the questions you had answered incorrectly or left blank:<br>
      ${this.incorrectAnswers.map((i) => `<li>${i}</li>`).join("")}</font><br>`
          : ""
      }
      ${
        this.correctAnswers.length > 0
          ? `<font color="green">Following were the questions along with their answers which you answered correctly:<br>
      ${this.correctAnswers.map((i) => `<li>${i}</li>`).join("")}</font>`
          : ""
      }`;
    }
  }
}

//On Load
const q1 = new Quiz("one");
const q2 = new Quiz("two");
document.getElementById("quiz-time-one").style.display = "none";
document.getElementById("quiz-time-two").style.display = "none";

//works when quiz-1 button is clicked
function quiz1() {
  if (
    document.getElementById(`qcount-one`).value === "" ||
    document.getElementById(`number-limit-one`).value === ""
  ) {
    alert("Kindly fill the number of questions and range of numbers field");
  } else {
    q1.generateQuestions();
    document.getElementById("quiz-time-one").style.display = "block";
  }
}

//works when quiz-2 button is clicked
function quiz2() {
  if (
    document.getElementById(`qcount-two`).value === "" ||
    document.getElementById(`number-limit-two`).value === ""
  ) {
    alert("Kindly fill the number of questions and range of numbers field");
  } else {
    q2.generateQuestions();
    document.getElementById("quiz-time-two").style.display = "block";
  }
}

//works when quiz-1 next button is clicked
function next1() {
  q1.next();
}

//works when quiz-2 next button is clicked
function next2() {
  q2.next();
}
