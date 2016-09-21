var vm;
var vmData = {
    //输入的数据源字符串
    inputStr: "",
    //去重后的数据源数组
    inputArr: [],
    //要摇号的数量
    randomCount: 0,
    outputStr: "",
    outputArr: []
};
var vmMethods = {
    /**
     * 校验并去重数据源字符串
     */
    inputValidate: function () {
        var arr = vm.inputStr.split(/,|，|\t|\r|\n|\r\n/).filter(function (n) { return n.length > 0; });
        vm.inputArr = unique(arr);
        vm.inputStr = vm.inputArr.join(",");
        vm.randomCount = vm.inputArr.length;
    },
    /**
     * 开始摇号
     */
    startRandom: function () {
        if (vm.randomCount > vm.inputArr.length) {
            alert("要摇号结果数量不能大于数据源数量");
            return;
        }
        var result = [];
        var rand = 0;
        while (result.length < vm.randomCount) {
            rand = Math.floor((Math.random() * vm.inputArr.length));
            if (result.indexOf(rand) == -1) {
                result.push(rand);
            }
        }
        vm.outputArr = result.map(function (n) { return vm.inputArr[n]; });
        vm.outputStr = vm.outputArr.join("\n");
    }
};
var vmComputed = {};
vm = new Vue({
    el: "#body",
    data: vmData,
    methods: vmMethods,
    components: vmComputed
});
/**
 * 数组去重
 *
 * @returns
 */
function unique(arr) {
    var n = [];
    for (var i = 0; i < arr.length; i++)
        if (n.indexOf(arr[i]) == -1)
            n.push(arr[i]);
    return n;
}
