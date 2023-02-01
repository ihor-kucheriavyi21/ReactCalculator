import './App.css';
import Button from '@mui/material/Button';

import {useState} from "react";
import {TextField} from "@mui/material";

function App() {

    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");
    const [fullHistory, historySaver] = useState("");


    const ops = ['/', '*', '+', '-'];
    const updateCalc = value => {
        let valueIsOperation = ops.includes(value);
        if (valueIsOperation && ops.includes(calc.slice(-1))) {
            setCalc(calc.replace(calc.slice(-1), value));
            return;
        }
        if (valueIsOperation) {
            for (let i = 0; i < ops.length; i++) {
                if (calc.includes(ops[i])) {
                    calculateWithOperation(value);
                    return;
                }
            }
        }
        if (valueIsOperation && calc === '') {
            return;
        }

        setCalc(calc + value);
        if (!valueIsOperation) setResult(eval(calc + value).toString());
    }

    const createDigits = () => {
        const digits = [];

        for (let i = 0; i < 10; i++) {
            digits.push(
                <Button variant="contained"
                        onClick={() => updateCalc(i.toString())}
                        key={i}>
                    {i}
                </Button>)
        }
        return digits;
    }

    const calculate = () => {
        let isOnlyNumbersInString = /^\d+$/.test(calc);
        if (isOnlyNumbersInString || ops.includes(calc.slice(-1)) || calc.length === 0)
            return;
        historySaver(fullHistory.concat(calc)
            .concat(" = ")
            .concat(result)
            .concat("\n"))
        setCalc(result);
    }

    const calculateWithOperation = (operation) => {
        historySaver(fullHistory.concat(calc)
            .concat(" = ")
            .concat(result)
            .concat("\n"))
        setCalc(result.concat(operation));
    }

    //second task

    const handleClick = async () => {

            const response = await fetch("http://localhost:8080/math/examples?count=4")
                .then((response) => response.json())
            let allOperationInString ='';
            for (let i = 0; i < response.length; i++) {
                let calculationTwoNumbers = eval(response[i])
                allOperationInString = allOperationInString.concat(response[i])
                    .concat(" = ")
                    .concat(calculationTwoNumbers)
                    .concat("\n")
            }
            historySaver(fullHistory.concat(allOperationInString))
    };


    return (<div className="App">
        <div className="calculator">
            <div className="display">
                {result ? <span>({result})</span> : ''} &nbsp;
                {calc || "0"}
            </div>
            <div className="operators">

                <Button variant="contained" onClick={() => updateCalc('/')}>/</Button>
                <Button variant="contained" onClick={() => updateCalc('*')}>*</Button>
                <Button variant="contained" onClick={() => updateCalc('+')}>+</Button>
                <Button variant="contained" onClick={() => updateCalc('-')}>-</Button>
                <Button variant="contained" onClick={calculate}>=</Button>
            </div>
            <div className="digits">
                {createDigits()}
            </div>
            <div className="calcHistory">
                <TextField value={fullHistory} multiline={true}>
                    {fullHistory}
                </TextField>
            </div>
        </div>
        <div>
            <Button variant="contained" onClick={handleClick}>Отримати та вирішити приклади</Button>
        </div>
    </div>);
}

export default App;
