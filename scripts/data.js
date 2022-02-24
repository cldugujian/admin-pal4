/**
 * Created by Administrator on 2017/10/2.
 */


/* 以下是人物基本数据 */
var role = {

    role1 : {
        level : 1,
        maxHp : 130,
        maxMp : 70,
        maxPower : 100,
        currentHp : 120,
        currentMp : 60,
        currentPower : 90,
        attack :  40,
        defense : 25,
        speed : 60,
        name : "韩菱纱",
        spellAttack : 50,
        spellDefense : 20,
        background : "#63090e",
        src : "images/head-00.jpg"
    },
    role2 : {
        level : 1,
        maxHp : 160,
        maxMp : 60,
        maxPower : 100,
        currentHp : 110,
        currentMp : 55,
        currentPower : 94,
        attack :  50,
        defense : 30,
        speed : 100,
        name : "云天河",
        spellAttack : 30,
        spellDefense : 20,
        background : "#6e4633",
        src : "images/head-01.jpg"
    },
    role3 : {
        level : 1,
        maxHp : 120,
        maxMp : 80,
        maxPower : 100,
        currentHp : 72,
        currentMp : 50,
        currentPower : 80,
        attack :  30,
        defense : 25,
        speed : 80,
        name : "柳梦璃",
        spellAttack : 60,
        spellDefense : 30,
        background : "#41204c",
        src : "images/head-02.jpg"
    },
    role4 : {
        level : 1,
        maxHp : 140,
        maxMp : 70,
        maxPower : 100,
        currentHp : 140,
        currentMp : 70,
        currentPower : 100,
        attack :  45,
        defense : 30,
        speed : 70,
        name : "慕容紫英",
        spellAttack : 40,
        spellDefense : 20,
        background : "#465093",
        src : "images/head-03.jpg"
    }

};

/* 以下是物品数据 */
var itemAll = {

    itemType1: [

        {
            count: 5,
            name: "止血草",
            range: "single",
            type: "recovery",
            effect: "hp+100",
            src: "images/item-type1-00.png",
            description1: "山野之中常见的草药，对于治疗外伤有不错的疗效。",
            description2: "我方单体，恢复少量精"
        },
        {
            count: 5,
            name: "鼠儿果",
            range: "single",
            type: "recovery",
            effect: "mp+50",
            src: "images/item-type1-01.png",
            description1: "山野中常见的一种果实，可以提神醒脑。",
            description2: "我方单体，恢复少量精"
        },
        {
            count: 5,
            name: "还魂香",
            range: "single",
            type: "recovery",
            effect: "复活",
            src: "images/item-type1-02.png",
            description1: "秘制的奇香，据说能够起死回生。",
            description2: "我方单体，复活，恢复少量精"
        },
        {
            count: 0,
            name: "未知",
            range: "unknown",
            type: "unknown",
            effect: "未知",
            src: "unknown",
            description1: "未知",
            description2: "未知"
        }

    ],

    itemType2: [

        {
            count: 3,
            name: "噬魂硝",
            range: "multiple",
            type: "attack",
            effect: "mp-50",
            src: "images/item-type2-00.png",
            description1: "采百种毒草同硝石合练，其毒可令敌人元神立时溃散。",
            description2: "敌方全体，减神"
        },
        {
            count: 3,
            name: "地缚根",
            range: "single",
            type: "attack",
            effect: "speed-30%",
            src: "images/item-type2-01.png",
            description1: "从地底深处冒出的老根，拥有法力，能将人缠绕使其移动困难",
            description2: "敌方单体，速大降，3回合"
        },
        {
            count: 3,
            name: "碧磷砂",
            range: "single",
            type: "attack",
            effect: "hp-=30",
            src: "images/item-type2-02.png",
            description1: "用铁矿砂配以蛇毒炼制而成，在暗处便可见磷光闪烁。",
            description2: "敌方单体，中毒，3回合"
        },
        {
            count: 0,
            name: "未知",
            range: "unknown",
            type: "unknown",
            effect: "未知",
            src: "unknown",
            description1: "未知",
            description2: "未知"
        }

    ],

    itemType3: [

        {
            count: 3,
            name: "大力丸",
            range: "single",
            type: "assistant",
            effect: "attack+10%",
            src: "images/item-type3-00.png",
            description1: "用人参、龟鳖制成的药丸，能强身壮体。",
            description2: "我方单体，武略增，5回合"
        },
        {
            count: 3,
            name: "神行丸",
            range: "single",
            type: "assistant",
            effect: "speed+30%",
            src: "images/item-type3-01.png",
            description1: "神奇的药丸，能让人身轻如燕",
            description2: "我方单体，速略增，5回合"
        },
        {
            count: 3,
            name: "金蝉蜕",
            range: "single",
            type: "assistant",
            effect: "defense+10%",
            src: "images/item-type3-02.png",
            description1: "罕见的灵药，服用后能瞬间提高自身防御。",
            description2: "我方单体，防略增，5回合"
        },
        {
            count: 0,
            name: "未知",
            range: "unknown",
            type: "unknown",
            effect: "未知",
            src: "unknown",
            description1: "未知",
            description2: "未知"
        }

    ],

    itemType4: [

        {
            count: 1,
            name: "香炉",
            type: "mission",
            src: "images/item-type4-00.png",
            description1: "云天河用以给父亲上香的香炉。",
            description2: ""
        },
        {
            count: 1,
            name: "牌位",
            type: "mission",
            src: "images/item-type4-01.png",
            description1: "云天河支付'云天青'的牌位。",
            description2: ""
        },
        {
            count: 1,
            name: "古玉",
            type: "mission",
            src: "images/item-type4-02.png",
            description1: "晶莹剔透的古玉，荧光润泽，十分罕见，似乎蕴藏着一股神秘的力量。",
            description2: ""
        },
        {
            count: 0,
            name: "未知",
            range: "unknown",
            type: "unknown",
            effect: "未知",
            src: "unknown",
            description1: "未知",
            description2: "未知"
        }

    ]

};

/* 以下是装备数据 */
var equipAll = {

    equipType1 : [

        {
            name: "青铜剑",
            range: "single",
            type: "attack",
            effect: 18,
            src: "images/equip-type1-00.png",
            description1: "青铜熔铸而成的长剑，大巧若拙。",
            description2: "攻击力+18"
        },
        {
            name: "锋灵刃",
            range: "single",
            type: "attack",
            effect: 75,
            src: "images/equip-type1-01.png",
            description1: "剑锋犀利，有青光流溢，冰冷而又带几分雅致。",
            description2: "攻击力+75"
        },
        {
            name: "乌金剑",
            range: "single",
            type: "attack",
            effect: 70,
            src: "images/equip-type1-02.png",
            description1: "乌金打造的剑身，短小坚固。",
            description2: "攻击力+70"
        }

    ],

    equipType2 : [

        {
            name: "头巾",
            type: "defense",
            effect: 3,
            src: "images/equip-type2-00.png",
            description1: "普通的头饰。",
            description2: "防御力+3"
        },
        {
            name: "绸布方巾",
            type: "defense",
            effect: 5,
            src: "images/equip-type2-01.png",
            description1: "青铜熔铸而成的长剑，大巧若拙。",
            description2: "防御力+5"
        }

    ],

    equipType3 : [

        {
            name: "长袍",
            type: "defense",
            effect: 5,
            src: "images/equip-type3-00.png",
            description1: "普通的衣服。",
            description2: "防御力+5"
        }

    ],

    equipType4 : [

        {
            name: "长靴",
            type: "defense",
            effect: 3,
            src: "images/equip-type4-00.png",
            description1: "普通的鞋。",
            description2: "攻击力+3"
        }

    ]

};