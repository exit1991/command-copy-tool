-- SQLを実行する
SELECT
    T1.aaa,
    T1.bbb,
    T1.ccc,
    T2.ddd
FROM
    hoge1 T1
INNER JOIN
    fuga1 T2
ON
    T1.ccc = T2.ccc
WHERE
    T1.aaa = 'hogehoge'
ORDER BY
    T1.bbb DESC
;

-- SQLを実行する
SELECT
    T1.aaa,
    T1.bbb,
    T1.ccc,
    T2.ddd
FROM
    hoge2 T1
INNER JOIN
    fuga2 T2
ON
    T1.ccc = T2.ccc
WHERE
    T1.aaa = 'hogehoge'
ORDER BY
    T1.bbb DESC
;

-- SQLを実行する
SELECT
    T1.aaa,
    T1.bbb,
    T1.ccc,
    T2.ddd
FROM
    hoge3 T1
INNER JOIN
    fuga3 T2
ON
    T1.ccc = T2.ccc
WHERE
    T1.aaa = 'hogehoge'
ORDER BY
    T1.bbb DESC
;

