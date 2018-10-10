Chrome Extension習作: パスワードフォームの内容を表示する
----------

## 概要

`manifest.json`で諸々の定義を行っている。

backgroud項に指定された`background.js`がボタンを押下した時の動作の記述となる。

今回であれば表示タブのページの改変を行うことが目的ではあるがが、
そういった操作はcontent_scripts項のものでしか行えない。

そこで`background.js`側からはリクエストの送出を行い、
`contentscript.js`がそれを受け取ると同時に目的の動作を行うようになっている。

