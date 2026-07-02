$(function () {
    /*=================================================
    ハンバーガ―メニュー
    ===================================================*/
    // ハンバーガーメニューをクリックした時
    $(".hamburger").on("click", function () {
        $("header").toggleClass("open");
    });
    // メニューのリンクをクリックした時
    $("nav a").on("click", function () {
        $("header").toggleClass("open");
    });


    /*=================================================
    スムーススクロール
    ===================================================*/
    // ページ内のリンクをクリックした時に動作する
    $('a[href^="#"]').click(function () {
        // クリックしたaタグのリンクを取得
        let href = $(this).attr("href");
        // ジャンプ先のid名をセット hrefの中身が#もしくは空欄なら,htmlタグをセット
        let target = $(href == "#" || href == "" ? "html" : href);
        // ページトップからジャンプ先の要素までの距離を取得
        let position = target.offset().top - $("header").outerHeight(); // ヘッダーの高さ分オフセット;
        // animateでスムーススクロールを行う   ページトップからpositionだけスクロールする
        // 600はスクロール速度で単位はミリ秒  swingはイージングのひとつ
        $("html, body").animate({ scrollTop: position }, 800, "swing");
        // urlが変化しないようにfalseを返す
        return false;
    });

    /*=================================================
    スクロール時フェード表示
    ===================================================*/
    // スクロール時のイベント

    $(window).on("scroll", function () {
        let scroll = $(this).scrollTop(); // 現在のスクロール位置
        let windowHeight = $(this).height(); // ウィンドウの高さ

        // `.section-title` を順番に処理
        $(".section-title").each(function () {
            let target = $(this).offset().top; // 要素の位置
            console.log("Scroll:", scroll, "Target:", target, "WindowHeight:", windowHeight); // デバッグ用

            // 要素が画面内に入ったらクラスを追加
            if (scroll > target - windowHeight + 150) {
                $(this).addClass("visible");
            }
        });
    });

    // 初期表示のチェック
    $(window).trigger("scroll");



    /*=================================================
    トップに戻る
    ===================================================*/
    let pagetop = $(".to-top");
    // 最初に画面が表示された時は、トップに戻るボタンを非表示に設定
    pagetop.hide();

    // スクロールイベント（スクロールされた際に実行）
    $(window).scroll(function () {
        // スクロール位置が700pxを超えた場合
        if ($(this).scrollTop() > 700) {
            // トップに戻るボタンを表示する
            pagetop.fadeIn();

            // スクロール位置が700px未満の場合
        } else {
            // トップに戻るボタンを非表示にする
            pagetop.fadeOut();
        }
    });

    // クリックイベント（ボタンがクリックされた際に実行）
    pagetop.click(function () {
        // 0.5秒かけてページトップへ移動
        $("body,html").animate({ scrollTop: 0 }, 500);

        // イベントが親要素へ伝播しないための記述
        return false;
    });


    /*=================================================
    （画面に表示されたタイミングで処理を実行）
    ===================================================*/

   
    /* info-card（できること） */
    // $(window).on("scroll", function () {
    //     const scroll = $(this).scrollTop();
    //     const windowHeight = $(this).height();

    //     $(".left").each(function () {
    //         const target = $(this).offset().top;

    //         if (scroll > target - windowHeight + 150) {
    //             $(this).addClass("slide-left");
    //         }
    //     });
    // });

    // /* info-card（順番に遅らせて表示） */
    // $(window).on("scroll", function () {
    //     const scroll = $(this).scrollTop();
    //     const windowHeight = $(this).height();

    //     $(".left").each(function (index) {
    //         const target = $(this).offset().top;

    //         if (scroll > target - windowHeight + 150) {
    //             const $el = $(this);

    //             // すでに表示済みなら何もしない
    //             if (!$el.hasClass("slide-left")) {
    //                 setTimeout(() => {
    //                     $el.addClass("slide-left");
    //                 }, index * 100); // ← 0.1秒ずつ遅らせる
    //             }
    //         }
    //     });
    // });

    /* info-card（順番に遅らせて表示） */
    $(window).on("scroll.infoCard", function () {
        const scroll = $(this).scrollTop();
        const windowHeight = $(this).height();

        $(".left").each(function (index) {
            const target = $(this).offset().top;
            const $el = $(this);

            if (scroll > target - windowHeight + 150) {
                // 1回だけ実行
                if (!$el.data("shown")) {
                    $el.data("shown", true);

                    setTimeout(() => {
                        $el.addClass("slide-left");
                    }, index * 100); // 0.1秒ずつ
                }
            }
        });
    });

    // 初期表示チェック
    $(window).trigger("scroll.infoCard");

    
/*=================================================
スクロール時アニメーション（高速化版）
==================================================*/
    $(window).on("scroll", function () {
        const scroll = $(this).scrollTop();
        const windowHeight = $(this).height();

        $(".section-title,.balloon").each(function () {
            const target = $(this).offset().top;

            if (scroll > target - windowHeight + 150) {
                // すでに付いていれば何もしない
                if (!$(this).hasClass("balloon-active") && $(this).hasClass("balloon")) {
                    $(this).addClass("balloon-active");
                } else {
                    // $(this).addClass("visible show slide-left slide-right");
                }
            }
        });
    });

    // 初期表示時にもチェック
    $(window).trigger("scroll");

});



