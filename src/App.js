import './App.css';
import { TextareaAutosize } from '@mui/base';
import Button from '@mui/material/Button';

import {useState} from "react";
import {Input, TextField} from "@mui/material";

function App() {

    const [calc, setCalc] = useState("");
    const [result, setResult] = useState("");
    const [fullHistory, historySaver] = useState("");
    const [debugValue, debugSaver] = useState("");


    const ops = ['/', '*', '+', '-'];
    const updateCalc = value => {
        if (ops.includes(value) && ops.includes(calc.slice(-1))) {
            setCalc(calc.replace(calc.slice(-1), value));
            return;
        }
        if (ops.includes(value) && calc === '') {
            return;
        }

        setCalc(calc + value);
        if (!ops.includes(value)) setResult(eval(calc + value).toString());
    }

    const createDigits = () => {
        const digits = [];

        for (let i = 0; i < 10; i++) {
            digits.push(<button
                onClick={() => updateCalc(i.toString())}
                key={i}>
                {i}
            </button>)
        }
        return digits;
    }

    const calculate = () => {
        historySaver(fullHistory.concat(" \n ")
            .concat(calc))
        setCalc(eval(calc).toString());
    }

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
                <TextField value={fullHistory}>
                    {fullHistory}
                </TextField>
            </div>
        </div>
    </div>);
}

export default App;
