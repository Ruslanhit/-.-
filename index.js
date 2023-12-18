const inputOperation = document.querySelector('#input-operation')
const inputSubmit = document.querySelector('#input-submit')
const enterResult = document.querySelector('#result')

let primer
let arrNums = []
let arrOperation = []
let acc = ''
let oper = ['+', '-', '*', '/']

inputSubmit.onclick = funcForm

function funcForm() {
    primer = inputOperation.value
    sortNumAndAoperation()
    const resEnt = resultConnect(arrNums, arrOperation)
    enterResult.innerHTML = `Результат: ${resEnt}`
    inputOperation.value = ''
    arrNums = []
    arrOperation = []
}

function formPushArrCB(el, type = 'number') {
    type === 'number' ? arrNums.push({type, el,}) : arrOperation.push({type, el,})
}

function sortNumAndAoperation() {
    for(let i = 0; i <= primer.length - 1; i++){
        for(let a = 0; a <= 9; a++) if(primer[i] === `${a}`) acc += primer[i]
        for(let a = 0; a < oper.length; a++) {
            if(primer[i] === oper[a]){
                if(acc !== 0)formPushArrCB(+acc)
                formPushArrCB(primer[i], 'operator')
                acc = 0
            }
        }
        if(i === primer.length - 1){
            if(acc !== 0)formPushArrCB(+acc)
            acc = 0
        }
    }
}

function resultConnect(arr1, arr2) {
    let num1 = 0
    let num2 = 0
    let result = 0
    let accum = 0
    for(let i = 0; i <= arr1.length - 1; i++){
        if(i % 2 === 0) {
            num1 += arr1[i].el
            if(i !== 0 ) resultEnter(num1)
        }
        if(i % 2 !== 0) {
            num2 += arr1[i].el
            i === 1 ? resultEnter(num2, num1) : false
            i !== 1 ? resultEnter(num2) : false
            num1 = 0
            num2 = 0
        }
    }

    function resultEnter(num2, num1 = 0) {
        for(let i = 0; i <= arr2.length - 1; i++){
            if(arr2[i].el === '+') {
                if (num1 !== 0) accum = (num1 + num2)
                if (num1 === 0) accum = accum + num2
                result = accum
                arr2.splice(i, 1)
                break
            }
            if(arr2[i].el === '-') {
                if (num1 !== 0) accum = (num1 - num2)
                if (num1 === 0) accum = accum - num2
                result = accum
                arr2.splice(i, 1)
                break
            }
            if(arr2[i].el === '*') {
                if (num1 !== 0) accum = (num1 * num2)
                if (num1 === 0) accum = accum * num2
                result = accum
                arr2.splice(i, 1)        
                break
            }
            if(arr2[i].el === '/') {
                if (num1 !== 0) accum = (num1 / num2)
                if (num1 === 0) accum = accum / num2
                result = accum
                arr2.splice(i, 1)        
                break
            }
        }
    }
    return result
}