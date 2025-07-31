@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap');

:root {
    --bg-color: #222831;
    --display-bg-color: #2a323c;
    --btn-bg-color: #393e46;
    --btn-special-bg-color: #4f5660;
    --btn-operator-bg-color: #00adb5;
    --btn-equal-bg-color: #f9a826;
    --text-color: #eeeeee;
}

*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    -webkit-tap-highlight-color: transparent; /* スマホでのタップ時のハイライトを消す */
}

.calculator {
    width: 100%;
    max-width: 360px;
    background-color: var(--display-bg-color);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
}

.display {
    background-color: var(--display-bg-color);
    color: var(--text-color);
    padding: 30px 20px;
    text-align: right;
    min-height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    word-wrap: break-word;
    word-break: break-all;
}

.previous-operand {
    font-size: 1.5rem;
    color: rgba(238, 238, 238, 0.6);
    height: 30px;
}

.current-operand {
    font-size: 3rem;
    font-weight: 400;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
}

button {
    border: none;
    background-color: var(--btn-bg-color);
    color: var(--text-color);
    font-size: 1.5rem;
    font-weight: 300;
    padding: 25px 0;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

button:active {
    background-color: rgba(255, 255, 255, 0.2);
    transform: scale(0.98);
}

.btn-special {
    background-color: var(--btn-special-bg-color);
}

.btn-operator {
    background-color: var(--btn-operator-bg-color);
}

.btn-operator[data-value="="] {
    background-color: var(--btn-equal-bg-color);
}

.btn-zero {
    grid-column: span 2;
}
