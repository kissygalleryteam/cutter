## Cutter

cutter是一款简单好看的图片四分割动画的组件，可以用在存在图片提示的场景中。

### 初始化组件

    S.use('kg/cutter/2.0.0/index', function (S, Cutter) {
         new Cutter(S.one('.selector'));
    });

## API说明

`new Cutter(node,options)`

### node

Node对象，可以是裸节点、或者选择器字符串

### options

配置项，JSON 格式，参数包括

- out_speed:移出速度，默认为0.3（秒）
- in_speed:移入速度，默认为0.5（秒）
- animout_easing:移出动画样式，默认为'bounceOut'

Too Simple...

> 该组件只依赖了node和anim，没有用base
