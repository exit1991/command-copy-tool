'use strict'

// 改行コードの指定
const lineBreakStr = '\n';

// 要素の取得
const elem = {
    'input-text': document.querySelector('#input-text')
   ,'exec-button': document.querySelector('#exec-button')
   ,'output-area': document.querySelector('#output-area')
}

// 検索ボタンがクリックした際の処理
elem['exec-button'].addEventListener('click', () => {
    
    const inputStr = elem['input-text'].value;
    
    const splitRegExp = new RegExp('^' + lineBreakStr, 'gm');
    const inputArr = inputStr.split(splitRegExp);
    console.log(inputArr); //debug
    
    const filterdInputArr = inputArr.filter(v => v !== '');
    console.log(filterdInputArr); //debug
    
    
    // 初期化
    elem['output-area'].innerHTML = '';
    let newElemCount = 0;
    
    filterdInputArr.forEach(oneBlock => {
        newElemCount += 1;
        
        const newElemDiv = document.createElement('div');
        const newElemPre = document.createElement('pre');
        const newElemCode = document.createElement('code');
        newElemCode.innerText = oneBlock;
        newElemCode.classList.add('command', newElemCount);
        
        const newElemButton = document.createElement('button');
        newElemButton.setAttribute('type', 'button');
        newElemButton.innerText = 'コピー';
        newElemButton.classList.add('copy', newElemCount);
        newElemButton.addEventListener('click', () => {
            commandCopy(newElemButton);
        });
        
        
        const newElemH2 = document.createElement('h2');
        newElemH2.innerText = newElemCount;
        
        newElemPre.appendChild(newElemCode);
        newElemDiv.appendChild(newElemH2);
        newElemDiv.appendChild(newElemButton);
        newElemDiv.appendChild(newElemPre);
        elem['output-area'].appendChild(newElemDiv);
    });
    
});


function commandCopy(copyButtonElem) {
    const classArr = copyButtonElem.className.split(' ');
    let targetNumberStr = '';
    classArr.forEach(className => {
        if (!isNaN(className)) {
            targetNumberStr = className;
        }
    });
    console.log(targetNumberStr); //debug
    const escapeStr = '\\3';
    const copyTargetElem = document.querySelector('.command.' + escapeStr + targetNumberStr);
    console.log(copyTargetElem); //debug
    let copyText = copyTargetElem.innerText;
    
    // 最後の改行を削除
    const replaceRegExp = new RegExp(lineBreakStr + '$', 'g');
    copyText = copyText.replace(replaceRegExp,'');
    console.log(copyText); //debug
    navigator.clipboard.writeText(copyText);
}
