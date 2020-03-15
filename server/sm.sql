#设置客户端连接服务器端编码
SET NAMES UTF8;
#如果存在，先丢弃
DROP DATABASE IF EXISTS sm;
#创建数据库，设置编码
CREATE DATABASE sm CHARSET=UTF8;
#进入创建的数据库
USE sm;

#建表 user
CREATE TABLE user (
    uid INT PRIMARY KEY AUTO_INCREMENT, #唯一id
    phone VARCHAR(11) UNIQUE,           #手机号
    upwd VARCHAR(60),                   #登录密码
    uname VARCHAR(12),                  #用户昵称
    sex BOOL DEFAULT 1,                 #性别，默认为男
    real_name VARCHAR(6),               #真实姓名
    birthday DATE,                      #生日
    city VARCHAR(20),                   #城市
    email VARCHAR(32),                  #邮箱
    say VARCHAR(64),                    #个性签名
    user_img VARCHAR(60) default '/image/user.png'               #用户头像
);
#修改自增列的起始值
ALTER TABLE user AUTO_INCREMENT=10000;


#首页轮播图一
CREATE TABLE index_swiper (
    img_url VARCHAR(64)
);

insert into index_swiper values('/image/swiper1.jpg');
insert into index_swiper values('/image/swiper2.jpg');
insert into index_swiper values('/image/swiper3.jpg');

#首页轮播图二
CREATE TABLE carousel_index2 (
    img_url VARCHAR(64)
);

insert into carousel_index2 values('/image/index/1.png');
insert into carousel_index2 values('/image/index/2.png');
insert into carousel_index2 values('/image/index/3.png');
insert into carousel_index2 values('/image/index/4.png');



/** 商家用户表 **/
CREATE TABLE cake_merchant(
  mid INT PRIMARY KEY AUTO_INCREMENT,
  mname VARCHAR(50),                                          #用户名
  phone VARCHAR(16),                                          #手机号(登陆的账号)
  mpwd VARCHAR(32),                                           #登陆密码
  avatar VARCHAR(128) DEFAULT "默认一张登陆后的头像",           #头像
  merchant_name VARCHAR(32),                                  #真实姓名
  gender INT,                                                 #性别  0-女  1-男
  shop VARCHAR(128)                                           #店铺
);

/** 商品表 **/
CREATE TABLE cake_product(
  pid INT PRIMARY KEY AUTO_INCREMENT,
  cid INT,                                                   #商品分类
  pname VARCHAR(128),                                        #商品名称
  price DECIMAL(10,2),                                       #最低价格
  pic VARCHAR(128),                                          #商品图片
  sales_volume INT,                                          #销售量
  read_num INT DEFAULT 0,                                    #用户阅览数
  shelf_time BIGINT,                                         #上架时间
  sold_out_time BIGINT,                                      #下架时间
  seq_state BOOLEAN                                          #销售状态(在销:1,下架:0)
);

/** 商品家族(分类) **/ 
CREATE TABLE cake_catalogue(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  cname VARCHAR(32),                                        #分类的名称
  series VARCHAR(32),                                       #属于的系列
  pic VARCHAR(128)                                          #系列图片

);

/** 商品规格 **/
CREATE TABLE cake_spec(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,                                                 #商品的id
  size VARCHAR(16),                                        #尺寸
  price DECIMAL(10,2),                                     #价格
  is_state VARCHAR(3),                                     #状态(预定:0,现货:1) -1:没有状态
  style VARCHAR(32),                                       #商品款式
  else_message VARCHAR(36),                                #其他的信息(其他无法归类的)
  repertory INT DEFAULT 0                                  #商品库存(默认0)
);

/** 图片表(商品详情的图片) **/
CREATE TABLE cake_pic(
  iid INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,                                                 #商品的id
  details_pic VARCHAR(128)                                         #图片
);

/** 购物车表 **/
CREATE TABLE cake_cart(
  gid INT PRIMARY KEY AUTO_INCREMENT,
  pid INT,                                                 #商品的id
  user_id INT,                                             #用户编号
  product_id INT,                                          #商品编号
  sid INT,                                                 #规格id
  count INT                                                #购买数量
);

/*收藏表*/
CREATE TABLE user_save(
  sid INT PRIMARY KEY AUTO_INCREMENT,
  uid INT, #用户id
  pid INT, #商品的id
  status BOOLEAN #状态 1-收藏 0-取消收藏
);

/**用户订单**/
CREATE TABLE cake_order(
oid INT PRIMARY KEY AUTO_INCREMENT,
user_id INT,             #用户编号
order_id BIGINT,        #订单编号
address_id INT,         #收货地址id
status INT,           #订单状态(1等待付款,2等待发货,3运输中,4已签收,5已取消)
order_time BIGINT,   #下单时间
pay_time BIGINT,     #付款时间
deliver_time BIGINT,    #发货时间
received_time BIGINT    #签收时间
);

/**用户订单**/
CREATE TABLE cake_order_detail(
did INT PRIMARY KEY AUTO_INCREMENT,
order_id BIGINT, #订单编号
user_id INT            #用户编号

);

-- /*订单表*/
-- CREATE TABLE orders(
--     oid INT PRIMARY KEY AUTO_INCREMENT,/*订单id*/
--     userId INT/*用户id*/
-- );
-- /**订单详情表**/
-- CREATE TABLE orders_detail(
--    odid INT PRIMARY KEY AUTO_INCREMENT,
--    orderId INT,                          /*订单编号*/
--    courseId INT,                       /*课程编号*/
--    count INT                            /*购买数量*/
-- );

/**收货地址信息**/
CREATE TABLE cake_receiver_address(
  aid INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,                                            #用户编号
  receiver VARCHAR(16),                                   #接收人姓名
  province VARCHAR(16),                                   #省
  city VARCHAR(16),                                       #市
  county VARCHAR(16),                                     #区
  country VARCHAR(16),                                    #县 
  areaCode VARCHAR(16),
  addressDetail VARCHAR(128),                             #详细地址
  cellphone VARCHAR(16),                                  #手机
  fixedphone VARCHAR(16),                                 #固定电话
  postcode VARCHAR(6),                                    #邮编
  tag VARCHAR(16),                                        #标签名
  is_default BOOLEAN                                      #是否为当前用户的默认收货地址
);
/** 首页轮播广告商品 **/
CREATE TABLE cake_index_carousel(
  cid INT PRIMARY KEY AUTO_INCREMENT,
  img VARCHAR(128),                                       #轮播图片
  title VARCHAR(64),                                      #标题
  pid INT                                                 #商品的id
);

/*用户历史搜索记录表*/
CREATE TABLE user_search(
iid INT PRIMARY KEY AUTO_INCREMENT,
uid INT, #用户id
pname VARCHAR(128) #用户搜索的数据
);

/** 商品表 **/
insert into cake_product values
(1,1,'新加坡进口 小熊草莓夹心饼干 50g',12.90,'/image/6c3b5d81eb86b462.jpg',0,0,1581389023093,NULL,1),
(2,1,'泰国进口 椰子日记 椰子味蛋卷80g',17.90,'/image/58e5ad63N18ac1503.jpg',0,105,1581389023093,NULL,1),
(3,1,'丹麦进口 曲奇饼干 年货礼盒装 908g',123.00,'/image/3bc5ad336950a156.jpg',0,199,1581389023093,NULL,1),
(4,1,'马来西亚进口 可芘什锦饼干 504g',45.00,'/image/d2351b3ee66cff2c.jpg',0,0,1581389023093,NULL,1),
(5,1,'印尼进口 丽芝士（Richeese） 威化饼干 200g/盒',9.90,'/image/5b051e8cNa2ad9dfb.jpg',0,75,1581389023093,NULL,1),
(6,1,'澳门永辉 农场鲜鸡蛋 传统手工蛋卷 经典铁盒 500g',59.80,'/image/5ae42e69N1bee85e5.jpg',0,188,1581389023093,NULL,1),
(7,1,'马来西亚进口 奶油苏打奶盐饼干 礼盒 500g',38.00,'/image/cbdd956ccbe88648.jpg',0,0,1581389023093,NULL,1),
(8,1,'英国进口 浆果夹心 酸奶涂层饼干178g',31.90,'/image/59dedb33N94b8fad6.jpg',0,187,1581389023093,NULL,1),
(9,1,'英国进口 麦维他卡氏 全麦芝麻饼干125g',18.90,'/image/5b7160d4N21fabb3f.jpg',0,143,1581389023093,NULL,1),
(41,1,'土耳其进口 麦维他 巧粒脆 麦丽素 双倍巧克力球80g',16.90,'/image/5b84bf38N92c1b29c.jpg',0,0,1581389023093,NULL,1),
(10,2,'玉兰油（OLAY）水感透白光塑护肤礼盒套装精华露9件套',469.90,'/image/0a60a200b3239573.jpg',0,0,1581389023093,NULL,1),
(11,2,'WIS玻尿酸面膜24片 深层补水保湿面膜男女护肤品套装礼盒',119.90,'/image/b5d5176a743e4297.jpg',0,0,1581389023093,NULL,1),
(12,2,'韩束 护肤品化妆品套装 墨菊补水润养礼盒八件套',239.90,'/image/2bb51aef7508fe6f.jpg',0,0,1581389023093,NULL,1),
(13,2,'碧欧泉男士水动力护肤品礼盒套装',980.00,'/image/6ff1fc073c5b3657.jpg',0,0,1581389023093,NULL,1),
(14,2,'HFP寡肽祛痘原液 保湿补水安瓶男女15ml',158.00,'/image/f49c674f0fa42e4d.jpg',0,0,1581389023093,NULL,1),
(15,2,'自然堂套装凝时鲜颜12件套 化妆品护肤品',498.00,'/image/9dc616880472fba6.jpg',0,0,1581389023093,NULL,1),
(16,2,'菲洛嘉 Filorga 柔滑亮泽面膜50ml',418.00,'/image/78c7d2e64e0ccaa2.jpg',0,0,1581389023093,NULL,1),
(17,2,'百雀羚套装 抗皱紧致补水护肤化妆品 肌初赋活致臻礼盒',429.00,'/image/1e968879bc9f87e1.jpg',0,178,1581389023093,NULL,1),
(18,2,'兰芝(LANEIGE)致美紧颜礼盒 护肤礼盒',569.00,'/image/ec06d0462b5ce35c.jpg',0,0,1581389023093,NULL,1),
(19,2,'HFP金盏花爽肤水清爽控油收缩毛孔补水保湿舒缓化妆水护肤品套装女男士180ml',120.00,'/image/fab4a71e771b1a07.jpg',0,0,1581389023093,NULL,1),
(20,3,'美享整切牛排10片进口S级牛肉微腌西冷菲力儿童牛扒 生鲜',178.00,'/image/18b7d29ff20e8dfc.jpg',0,0,1581389023093,NULL,1),
(21,3,'美国进口脐橙 一级钻石大果2kg定制礼盒装 单果重约190-240g',75.00,'/image/ca45cbf040ffc66f.jpg',0,112,1581389023093,NULL,1),
(22,3,'越南活冻黑虎虾 可扒大黑虎虾仁 14-18只/盒 净重400g',79.00,'/image/2080b513583ede1e.jpg',0,0,1581389023093,NULL,1),
(23,3,'液氮锁鲜四去免洗牛蛙 净重600g 3-4只 整只装 火锅烧烤食材',59.00,'/image/228de5e12a9c0e15.jpg',0,164,1581389023093,NULL,1),
(24,3,'顺丰空运 大凉山牛奶草莓5斤装 黔莓 非丹东99草莓 新鲜水果',200.00,'/image/5a66ec6cNcffffdb7.jpg',0,0,1581389023093,NULL,1),
(25,3,'智利进口车厘子 2磅礼盒装 果径约30-32mm 新鲜水果 年货礼盒',126.00,'/image/2017945720cd6ad4.jpg',0,0,1581389023093,NULL,1),
(26,3,'现货曙光泰国进口山竹 5斤 5A级 进口热带 新鲜水果京东生鲜',119.00,'/image/5ab0822dN5c5ea709.jpg',0,89,1581389023093,NULL,1),
(27,3,'玖原农珍 广西百香果3斤大果 新鲜水果单果55-100g',21.00,'/image/5a93c9f1N58bee867.jpg',0,0,1581389023093,NULL,1),
(28,3,'精品国产红心火龙果2.5kg装 单果400g-500g以上',58.00,'/image/f901f52a86bbad9d.jpg',0,0,1581389023093,NULL,1),
(29,3,'晋州长城 羊脂秋月·冰糖梨 净重5斤 新鲜水果',49.00,'/image/7fb9f24346d9257c.jpg',0,0,1581389023093,NULL,1),
(30,3,'泰国进口椰青 椰子 9个装 单果800g以上 赠送开椰器和吸管 ',149.00,'/image/1ed5328a2ef7e6ed.jpg',0,92,1581389023093,NULL,1),
(31,4,'西部数据(WD)紫盘 4TB SATA6Gb/s 64M 监控硬盘(WD40EJRX)',579.00,'/image/dd34b4c1bab90274.jpg',0,0,1581389023093,NULL,1),
(32,4,'华硕GTX1660-6G/240G游戏台式吃鸡电脑主机/DIY组装机',5499.00,'/image/28b5ae68880b1ff5.jpg',0,97,1581389023093,NULL,1),
(33,4,'科大讯飞翻译机3.0 多语种离线翻译器翻译棒 同声方言翻译笔出国旅游口语翻译',3499.00,'/image/1781e4b7c279bbec.jpg',0,0,1581389023093,NULL,1),
(34,4,'Beats X 蓝牙无线 入耳式耳机 带麦可通话 -桀骜黑红',749.00,'/image/50cb4e5ca4e77d9a.jpg',0,0,1581389023093,NULL,1),
(35,4,'戴尔（DELL）灵越7590 15.6英寸高性能合金本固态轻薄创意设计游戏笔记本电脑',8699.00,'/image/1c7959761961b042.jpg',0,0,1581389023093,NULL,1),
(36,4,'讯景（XFX）RX 5700 XT 8GB 海外三风扇版 2025MHz/14Gbps 256bit GDDR6 显卡',3099.00,'/image/f59bb7617dc9cdfc.jpg',0,0,1581389023093,NULL,1),
(37,4,'ARCTIC 导热硅脂（台式机笔记本CPU显卡散热硅胶/导热系数8.5W/MX-4/2g装）',24.00,'/image/5c0236d5N9c7a2895.jpg',0,0,1581389023093,NULL,1),
(38,4,'尼康（Nikon） D610机身 单反相机 入门级全画幅机身 d610',4899.00,'/image/5b7fc70cN8375576f.jpg',0,128,1581389023093,NULL,1),
(39,4,'HORI PS4/PS3 FPS PLUS游戏手柄 PS4-025 索尼playstation授权',3499.00,'/image/570591caN43acc1d5.jpg',0,156,1581389023093,NULL,1),
(40,4,'小度智能车载支架 标准版 百度旗下人工智能硬件 出风口车载支架 海量资源 黑灰色',59.00,'/image/e4000613c49dcec5.png',0,0,1581389023093,NULL,1)
;


/*商品规格*/
INSERT INTO cake_spec VALUE
(NULL,1,"小熊饼干咖啡礼盒限定版",139.00,1,NULL,NULL,97),
(NULL,1,"小熊饼干薄脆礼盒限定版",169.00,1,NULL,NULL,97),
(NULL,1,"双重巧克力",12.90,1,NULL,NULL,97),
(NULL,1,"草莓夹心",12.90,1,NULL,NULL,97),
(NULL,1,"奶油夹心",12.90,1,NULL,NULL,97),
(NULL,5,"巧克力夹心",12.90,1,NULL,NULL,97),
(NULL,5,"巧克力+奶油",12.90,1,NULL,NULL,97),
(NULL,5,"抹茶夹心",12.90,1,NULL,NULL,97),
(NULL,5,"椰子夹心",12.90,1,NULL,NULL,97),
(NULL,6,"原味80g",14.80,1,NULL,NULL,100),
(NULL,6,"榴莲味80g",14.80,1,NULL,NULL,100),
(NULL,6,"芋头味80g",14.80,1,NULL,NULL,100),
(NULL,7,"特产精品福礼礼盒500g",59.80,1,NULL,NULL,100),
(NULL,7,"奶油苏打500g",38.00,1,NULL,NULL,100);

/** 商品家族(分类) **/
INSERT INTO cake_catalogue VALUE
(1,"零食","进口食品","5bf3d773N9a00f2a0.jpg"),
(2,"美妆","美妆护肤","image/dc94b3804b4ad2a36495f41567fdd1c_39.png"),
(3,"生鲜","时令生鲜","image/5bf3d94bN936d950d.jpg"),
(4,"数码","电脑数码","image/dc94b3804b4ad2a36495f41567fdd1c_37.png");



