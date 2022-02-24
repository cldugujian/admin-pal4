/**
 * Created by Administrator on 2017/10/2.
 */

$(function () {

    /* 以下是全局变量 */
    var game = $(".game");          // 获取游戏区域

    /* 游戏尺寸 */
    (function () {

        game.heightAuto = function () {
            game.css({marginTop : ( innerHeight - 620 )/2});
        };
        // 设置游戏区域上下居中
        game.heightAuto();
        // 改变窗口大小时
        $(window).resize(function () {
            game.heightAuto();
        });

    })();

});

window.onload = function () {

    /* 以下是全局变量 */
    var game = $(".game");          // 获取游戏区域
    var scene = $(".scene");        // 获取场景
    var screen = $(".screen");      // 全屏遮罩

    // 加载完成时去掉加载封面
    $(".index-load").remove();

    /* 所有音效 */
    (function () {

        // 背景音乐初始音量
        var bgmusic = $(".audio-00")[0];
        bgmusic.volume = 0.2;

        // 点击音效
        var clickAudio = $(".audio-01");
        var clickAudioSrc = clickAudio.attr("src");
        $(".js-audio-click").click(function () {
            clickAudio
                .attr("src",clickAudioSrc)
                .trigger("play");
        });

        // 鼠标经过人物，人物发声
        $(".status-list").mouseenter(function () {
            var index = $(this).index();
            $(".audio-role")
                .attr("src","audio/role-0" + index +".mp3")
                .trigger("play");
        });

    })();

    /* 首页-载入场景 */
    (function () {

        var video = $(".video");

        // 初始化透明度
        scene.num = 0;
        // 透明度变化
        scene.fadeIn = function () {
            if( scene.num < 1 ){
                scene.num += 0.2;
            } else{
                scene.num = 1;
                clearInterval( scene.timer );
            }
            scene.children("img").last().animate({ opacity : scene.num });
        };

        scene.toggle = function () {
            // 删除视频
            $(".index-video").remove();
            // 播放音频
            $(".audio-00").trigger("play");
            // 场景淡入
            scene.children("img").first().animate({ opacity : 1 },0,function () {
                scene.timer = setInterval( function () {
                    scene.fadeIn();
                },10);
            });
        };

        // 显示跳过按钮
        $(".btn-skip").fadeIn();
        // 播放视频
        video.css({ opacity : 1 }).trigger("play");
        // 视频播放完毕时载入主场景
        video.bind("ended", function() {
            scene.toggle();
        });

        // 监听按键ESC
        $(document).keydown(function(event){
            // 按下ESC键载入主场景
            if( event.keyCode === 0X1B ) {
                scene.toggle();
            }
        });

        // 点击动画
        $(".scene").click(function () {
            scene.toggle();
        });

    })();

    /* 开场白 */
    (function () {

        function begin() {
            // 获取开场白外框
            var indexInfo = $(".index-info");
            // 获取开场白条目
            var indexInfoPara = $(".index-info>p");
            // 设置开关
            var flag = false;
            // 设置定时器----判断场景是否加载完毕
            indexInfo.timer = setInterval(function () {
                // 开关取决于场景是否加载完毕
                flag = scene.children("img").last().css("opacity") >= 0.99;
                // 如果加载完毕
                if( flag ){
                    // 清除判断的定时器
                    clearInterval(indexInfo.timer);
                    // 显示开场白外框
                    $(".index-info").fadeIn();
                    // 初始化开场白出现顺序
                    indexInfoPara.index = 0;
                    // 默认显示第一条
                    indexInfoChange();
                    // 设置定时器，1s切换一条
                    indexInfoPara.timer = setInterval(function () {
                        // 判断是否到了最后一条
                        if( indexInfoPara.index < indexInfoPara.length-1 ){
                            // 如果没到最后一条，则索引值+1
                            indexInfoPara.index ++;
                        }else{
                            // 如果到了最后一条,则清除定时器
                            clearInterval( indexInfoPara.timer );
                            // 开场白淡出
                            $(".index-info").fadeOut(300,function () {
                                // 删除开场
                                $(this).remove();
                                // 显示角色头像、当前区域和选项
                                $(".head,.area,.option").fadeIn(500);
                            });
                        }
                        // 切换开场白
                        indexInfoChange();
                    },2500);
                }
            },10);

            function indexInfoChange() {
                // 所有开场白隐藏
                indexInfoPara.fadeOut(0);
                // 显示当前开场白
                indexInfoPara.eq( indexInfoPara.index ).fadeIn();
            }
        }

        begin();

    })();

    /* 点击角色头像 */
    (function () {

        // 获取头像区域
        var head = $(".head");
        // 获取头像
        var headRole = $(".head-role");
        // 获取小头像
        var headItem = $(".head-queue-item");
        // 获取信息
        var headInfo = $(".head-info");
        // 获取头像照片
        var headImg = $(".head-role-icon>img");
        // 获取角色姓名
        var headRoleName = $(".head-role-name");
        // 获取角色hp数值
        var headInfoHp = $(".head-info-hp");
        // 获取角色hp数值
        var headInfoMp = $(".head-info-mp");
        // 获取角色hp数值
        var headInfoEp = $(".head-info-ep");
        // 获取角色当前hp槽
        var headBarHp = $(".head-info-bar-1");
        // 获取角色当前hp槽
        var headBarMp = $(".head-info-bar-2");
        // 获取角色当前hp槽
        var headBarEp = $(".head-info-bar-3");
        // 初始化索引值
        var index = 0;
        // 初始化当前角色
        var thisRole = "";

        headInfo.change = function () {
            // 设定为当前角色
            thisRole = role[ "role"+(index+1) ];
            // 改变头像图片
            headImg.attr( "src",thisRole.src );
            // 改变姓名
            headRoleName.html( thisRole.name );
            // 改变文字背景颜色
            headRoleName.css({background : thisRole.background});
            // 当前hp槽/最大hp槽
            headBarHp.css({width : thisRole.currentHp/thisRole.maxHp *100 + "%"});
            // 当前mp槽/最大mp槽
            headBarMp.css({width : thisRole.currentMp/thisRole.maxMp *100 + "%"});
            // 当前ep槽/最大ep槽
            headBarEp.css({width : thisRole.currentPower/thisRole.maxPower *100 + "%"});
            // 当前hp数值/最大hp数值
            headInfoHp.text( thisRole.currentHp + "/" + thisRole.maxHp );
            // 当前mp数值/最大mp数值
            headInfoMp.text( thisRole.currentMp + "/" + thisRole.maxMp );
            // 当前ep数值/最大ep数值
            headInfoEp.text( thisRole.currentPower + "/" + thisRole.maxPower );
        };

        head.change = function () {
            // 小头像移动
            for( var i=0; i<headItem.length; i++ ){
                headItem.eq(i).toggleClass( "head-queue-"+ (i+1) );
            }
            // 小头像缩放
            headItem.toggleClass("head-item-change");
            // 信息切换
            headInfo.toggleClass("scale-0");
        };

        headInfo.change();

        // 点击头像时
        headRole.click(function () {
            // 小头像切换
            head.change();
        });

        // 点击小头像时
        headItem.click(function () {
            // 获取当前索引值
            index = $(this).index();
            // 小头像切换
            head.change();
            // 信息变化
            headInfo.change();
        });

    })();

    /* 系统选项 */
    (function () {

        // 获取按钮
        var optionHead = $(".option-head");
        // 获取滚动条
        var optionBar = $(".option-bar");
        // 点击按钮时
        optionHead.click(function () {
            // 按钮切换选中
            optionHead.toggleClass("option-head-active");
            // 滚动条滚动
            optionBar.toggleClass("option-bar-active");
        });

    })();

    /* 五个选项选项 */
    (function () {

        // 获取区域
        var area = $(".area");
        // 获取文字
        var areaTxt = $(".area-txt");
        area
        // 鼠标移入时
            .mouseenter(function () {
                // 变宽
                area.stop().animate({ width : 300 },300,function () {
                    // 文字淡入
                    areaTxt.fadeIn(300);
                });
            })
            // 鼠标移出时
            .mouseleave(function () {
                // 变窄
                areaTxt.hide(0,function () {
                    // 文字淡出
                    area.stop().animate({ width : 160 },300);
                });
            });

    })();

    /* 点击状态 */
    (function () {

        // 获取选项菜单
        var option = $(".option-list");
        // 获取弹窗
        var optionFade = $(".option-fade");
        // 获取取消按钮
        var optionCancel = $(".option-fade-cancel");

        // 点击选项菜单时
        option.click(function () {
            // 获取当前目标
            var thisObj =  $(this);
            // 获取当前索引值
            var index = thisObj.index();
            // 显示全屏遮罩
            screen.fadeIn(300);
            // 选项
            thisObj
            // 当前选项菜单选中
                .addClass("option-list-active")
                // 其他选项菜单去除选中
                .siblings().removeClass("option-list-active");
            // 当前弹窗
            optionFade.eq(index)
                // 显示
                .show(0)
                // 淡入效果
                .stop().animate({opacity : 1, top:20},300)
                // 其他弹窗
                .siblings(".option-fade")
                // 隐藏
                .stop().css({opacity : 0, top:0, display : "none"});
        });

        // 点击取消按钮
        optionCancel.click(function () {
            // 获取当前目标
            var thisObj = $(this);
            // 当前对应的弹窗
            thisObj.parent(".option-fade")
            // 淡出效果
                .stop().animate({opacity : 0, top:0},300,function () {
                // 隐藏
                $(this).hide(0);
            });
            // 所有选项菜单去除选中状态
            option.removeClass("option-list-active");
            // 隐藏当前遮罩
            screen.fadeOut(300);
        });

    })();

    /* 物品栏 */
    (function () {

        // 获取导航
        var itemNavList = $(".item-nav-list");
        // 获取物品栏内容
        var itemBox = $(".item-box");
        // 获取物品
        var itemList = $(".item-list");
        // 获取当前对应的导航栏索引值
        var index = 0;

        // 初始化物品栏数据
        for( var j=0; j<4; j++ ){
            for( var i=0; i<itemAll[ "itemType"+(j+1) ].length; i++ ){
                // 获取当前物品的数据
                var itemData = itemAll[ "itemType" + (j+1) ][i];
                // 获取当前物品
                var itemCurrent = itemBox.eq(j).children(".item-list").eq(i);
                // 设置当前物品的图片路径
                itemCurrent.find("img").attr( "src",itemData.src );
                // 获取当前物品的数量
                itemCurrent.find(".item-count").html( "x" + itemData.count );
                // 获取当前物品的名称
                itemCurrent.find(".item-name").html( itemData.name );
            }
        }

        // 获取当前对应的物品栏索引值
        var currentIndex = 0;
        // 获取当前物品的名称
        var itemTitle = $(".item-title");
        // 获取当前对应物品的缩略图
        var itemThumb = $(".item-thumb img");
        // 获取当前对应物品的描述
        var description1 = $(".item-description-1 p");
        // 获取当前对应物品的功效
        var description2 = $(".item-description-2 p");

        // 默认显示第一栏第一个物品
        itemDataChange();

        // 点击导航时
        itemNavList.click(function () {
            // 获取当前对象
            var thisObj = $(this);
            // 获取当前导航栏索引值
            index = $(this).index();
            // 导航添加选中状态
            thisObj.addClass("item-nav-active").siblings().removeClass("item-nav-active");
            // 对应物品栏显示，其他隐藏
            itemBox.eq(index).show().siblings().hide();
            // 获取当前物品的索引值
            currentIndex = 0;
            // 数据变化
            itemDataChange();
        });

        // 鼠标经过物品时
        itemList.mouseenter(function () {
            // 获取当前物品的索引值
            currentIndex = $(this).index();
            // 数据变化
            itemDataChange();
        });

        function itemDataChange() {
            // 获取当前点击物品的数据
            var currentData = itemAll[ "itemType" + ( 1+index ) ][currentIndex];
            // 设置当前对应物品的名称
            itemTitle.text( currentData.name );
            // 设置当前对应物品的缩略图
            itemThumb.attr( "src", currentData.src );
            // 设置当前对应物品的描述
            description1.text( currentData.description1 );
            // 设置当前对应物品的功效
            description2.text( currentData.description2 );
        }

    })();

    /* 装备栏 */
    (function () {

        // 获取导航
        var equipNavList = $(".equip-nav-list");
        // 获取装备栏内容
        var equipBox = $(".equip-box");
        // 获取物品
        var equipList = $(".equip-box-list");
        // 获取当前对应的导航栏索引值
        var index = 0;

        // 获取当前对应的装备栏索引值
        var currentIndex = equipBox.eq(index).find(".equip-box-active").index();
        // 获取当前对应装备的缩略图
        var equipThumb = $(".equip-thumb img");
        // 获取当前对应装备的简介
        var description1 = $(".equip-description-1 p");
        // 获取当前对应装备的效果
        var description2 = $(".equip-description-2 p");

        // 初始化装备栏数据
        for( var j=0; j<4; j++ ){
            for( var i=0; i<equipAll[ "equipType"+(j+1) ].length; i++ ){
                // 获取当前装备的数据
                var equipData = equipAll[ "equipType" + (j+1) ][i];
                // 获取当前装备
                var equipCurrent = equipBox.eq(j).children(".equip-box-list").eq(i);
                // 获取当前装备的名称及效果
                equipCurrent
                    .find(".equip-box-name").html( equipData.name )
                    .siblings(".equip-box-effect").find("span").html( equipData.effect );
            }
        }

        // 初始化
        infoDataChange();
        equipDataChange();

        // 点击导航时
        equipNavList.click(function () {
            // 获取当前对象
            var thisObj = $(this);
            // 获取当前导航栏索引值
            index = $(this).index();
            // 点击的导航选中,其他导航取消选中
            thisObj.addClass("equip-nav-active").siblings().removeClass('equip-nav-active');
            // 当前装备栏显示,其他装备栏隐藏
            equipBox.eq(index).show().siblings().hide();
            // 获取当前装备的索引值
            currentIndex = equipBox.eq(index).find(".equip-box-active").index();
            // 数据变化
            equipDataChange();
        });

        // 点击装备时
        equipList.click(function () {
            // 切换选中
            $(this).addClass("equip-box-active").siblings().removeClass("equip-box-active");
            // 获取当前装备的索引值
            currentIndex = $(this).index();
            // 数据变化
            equipDataChange();
            // 底部信息
            infoDataChange();
        });

        function equipDataChange() {
            // 获取当前点击物品的数据
            var currentData = equipAll[ "equipType" + ( 1+index ) ][currentIndex];
            // 设置当前对应物品的缩略图
            equipThumb.attr( "src", currentData.src );
            // 获取当前对应装备的简介
            description1.text( currentData.description1 );
            // 获取当前对应装备的效果
            description2.text( currentData.description2 );
        }

        function infoDataChange() {
            // 属性值
            var attack = $(".equip-type-1").find(".equip-box-active span").html();
            var defense = 0;
            // 获取底部四个装备
            var equipUpList = $(".equip-up-list");
            // 给四个装备找到对应的装备名称
            for( var k=0; k<equipUpList.length; k++ ){
                var equipUpListTxt = $(".equip-box").eq(k).find(".equip-box-active").children(".equip-box-name").text();
                equipUpList.eq(k).find(".equip-up-name").html( equipUpListTxt );
                if( k!=0 ){
                    defense += parseFloat( $(".equip-box").eq(k).find(".equip-box-active span").html() );
                }
            }
            $(".equip-value-1").html( attack );
            $(".equip-value-2").html( defense );
        }

    })();

};