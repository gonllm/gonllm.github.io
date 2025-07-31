// PWA Service Worker登録
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// 電卓ロジック
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '0';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        if (this.currentOperand === '0') return;
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        if (this.currentOperand === '') {
            this.currentOperand = '0';
        }
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' && this.previousOperand !== '') {
            this.operation = operation;
            this.updateDisplay();
            return;
        }
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = this.formatNumber(computation);
        this.operation = undefined;
        this.previousOperand = '';
    }

    handleSpecial(type) {
        switch (type) {
            case 'AC':
                this.clear();
                break;
            case '+/-':
                if (this.currentOperand === '0' || this.currentOperand === '') return;
                this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
                break;
            case '%':
                 if (this.currentOperand === '0' || this.currentOperand === '') return;
                this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
                break;
        }
    }

    formatNumber(number) {
        // 指数表記や長すぎる小数を防ぐ
        if (Math.abs(number) > 1e12 || (Math.abs(number) < 1e-6 && Math.abs(number) > 0)) {
            return number.toExponential(2);
        }
        return parseFloat(number.toPrecision(12)).toString();
    }

    getDisplayNumber(number) {
        if (number === null || number === undefined) return '';
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');
const buttons = document.querySelectorAll('button');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;
        
        if (!isNaN(parseFloat(value)) || value === '.') {
            calculator.appendNumber(value);
        } else if (['+', '-', '×', '÷'].includes(value)) {
            calculator.chooseOperation(value);
        } else if (value === '=') {
            calculator.compute();
        } else if (['AC', '+/-', '%'].includes(value)) {
            calculator.handleSpecial(value);
        }
        calculator.updateDisplay();
    });
});
