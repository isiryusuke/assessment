'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子要素を全て削除する
 * @param {HTMLElement} element HTML の要素
 */
function removeALLChildren(element) {
    while (element.firstChild) { //子要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前が空欄の時は終了
        return;
    }

    //診断結果表示エリア
    while (resultDivided.firstChild) { // 繰り返し診断ボタン押してもひとつだけ表示
        resultDivided.removeChild(resultDivided.firstChild);
    } 
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //ツイートエリア
    removeALLChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたのいいところ') +
        '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-botton';
    anchor.setAttribute('deta-text', result)
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    // Widgets.js の設定
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

};

const answers = [
    '{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}に見つめられた人は、気になって仕方ないでしょう。',
    '{userName}の情熱に周りの人は感化されます。',
    '{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}を多くの人が頼りにしています。',
    '{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}の洞察に、多くの人が助けられます。',
];

function assessment(userName) {
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName)
    return result;
}

//テストコード
console.assert(
    assessment('太郎') === '太郎を多くの人が頼りにしています。',
    '処理が正しくありません。'
);
