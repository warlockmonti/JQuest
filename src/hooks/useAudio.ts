import { useCallback, useRef, useState } from 'react';

// ─── Pre-generated VoiceVox audio map ───────────────────────────────────────
// Maps every Japanese string to its corresponding .wav file in /public/audio/
// To add new strings: generate the wav, add to public/audio/, add entry here.
const AUDIO_MAP: Record<string, string> = {
    'Welcome to JQuest Japanese Tutor': '001.wav',
    'Mサイズをください。': '002.wav',
    'あ': '003.wav',
    'あした': '004.wav',
    'あなた': '005.wav',
    'あなたは誰？': '006.wav',
    'あなたは？': '007.wav',
    'あの': '008.wav',
    'あのひとはだれですか？': '009.wav',
    'あり': '010.wav',
    'ありがとう': '011.wav',
    'ありがとうございます！': '012.wav',
    'ありがとう！': '013.wav',
    'い': '014.wav',
    'いい': '015.wav',
    'いいえ': '016.wav',
    'いいえ、けっこうです。': '017.wav',
    'いいえ、だいじょうぶです。': '018.wav',
    'いいえ、ちがいます。': '019.wav',
    'いいえ、ふたりです。': '020.wav',
    'いいえ、見ているだけです。': '021.wav',
    'いいえ！': '022.wav',
    'いたし': '023.wav',
    'いただき': '024.wav',
    'いただきます！': '025.wav',
    'います': '026.wav',
    'いらっしゃいませ！おひとりですか？': '027.wav',
    'いらっしゃいませ！ご注文は？': '028.wav',
    'う': '029.wav',
    'うそをつくな！': '030.wav',
    'うるさい！': '031.wav',
    'うれしい': '032.wav',
    'え': '033.wav',
    'お': '034.wav',
    'おいしい！': '035.wav',
    'おい！お前は誰だ？': '036.wav',
    'おげんき': '037.wav',
    'おげんきですか？': '038.wav',
    'おなか': '039.wav',
    'おなかがぺこぺこです。': '040.wav',
    'おねがい': '041.wav',
    'おはよう': '042.wav',
    'おはようございます。': '043.wav',
    'おはようございます！': '044.wav',
    'おはよう！': '045.wav',
    'おんがく': '046.wav',
    'おんがくをきいてください。': '047.wav',
    'お前こそ誰だ！': '048.wav',
    'お前より上手だ！': '049.wav',
    'お砂糖はいりますか？': '050.wav',
    'お腹': '051.wav',
    'お腹が空きました。': '052.wav',
    'お風呂': '053.wav',
    'お風呂に入ります。': '054.wav',
    'か': '055.wav',
    'が': '056.wav',
    'く': '426.wav',
    'け': '427.wav',
    'げ': '428.wav',
    'がんばれ！': '057.wav',
    'き': '058.wav',
    'きいて': '059.wav',
    'ください': '060.wav',
    'げんき': '061.wav',
    'げんきです': '062.wav',
    'こ': '063.wav',
    'ここ': '064.wav',
    'ここはどこですか？': '065.wav',
    'こそ': '066.wav',
    'こちら': '067.wav',
    'こちらこそよろしく！': '068.wav',
    'こちらこそ！': '069.wav',
    'この国のことが好きか？': '070.wav',
    'こんにちは、おげんきですか？': '071.wav',
    'こんにちは！': '072.wav',
    'こんにちは！天気がいいですね。': '073.wav',
    'こんばん': '074.wav',
    'こんばんは！': '075.wav',
    'こ＋に＋ち＋は ＝ こんにちは！': '076.wav',
    'ご': '077.wav',
    'ございます': '078.wav',
    'ごちそうさま': '079.wav',
    'ごちそうさまでした！': '080.wav',
    'ごめん': '081.wav',
    'ごめんなさい。': '082.wav',
    'ごめんなさい！': '083.wav',
    'ご注文はお決まりですか？': '084.wav',
    'さ': '085.wav',
    'さようなら。': '086.wav',
    'さようなら！': '087.wav',
    'し': '088.wav',
    'して': '089.wav',
    'しました': '090.wav',
    'します': '091.wav',
    'しません': '092.wav',
    'しませんでした': '093.wav',
    'じ': '094.wav',
    'ず': '429.wav',
    'す': '095.wav',
    'すき': '096.wav',
    'すしが大好きです！': '097.wav',
    'すみ': '098.wav',
    'すみません！': '099.wav',
    'する': '100.wav',
    'せ': '101.wav',
    'そ': '102.wav',
    'そう': '103.wav',
    'そうですね。とても気持ちいいです。': '104.wav',
    'そうですね！': '105.wav',
    'ぞ': '106.wav',
    'た': '107.wav',
    'だ': '108.wav',
    'だいじょうぶ': '109.wav',
    'だいじょうぶですか？': '110.wav',
    'だれ': '111.wav',
    'ち': '112.wav',
    'ちがいます': '113.wav',
    'つ': '430.wav',
    'て': '114.wav',
    'で': '115.wav',
    'でした': '116.wav',
    'です': '117.wav',
    'ですか': '118.wav',
    'と': '119.wav',
    'とう': '120.wav',
    'とても': '121.wav',
    'とても好きです。文化が素晴らしい。': '122.wav',
    'ど': '123.wav',
    'どう': '124.wav',
    'どういたしまして！': '125.wav',
    'どうぞ': '126.wav',
    'どうぞよろしく！': '127.wav',
    'どうぞ！': '128.wav',
    'どうでもいい。': '129.wav',
    'どこ': '130.wav',
    'どこかお探しですか？': '131.wav',
    'どこですか？': '132.wav',
    'な': '133.wav',
    'なさい': '134.wav',
    'なにかお探しですか？': '135.wav',
    'なまえ': '136.wav',
    'なりました': '137.wav',
    'に': '138.wav',
    'には': '139.wav',
    'ぬ': '431.wav',
    'ぬるい': '140.wav',
    'ね': '141.wav',
    'の': '142.wav',
    'は': '143.wav',
    'はい': '144.wav',
    'はい、お願いします。': '145.wav',
    'はい、げんきです。': '146.wav',
    'はい、げんきです。ありがとう！': '147.wav',
    'はい、げんきです！': '148.wav',
    'はい、そうです。': '149.wav',
    'はい、ひとりです。': '150.wav',
    'はい、シャツを探しています。': '151.wav',
    'はい、少しですが話せます。': '152.wav',
    'はい、新宿駅はどこですか？': '153.wav',
    'はい！': '154.wav',
    'はじめ': '155.wav',
    'はじめまして': '156.wav',
    'はじめまして、わたしです。': '157.wav',
    'はじめまして！': '158.wav',
    'ひ': '432.wav',
    'ひと': '159.wav',
    'ふ': '433.wav',
    'へ': '160.wav',
    'へや': '161.wav',
    'へやはどこですか？': '162.wav',
    'ぺ': '434.wav',
    'ぺこぺこ': '163.wav',
    'ほ': '435.wav',
    'ま': '164.wav',
    'まあまあです。': '165.wav',
    'まして': '166.wav',
    'ます': '167.wav',
    'ません': '168.wav',
    'また': '169.wav',
    'またあした！': '170.wav',
    'またね！': '171.wav',
    'み': '172.wav',
    'みず': '173.wav',
    'む': '436.wav',
    'みずがぬるいです。': '174.wav',
    'むり': '175.wav',
    'め': '176.wav',
    'も': '177.wav',
    'もう一度言ってください。': '178.wav',
    'もう少し待ってください。': '179.wav',
    'や': '437.wav',
    'ゆ': '438.wav',
    'ゆっくり': '180.wav',
    'ゆっくりしてください。': '181.wav',
    'よ': '182.wav',
    'ようかいをたおせ！': '183.wav',
    'よろしく': '184.wav',
    'よろしくおねがいします。': '185.wav',
    'よろしくおねがいします！': '186.wav',
    'ら': '187.wav',
    'らく': '188.wav',
    'らくにしてください。': '189.wav',
    'り': '190.wav',
    'りかいすることがたいせつです。': '191.wav',
    'る': '439.wav',
    'れ': '440.wav',
    'ろ': '192.wav',
    'わ': '193.wav',
    'わかりません。': '194.wav',
    'わたし': '195.wav',
    'わたしにはむりです。': '196.wav',
    'わたしのなまえです。': '197.wav',
    'わたしはとてもうれしいです！': '198.wav',
    'わたしはケンです。': '199.wav',
    'わたしは日本へ行きます。': '200.wav',
    'わたしもそうです。': '201.wav',
    'を': '202.wav',
    'ん': '203.wav',
    'ア': '441.wav',
    'イ': '442.wav',
    'ウ': '443.wav',
    'エ': '444.wav',
    'オ': '445.wav',
    'カ': '446.wav',
    'キ': '447.wav',
    'ク': '448.wav',
    'ケ': '449.wav',
    'コ': '450.wav',
    'アイス': '204.wav',
    'アイスがすきです。': '205.wav',
    'エレベーター': '206.wav',
    'エレベーターはここです。': '207.wav',
    'オレンジ': '208.wav',
    'オレンジをください。': '209.wav',
    'ケン': '210.wav',
    'コーヒーをください。': '211.wav',
    'サイズはおいくつですか？': '212.wav',
    'スペイン': '213.wav',
    'スペインのひとです。': '214.wav',
    'トイレ': '215.wav',
    'トイレはどこですか。': '216.wav',
    'トイレはどこですか？': '217.wav',
    'ラーメンが好きです。': '218.wav',
    '一緒に': '219.wav',
    '一緒に遊びましょう。': '220.wav',
    '丸まっています': '221.wav',
    '亻': '222.wav',
    '仕事': '223.wav',
    '仕事が終わりました。': '224.wav',
    '休': '225.wav',
    '休み': '226.wav',
    '休みました': '227.wav',
    '休みます': '228.wav',
    '休みません': '229.wav',
    '休みませんでした': '230.wav',
    '休む': '231.wav',
    '会いました': '232.wav',
    '会います': '233.wav',
    '会いません': '234.wav',
    '会いませんでした': '235.wav',
    '会う': '236.wav',
    '会社': '237.wav',
    '入ります': '238.wav',
    '勉強': '239.wav',
    '名前': '240.wav',
    '名前を書いてください。': '241.wav',
    '咲きました': '242.wav',
    '天気': '243.wav',
    '天気がいいです。': '244.wav',
    '好きな食べ物は何ですか？': '245.wav',
    '富士山': '246.wav',
    '富士山に登ります。': '247.wav',
    '寝ました': '248.wav',
    '寝ます': '249.wav',
    '寝ません': '250.wav',
    '寝ませんでした': '251.wav',
    '寝る': '252.wav',
    '寿司': '253.wav',
    '帰りました': '254.wav',
    '帰りましょう': '255.wav',
    '帰ります': '256.wav',
    '帰りません': '257.wav',
    '帰りませんでした': '258.wav',
    '帰る': '259.wav',
    '帽子': '260.wav',
    '帽子を被ります。': '261.wav',
    '彼': '262.wav',
    '待ちました': '263.wav',
    '待ちます': '264.wav',
    '待ちません': '265.wav',
    '待ちませんでした': '266.wav',
    '待つ': '267.wav',
    '忘れました': '268.wav',
    '持ちました': '269.wav',
    '持ちます': '270.wav',
    '持ちません': '271.wav',
    '持ちませんでした': '272.wav',
    '持つ': '273.wav',
    '新宿は3番線です。乗り換えが必要です。': '274.wav',
    '日': '275.wav',
    '日本': '276.wav',
    '日本語': '277.wav',
    '日本語が話せると思っているのか？': '278.wav',
    '日本語を勉強しています。': '279.wav',
    '明': '280.wav',
    '明日': '281.wav',
    '暗く': '282.wav',
    '書いてください': '283.wav',
    '書きました': '284.wav',
    '書きます': '285.wav',
    '書きません': '286.wav',
    '書きませんでした': '287.wav',
    '書く': '288.wav',
    '月': '289.wav',
    '木': '290.wav',
    '本を読みます。': '291.wav',
    '来ました': '292.wav',
    '来ます': '293.wav',
    '来ません': '294.wav',
    '来ませんでした': '295.wav',
    '来る': '296.wav',
    '桜': '297.wav',
    '桜が咲きました。': '298.wav',
    '泳ぎましょう': '299.wav',
    '海': '300.wav',
    '海で泳ぎましょう。': '301.wav',
    '猫': '302.wav',
    '猫が丸まっています。': '303.wav',
    '登ります': '304.wav',
    '私はすしを食べます。': '305.wav',
    '私はただの旅人です。': '306.wav',
    '空': '307.wav',
    '空が暗くなりました。': '308.wav',
    '空きました': '309.wav',
    '窓': '310.wav',
    '窓を開けてください。': '311.wav',
    '終わりました': '312.wav',
    '美味しい': '313.wav',
    '美味しいを食べたい。': '314.wav',
    '聞きました': '315.wav',
    '聞きます': '316.wav',
    '聞きません': '317.wav',
    '聞きませんでした': '318.wav',
    '聞く': '319.wav',
    '脱ぎます': '320.wav',
    '行きました': '321.wav',
    '行きます': '322.wav',
    '行きません': '323.wav',
    '行きませんでした': '324.wav',
    '行く': '325.wav',
    '被ります': '326.wav',
    '見ました': '327.wav',
    '見ます': '328.wav',
    '見ません': '329.wav',
    '見ませんでした': '330.wav',
    '見る': '331.wav',
    '話しました': '332.wav',
    '話します': '333.wav',
    '話しません': '334.wav',
    '話しませんでした': '335.wav',
    '話す': '336.wav',
    '読みました': '337.wav',
    '読みます': '338.wav',
    '読みません': '339.wav',
    '読みませんでした': '340.wav',
    '読む': '341.wav',
    '財布': '342.wav',
    '財布を忘れました。': '343.wav',
    '買いました': '344.wav',
    '買います': '345.wav',
    '買いません': '346.wav',
    '買いませんでした': '347.wav',
    '買う': '348.wav',
    '起きました': '349.wav',
    '起きます': '350.wav',
    '起きません': '351.wav',
    '起きませんでした': '352.wav',
    '起きる': '353.wav',
    '車': '354.wav',
    '車で会社へ行きます。': '355.wav',
    '遊びました': '356.wav',
    '遊びましょう': '357.wav',
    '遊びます': '358.wav',
    '遊びません': '359.wav',
    '遊びませんでした': '360.wav',
    '遊ぶ': '361.wav',
    '醤油ラーメンをください。': '362.wav',
    '開けてください': '363.wav',
    '靴': '364.wav',
    '靴を脱ぎます。': '365.wav',
    '食べたい': '366.wav',
    '食べました': '367.wav',
    '食べます': '368.wav',
    '食べません': '369.wav',
    '食べませんでした': '370.wav',
    '食べる': '371.wav',
    '飲みました': '372.wav',
    '飲みます': '373.wav',
    '飲みません': '374.wav',
    '飲みませんでした': '375.wav',
    '飲む': '376.wav',
    '高いですね！': '377.wav',
    '高尾山': '378.wav',
    '青い空が見えます。': '379.wav',
    '青い': '380.wav',
    '赤い': '381.wav',
    '白い': '382.wav',
    '黒い': '383.wav',
    '庭に猫がいます。': '384.wav',
    '犬': '385.wav',
    'とり': '386.wav',
    'さかな': '387.wav',
    '山へ登りたいです。': '388.wav',
    '山': '389.wav',
    '川': '390.wav',
    '速く行きます。': '391.wav',
    '今日は静かです。': '392.wav',
    '静か': '393.wav',
    'にぎやか': '394.wav',
    'きれい': '395.wav',
    'ひま': '396.wav',
    '日本語を話します。': '397.wav',
    '英語': '398.wav',
    '中国語': '399.wav',
    '韓国語': '400.wav',
    '私はすしを食べて水を飲みます。': '401.wav',
    '私は': '402.wav',
    'すしを': '403.wav',
    '食べて': '404.wav',
    '水を': '405.wav',
    '刀で切ります。': '406.wav',
    '刀': '407.wav',
    '剣': '408.wav',
    '空手ですね。': '409.wav',
    '空手': '410.wav',
    '柔道': '411.wav',
    '障子を閉めます。': '412.wav',
    '障子': '413.wav',
    '神社を守ります。': '414.wav',
    '神社': '415.wav',
    '寺': '416.wav',
    '俳句を読みます。': '417.wav',
    '俳句': '418.wav',
    '和歌': '419.wav',
    '狐火が見えます。': '420.wav',
    '狐火': '421.wav',
    '焚火': '422.wav',
    '火遁、豪火球の術！': '423.wav',
    '豪火球': '424.wav',
    '水龍': '425.wav',
    // ── Kana example words (generated 2026-02-25 via VOICEVOX ID 13) ──────────
    'こんにちは': '529.wav',
    'こえ': '530.wav',
    'ほん': '531.wav',
    'にほん': '532.wav',
    'にく': '533.wav',
    'ちかてつ': '534.wav',
    'ちず': '535.wav',
    'はな': '536.wav',
    'わかる': '537.wav',
    'さようなら': '538.wav',
    'さくら': '539.wav',
    'よる': '540.wav',
    'なつ': '541.wav',
    'うみ': '542.wav',
    'らいねん': '543.wav',
    'おちゃ': '544.wav',
    'あいさつ': '545.wav',
    'りかい': '546.wav',
    'りんご': '547.wav',
    'ともだち': '548.wav',
    'とけい': '549.wav',
    'がんばって': '550.wav',
    'がっこう': '551.wav',
    'いただきます': '552.wav',
    'えと': '553.wav',
    'えき': '554.wav',
    'でも': '555.wav',
    'でんわ': '556.wav',
    'すみません': '557.wav',
    'すし': '558.wav',
    'かえる': '559.wav',
    'かに': '560.wav',
    'ごめんなさい': '561.wav',
    'ごはん': '562.wav',
    'げすいどう': '563.wav',
    'じかん': '564.wav',
    'じしょ': '565.wav',
    'めがね': '566.wav',
    'めいわく': '567.wav',
    'まあまあ': '568.wav',
    'まど': '569.wav',
    'しつれい': '570.wav',
    'しごと': '571.wav',
    'けっこうです': '572.wav',
    'けむり': '573.wav',
    'てがみ': '574.wav',
    'てら': '575.wav',
    'きもち': '576.wav',
    'きつね': '577.wav',
    'たべる': '578.wav',
    'たのしい': '579.wav',
    'つかれました': '580.wav',
    'つき': '581.wav',
    'ずっと': '582.wav',
    'ずこう': '583.wav',
    'ほんとう': '584.wav',
    'ほし': '585.wav',
    'わたしも': '586.wav',
    'もち': '587.wav',
    'くるま': '588.wav',
    'おやすみ': '589.wav',
    'やさしい': '590.wav',
    'みんな': '591.wav',
    'ゆめ': '592.wav',
    'るす': '593.wav',
    'そうですね': '594.wav',
    'そら': '595.wav',
    'せんせい': '596.wav',
    'せなか': '597.wav',
    'どうぞよろしく': '598.wav',
    'ぞう': '599.wav',
    'へんじ': '600.wav',
    'のり': '601.wav',
    'ぬの': '602.wav',
    'ひかり': '603.wav',
    'ろく': '604.wav',
    'ろうか': '605.wav',
    'むし': '606.wav',
    'ふつう': '607.wav',
    'ふゆ': '608.wav',
    'れんしゅう': '609.wav',
    'れい': '610.wav',
    'ねがい': '611.wav',
    'ねこ': '612.wav',
    'ぺらぺら': '613.wav',
    'ぺん': '614.wav',
    'アフリカ': '615.wav',
    'インク': '616.wav',
    'インド': '617.wav',
    'ウエーター': '618.wav',
    'ウイスキー': '619.wav',
    'エアコン': '620.wav',
    'オートバイ': '621.wav',
    'カメラ': '622.wav',
    'カナダ': '623.wav',
    'キロ': '624.wav',
    'ケーキ': '625.wav',
    'クラス': '626.wav',
    'クリニック': '627.wav',
    'コーヒー': '628.wav',
    'おねがいをする': '629.wav',
    'なまえのかき': '136.wav',
    'るーむ': '161.wav',
    '私はがくせいです。': '630.wav',
    'いぬがきた。': '631.wav',
    'りんごをたべる。': '632.wav',
    'とうきょうにいく。': '633.wav',
    'バスでいく。': '634.wav',
    'わたしのほん。': '635.wav',
    'わたしはとうきょうにいく。': '636.wav',
    'とうきょう': '637.wav',
    'いく': '638.wav',
    'すしをたべる。': '639.wav',
    'がっこうにいく。': '640.wav',
    // ─── Expansion: Dakuon Chars (641-655) ───
    'ぎ': '641.wav', 'ぐ': '642.wav', 'ざ': '643.wav', 'ぜ': '644.wav', 'ぢ': '645.wav',
    'づ': '646.wav', 'ば': '647.wav', 'び': '648.wav', 'ぶ': '649.wav', 'べ': '650.wav',
    'ぼ': '651.wav', 'ぱ': '652.wav', 'ぴ': '653.wav', 'ぷ': '654.wav', 'ぽ': '655.wav',
    // ─── Expansion: Dakuon Words (656-685) ───
    'ぎんこう': '656.wav', 'かぎ': '657.wav', 'ぐんま': '658.wav', 'かぐ': '659.wav',
    'ざっし': '660.wav', 'ひざ': '661.wav', 'ぜんぜん': '662.wav', 'かぜ': '663.wav',
    'はなぢ': '664.wav', 'ちぢむ': '665.wav', 'つづく': '666.wav', 'てづくり': '667.wav',
    'ばんごう': '668.wav', 'そば': '669.wav', 'びじゅつ': '670.wav', 'てび': '671.wav',
    'ぶんか': '672.wav', 'あぶない': '673.wav', 'べんきょう': '674.wav', 'たべもの': '675.wav',
    'ぼうし': '676.wav', 'たぼう': '677.wav', 'ぱん': '678.wav', 'かっぱ': '679.wav',
    'ぴかぴか': '680.wav', 'えんぴつ': '681.wav', 'ぷんぷん': '682.wav', 'てんぷら': '683.wav',
    'ぽすと': '684.wav', 'さんぽ': '685.wav',
    // ─── Expansion: Yoon Chars (686-721) ───
    'きゃ': '686.wav', 'きゅ': '687.wav', 'きょ': '688.wav', 'しゃ': '689.wav', 'しゅ': '690.wav',
    'しょ': '691.wav', 'ちゃ': '692.wav', 'ちゅ': '693.wav', 'ちょ': '694.wav', 'にゃ': '695.wav',
    'にゅ': '696.wav', 'にょ': '697.wav', 'ひゃ': '698.wav', 'ひゅ': '699.wav', 'ひょ': '700.wav',
    'みゃ': '701.wav', 'みゅ': '702.wav', 'みょ': '703.wav', 'りゃ': '704.wav', 'りゅ': '705.wav',
    'りょ': '706.wav', 'ぎゃ': '707.wav', 'ぎゅ': '708.wav', 'ぎょ': '709.wav', 'じゃ': '710.wav',
    'じゅ': '711.wav', 'じょ': '712.wav', 'ぢゃ': '713.wav', 'ぢゅ': '714.wav', 'ぢょ': '715.wav',
    'びゃ': '716.wav', 'びゅ': '717.wav', 'びょ': '718.wav', 'ぴゃ': '719.wav', 'ぴゅ': '720.wav',
    'ぴょ': '721.wav',
    // ─── Expansion: Yoon Words (722-753) ───
    'きゃく': '722.wav', 'きゅうり': '723.wav', 'きょう': '724.wav', 'しゃしん': '725.wav',
    'しゅくだい': '726.wav', 'しょくどう': '727.wav', 'ちゅうごく': '728.wav', 'ちょこ': '729.wav',
    'こんにゃく': '730.wav', 'にゅうがく': '731.wav', 'にょろにょろ': '732.wav', 'ひゃく': '733.wav',
    'ひゅうひゅう': '734.wav', 'ひょう': '735.wav', 'みゃく': '736.wav', 'みゅーじあむ': '737.wav',
    'みょうじ': '738.wav', 'りゃく': '739.wav', 'りゅう': '740.wav', 'りょこう': '741.wav',
    'ぎゃく': '742.wav', 'ぎゅうにゅう': '743.wav', 'ぎょえ': '744.wav', 'じゃあ': '745.wav',
    'じゅんび': '746.wav', 'じょおう': '747.wav',
    'びゃく': '751.wav', 'びゅんびゅん': '752.wav', 'びょうき': '753.wav',
    'ぴゃく': '754.wav', 'ぴゅあ': '755.wav', 'ぴょんぴょん': '756.wav',
    // ─── Expansion: Sentences (757-772) ───
    'ぎんこうはどこですか？': '757.wav', 'ざっしをよみます。': '758.wav', 'ばんごうをおねがいします。': '759.wav',
    'ばんごうはごです。': '760.wav', 'きょうはいいてんきです。': '761.wav', 'きょうはげんきです。': '762.wav',
    'しゃしんをとります。': '763.wav', 'しゅくだいをします。': '764.wav', 'りょこうにいきます。': '765.wav',
    'ぎゅうにゅうをのみます。': '766.wav', 'じゅんびができました。': '767.wav', 'じゃあ、いきましょう。': '768.wav',
    'ひゃくえんですか？': '769.wav', 'びょうきですか？': '770.wav', 'びょうきです。': '771.wav',
    'おめでとうございます！': '772.wav', 'またあいましょう！': '773.wav',
    'あそこ': '774.wav',
    'えきはあそこです。': '775.wav',
    'まちがえました': '776.wav',
    'ごめんなさい。まちがえました。': '777.wav',
    // ─── Additional Hiragana Mappings for Spellbook population ───
    'にわにねこがいます。': '384.wav',
    'ねこがまるまっています。': '303.wav',
    'わたしはがくせいです。': '630.wav',
    'ごはんができました。': '562.wav',
    'めがねはどこですか？': '132.wav',
    'しごとがあります。': '571.wav',
    'まどをあけてください。': '311.wav',
    'てがみをかいてください。': '574.wav',
    'つきがきれいです。': '581.wav',
    'ほんとうにほんとうですか？': '584.wav',
    'もちがだいすきです！': '587.wav',
    'くるまはそこです。': '588.wav',
    'へやはひろいです。': '161.wav',
    'それはむりです！': '175.wav',
    'ふつうです。': '607.wav',
    'にほんごがぺらぺらです！': '613.wav',
    // ── World 2: Verb Patterns (820-864) ─────────────────────────────────────
    '食べて、寝ます。': '820.wav',
    '飲んで、行きます。': '821.wav',
    '読んで、書きます。': '822.wav',
    '聞いて、話します。': '823.wav',
    '見て、帰ります。': '824.wav',
    '来て、食べます。': '825.wav',
    '行って、帰ります。': '826.wav',
    '食べてもいいですか？': '827.wav',
    '読んでもいいですか？': '828.wav',
    '行ってもいいですか？': '829.wav',
    '見てもいいですか？': '830.wav',
    '話してもいいですか？': '831.wav',
    '食べたいです。': '832.wav',
    '飲みたいです。': '833.wav',
    '行きたいです。': '834.wav',
    '見たいです。': '835.wav',
    '帰りたいです。': '836.wav',
    '話したいです。': '837.wav',
    'すしを食べたいです。': '838.wav',
    '日本語を話したいです。': '839.wav',
    '音楽を聞きながら、勉強します。': '840.wav',
    '食べながら、話します。': '841.wav',
    '歩きながら、見ます。': '842.wav',
    '聞きながら、書きます。': '843.wav',
    '読みながら、飲みます。': '844.wav',
    '日本語を話すことができます。': '845.wav',
    '食べることができます。': '846.wav',
    '読むことができます。': '847.wav',
    '書くことができます。': '848.wav',
    '聞くことができます。': '849.wav',
    '見ることができます。': '850.wav',
    '今日は何をしたいですか？': '851.wav',
    '日本語を勉強したいです。': '852.wav',
    '毎日何をしますか？': '853.wav',
    '毎日日本語を勉強します。': '854.wav',
    '昨日は何をしましたか？': '855.wav',
    '本を読みました。': '856.wav',
    '週末は何をしますか？': '857.wav',
    '友達と遊びます。': '858.wav',
    '日本語を話すことができますか？': '859.wav',
    'はい、少し話すことができます。': '860.wav',
    'かいじゅうをたおします！': '861.wav',
    'まいにちたべます。': '862.wav',
    'きのうはたべませんでした。': '863.wav',
    'にほんごをはなします！': '864.wav',
};

export const useAudio = () => {
    const [japaneseVoice] = useState<SpeechSynthesisVoice | null>(null);
    // Track currently playing audio so we can interrupt it
    const currentAudioRef = useRef<HTMLAudioElement | null>(null);

    const play = useCallback((text: string, _rate: number = 0.85): Promise<void> => {
        return new Promise((resolve) => {
            if (!text) { resolve(); return; }

            const filename = AUDIO_MAP[text];
            if (!filename) {
                console.warn('[useAudio] No audio file for:', text.slice(0, 30));
                resolve();
                return;
            }

            // Stop any currently playing audio before starting new one
            if (currentAudioRef.current) {
                currentAudioRef.current.pause();
                currentAudioRef.current.currentTime = 0;
                currentAudioRef.current = null;
            }

            const audio = new Audio(`/audio/${filename}`);
            currentAudioRef.current = audio;

            audio.onended = () => {
                currentAudioRef.current = null;
                resolve();
            };
            audio.onerror = (e) => {
                console.warn('[useAudio] Failed to play:', filename, e);
                currentAudioRef.current = null;
                resolve();
            };
            audio.play().catch((e) => {
                console.warn('[useAudio] audio.play() rejected:', e);
                currentAudioRef.current = null;
                resolve();
            });
        });
    }, []);

    const playClick = useCallback(() => {
        const run = async () => {
            try {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (!AudioContextClass) return;
                const ctx = new AudioContextClass();
                if (ctx.state === 'suspended') await ctx.resume();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const now = ctx.currentTime;
                osc.type = 'square';
                osc.frequency.setValueAtTime(987.77, now);
                osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.1);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(now + 0.3);
                setTimeout(() => ctx.close(), 500);
            } catch (e) {
                console.warn("Audio click failed", e);
            }
        };
        run();
    }, []);

    const playSuccess = useCallback(() => {
        const run = async () => {
            try {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (!AudioContextClass) return;
                const ctx = new AudioContextClass();
                if (ctx.state === 'suspended') await ctx.resume();
                const now = ctx.currentTime;
                const playNote = (freq: number, start: number, duration: number) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, start);
                    gain.gain.setValueAtTime(0.1, start);
                    gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(start);
                    osc.stop(start + duration);
                };
                playNote(523.25, now, 0.2);
                playNote(659.25, now + 0.1, 0.2);
                playNote(783.99, now + 0.2, 0.4);
                setTimeout(() => ctx.close(), 1000);
            } catch (e) {
                console.warn("Audio success failed", e);
            }
        };
        run();
    }, []);

    const playError = useCallback(() => {
        const run = async () => {
            try {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (!AudioContextClass) return;
                const ctx = new AudioContextClass();
                if (ctx.state === 'suspended') await ctx.resume();
                const now = ctx.currentTime;

                const osc1 = ctx.createOscillator();
                const osc2 = ctx.createOscillator();
                const gain = ctx.createGain();

                osc1.type = 'sawtooth';
                osc2.type = 'square';

                // Discordant low notes
                osc1.frequency.setValueAtTime(150, now);
                osc2.frequency.setValueAtTime(160, now);

                osc1.frequency.exponentialRampToValueAtTime(100, now + 0.2);
                osc2.frequency.exponentialRampToValueAtTime(105, now + 0.2);

                gain.gain.setValueAtTime(0.15, now);
                gain.gain.linearRampToValueAtTime(0, now + 0.3);

                osc1.connect(gain);
                osc2.connect(gain);
                gain.connect(ctx.destination);

                osc1.start(now);
                osc2.start(now);
                osc1.stop(now + 0.3);
                osc2.stop(now + 0.3);

                setTimeout(() => ctx.close(), 500);
            } catch (e) {
                console.warn("Audio error sound failed", e);
            }
        };
        run();
    }, []);

    const playGoldEarned = useCallback(() => {
        const run = async () => {
            try {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (!AudioContextClass) return;
                const ctx = new AudioContextClass();
                if (ctx.state === 'suspended') await ctx.resume();
                const now = ctx.currentTime;

                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = 'sine';

                // Classic coin sound: rapid pitch jump
                osc.frequency.setValueAtTime(987.77, now); // B5
                osc.frequency.setValueAtTime(1318.51, now + 0.08); // E6

                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
                gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now);
                osc.stop(now + 0.5);

                setTimeout(() => ctx.close(), 600);
            } catch (e) {
                console.warn("Audio gold sound failed", e);
            }
        };
        run();
    }, []);

    const playLevelUp = useCallback(() => {
        const run = async () => {
            try {
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (!AudioContextClass) return;
                const ctx = new AudioContextClass();
                if (ctx.state === 'suspended') await ctx.resume();
                const now = ctx.currentTime;

                const playNote = (freq: number, start: number, duration: number, isLast = false) => {
                    const osc = ctx.createOscillator();
                    const gain = ctx.createGain();
                    osc.type = 'square';

                    osc.frequency.setValueAtTime(freq, start);

                    gain.gain.setValueAtTime(0, start);
                    gain.gain.linearRampToValueAtTime(0.1, start + 0.05);
                    if (isLast) {
                        gain.gain.exponentialRampToValueAtTime(0.01, start + duration);
                    } else {
                        gain.gain.linearRampToValueAtTime(0, start + duration);
                    }

                    osc.connect(gain);
                    gain.connect(ctx.destination);
                    osc.start(start);
                    osc.stop(start + duration + (isLast ? 0.5 : 0));
                };

                // C major arpeggio fanfare
                playNote(523.25, now, 0.15);       // C5
                playNote(659.25, now + 0.15, 0.15); // E5
                playNote(783.99, now + 0.3, 0.15);  // G5
                playNote(1046.50, now + 0.45, 0.6, true);   // C6

                setTimeout(() => ctx.close(), 1500);
            } catch (e) {
                console.warn("Audio level up failed", e);
            }
        };
        run();
    }, []);

    return {
        play,
        playClick,
        playSuccess,
        playError,
        playGoldEarned,
        playLevelUp,
        hasVoice: !!japaneseVoice,
        hasAudio: (text: string) => !!AUDIO_MAP[text]
    };
};
