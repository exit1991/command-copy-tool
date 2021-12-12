'use strict'

// 改行コードの指定
const lineBreakStr = '\n';
let deleteEndLineBreak = true;

// 要素の取得
const elem = {
    'input-text':    document.querySelector('#input-text')
    ,'exec-button':  document.querySelector('#exec-button')
    ,'clear-button': document.querySelector('#clear-button')
    ,'output-area':  document.querySelector('#output-area')
}


elem['exec-button'].addEventListener('click', () => {
    let inputStr = elem['input-text'].value;
    
    // 最後に改行が含まれないテキストでは、
    // 「最後の改行を含めるコピー」の設定の際に改行が作れないため
    // あらかじめ最後に改行を付加する
    inputStr += lineBreakStr;
    
    // 空白行で分割させる
    const splitRegExp = new RegExp('^' + lineBreakStr, 'gm');
    const inputArr = inputStr.split(splitRegExp);
    const filterdInputArr = inputArr.filter(v => v !== '');
    console.log(inputArr);
    console.log(filterdInputArr);
    
    // ボタンとコピー対象を紐づけるためのクラス連番
    let newElemCount = 0;
    
    // コピーツールの初期化と組立
    elem['output-area'].innerHTML = '';
    filterdInputArr.forEach(oneBlock => {
        newElemCount += 1;
        
        // １項目分要素
        const newElemDiv = document.createElement('div');
        
        // コピー対象となる要素
        const newElemPre = document.createElement('pre');
        const newElemCode = document.createElement('code');
        newElemCode.innerText = oneBlock;
        newElemCode.classList.add('command', newElemCount);
        
        // コピーボタン要素
        const newElemButton = document.createElement('button');
        newElemButton.setAttribute('type', 'button');
        newElemButton.innerText = 'コピー';
        newElemButton.classList.add('copy', newElemCount);
        newElemButton.addEventListener('click', () => commandCopy(newElemButton));
        
        // 連番表示要素
        const newElemH2 = document.createElement('h2');
        newElemH2.innerText = newElemCount;
        
        newElemPre.appendChild(newElemCode);
        const divAppendElems = [newElemH2, newElemButton, newElemPre];
        divAppendElems.forEach(elem => newElemDiv.appendChild(elem));
        elem['output-area'].appendChild(newElemDiv);
    });
});


elem['clear-button'].addEventListener('click', () => {
    elem['output-area'].innerHTML = '';
});


function commandCopy(copyButtonElem) {
    // コピーボタンに対応するコピー対象を判定させる
    const classArr = copyButtonElem.className.split(' ');
    let targetNumberStr = '';
    classArr.forEach(className => {if (!isNaN(className)) targetNumberStr = className});
    if (targetNumberStr === '') {alert('コピーできませんでした'); return;}
    
    // 数字始まりのクラス名を querySelector する場合はクラス名エスケープが必要
    const escapeStr = '\\3';
    const copyTargetElem = document.querySelector('.command.' + escapeStr + targetNumberStr);
    let copyText = copyTargetElem.innerText;
    
    // 最後の改行を削除
    if (deleteEndLineBreak) {
        const replaceRegExp = new RegExp(lineBreakStr + '$', 'g');
        copyText = copyText.replace(replaceRegExp, '');
    }
    
    navigator.clipboard.writeText(copyText);
}
