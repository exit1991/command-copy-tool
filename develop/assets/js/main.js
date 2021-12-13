'use strict'

// 改行コードの指定
const lineBreakStr = '\n';

// オプションデフォルト
let addAfterLineBreak = false;
let addBeforeLineBreak = false;
let beforeLineBreakCount = 0;

// 要素の取得
const elem = {
    'docText':           document.querySelector('#docText')
    ,'execButton':       document.querySelector('#execButton')
    ,'clearButton':      document.querySelector('#clearButton')
    ,'outputArea':       document.querySelector('#outputArea')
    ,'rdAddBefLnBrNo':   document.querySelector('#rdAddBefLnBrNo')
    ,'rdAddBefLnBrYes':  document.querySelector('#rdAddBefLnBrYes')
    ,'iptAddBefLnBrCnt': document.querySelector('#iptAddBefLnBrCnt')
}


elem['execButton'].addEventListener('click', () => {
    let inputStr = elem['docText'].value;
    
    // 最後に改行が含まれないテキストでは、
    // 「最後の改行を含めるコピー」の設定の際に改行が作れないため
    // あらかじめ最後に改行を付加する
    inputStr += lineBreakStr;
    
    // 空白行で分割させる
    const splitRegExp = new RegExp('^' + lineBreakStr, 'gm');
    const inputArr = inputStr.split(splitRegExp);
    const filterdInputArr = inputArr.filter(v => v !== '');
    // console.log(inputArr);
    // console.log(filterdInputArr);
    
    // ボタンとコピー対象を紐づけるためのクラス連番
    let newElemCount = 0;
    
    // コピーツールの初期化と組立
    elem['outputArea'].innerHTML = '';
    filterdInputArr.forEach(oneBlock => {
        newElemCount += 1;
        
        // １項目分要素
        const newElemDiv = document.createElement('div');
        newElemDiv.classList.add('command-grp');
        
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
        elem['outputArea'].appendChild(newElemDiv);
    });
});


elem['clearButton'].addEventListener('click', () => {
    elem['outputArea'].innerHTML = '';
});


elem['rdAddBefLnBrNo'].addEventListener('click', () => {
    elem['iptAddBefLnBrCnt'].setAttribute('disabled', '');
});

elem['rdAddBefLnBrYes'].addEventListener('click', () => {
    elem['iptAddBefLnBrCnt'].removeAttribute('disabled');
});


function commandCopy(copyButtonElem) {
    // コピーボタンに対応するコピー対象を判定させる
    const classArr = copyButtonElem.className.split(' ');
    let targetNumberStr = '';
    classArr.forEach(className => {if (!isNaN(className)) targetNumberStr = className});
    if (targetNumberStr === '') {
        alert('コピーできませんでした');
        return;
    }
    
    // 数字始まりのクラス名を querySelector する場合はクラス名エスケープが必要
    const escapeStr = '\\3';
    const copyTargetElem = document.querySelector('.command.' + escapeStr + targetNumberStr);
    let copyText = copyTargetElem.innerText;
    
    // 最初に改行を付加
    addBeforeLineBreak = document.addBefLnBr.rdAddBefLnBr[1].checked;
    beforeLineBreakCount = document.addBefLnBr.iptAddBefLnBrCnt.value;
    if (addBeforeLineBreak) {
        let beforeLineBreak = '';
        for (let i = 0; i < beforeLineBreakCount; i++) beforeLineBreak += lineBreakStr;
        copyText = beforeLineBreak + copyText;
    }
    
    // 最後の改行を削除
    addAfterLineBreak = document.addAftLnBr.rdAddAftLnBr[1].checked;
    if (!addAfterLineBreak) {
        const replaceRegExp = new RegExp(lineBreakStr + '$', 'g');
        copyText = copyText.replace(replaceRegExp, '');
    }
    
    navigator.clipboard.writeText(copyText);
}
