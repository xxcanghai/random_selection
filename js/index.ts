(function () {
    var vm: typeof vmData & typeof vmMethods & typeof vmComputed & vuejs.Vue;

    var vmData = {
        //输入的数据源字符串
        inputStr: "",
        //去重后的数据源数组
        inputArr: <string[]>[],
        //要摇号的数量
        randomCount: 0,
        outputStr: "",
        outputArr: <string[]>[]
    }
    var vmMethods = {
        /**
         * 校验并去重数据源字符串
         */
        inputValidate: function () {
            var arr: string[] = vm.inputStr.split(/,|，|\t|\r|\n|\r\n/).filter(n => n.length > 0);
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
            var result: number[] = [];
            var rand: number = 0;
            while (result.length < vm.randomCount) {
                rand = Math.floor((Math.random() * vm.inputArr.length));
                if (result.indexOf(rand) == -1) {
                    result.push(rand);
                }
            }
            vm.outputArr = result.map(n => vm.inputArr[n]);
            vm.outputStr = vm.outputArr.join("\n");
        }
    };

    var vmComputed = {

    };

    var ieMatch = navigator.userAgent.match(/MSIE ([\d.]+);/);
    if (ieMatch != null && parseFloat(ieMatch[1]) <= 8) {
        $("body").css("display","none");
        alert("请使用更高版本IE浏览器或谷歌浏览器访问本站点！");
        return;
    }

    vm = <any>new Vue({
        el: "#body",
        data: vmData,
        methods: <any>vmMethods,
        components: <any>vmComputed
    });

    /**
     * 数组去重
     * 
     * @returns
     */
    function unique<T>(arr: Array<T>): Array<T> {
        var n: Array<T> = [];
        for (var i = 0; i < arr.length; i++)
            if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
        return n;
    }
} ());