const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property(cc.Label)
    role: cc.Label = null;
    @property(cc.Label)
    title: cc.Label = null;
    @property(cc.Label)
    scene: cc.Label = null;

    @property(cc.JsonAsset)
    storyData: cc.JsonAsset = null;


    private Data = null;
    private part_index = 0;
    private chapter_index = 0;
    private storyNode_index = 0;
    private chapter = null;
    private storyNode = null;

    onLoad() {
        this.initData();
    }

    //初始化数据
    initData() {
        this.Data = this.storyData.json;
        this.chapter = this.Data[`chapter_${this.chapter_index}`];
        this.title.string = this.chapter.title;
        this.storyNode = this.chapter[`node_${this.storyNode_index}`];

        let string = this.storyNode[`part_${this.part_index}`].describe;
        this.stringAction(string, this.label)
    }

    touch_cb() {
        if (this.label.string != this.storyNode[`part_${this.part_index}`].describe) {
            this.label.node.stopAllActions();
            this.label.string = this.storyNode[`part_${this.part_index}`].describe
            return;
        }

        this.part_index++;
        let string = this.storyNode[`part_${this.part_index}`].describe;
        this.stringAction(string, this.label)
    }

    stringAction(_str: any, label: any) {

        this.scene.string = this.storyNode[`part_${this.part_index}`].scene;
        if (this.storyNode[`part_${this.part_index}`].role != "旁白") {
            this.role.string = this.storyNode[`part_${this.part_index}`].role + ":";
        } else {
            this.role.string = "";
        }

        let str = _str;
        let arr = [];
        this.label.string = "";
        let dty, cb;
        for (let i = 0; i < str.length; i++) {
            dty = cc.delayTime(0.05);
            cb = cc.callFunc(() => {
                this.label.string += str[i];
            })
            arr.push(dty, cb);
            if (i == str.length - 1) {
                this.label.node.runAction(cc.sequence(arr))
            }
        }
    }

}
