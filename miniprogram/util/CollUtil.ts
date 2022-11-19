export default {
    // 是否为空
    isNotEmpty(arr?: any[]) {
        return arr && arr.length
    },
    // 是否不为空
    isEmpty(arr?: any[]) {
        return !(this.isNotEmpty(arr))
    },
    // 笛卡尔积：arr里面传入二维数组：[[],[],[]]，然后则会返回：[[,,],[,,],[,,],[,,]]
    descartes<T>(arr?: T[][]): any[] {
        if (this.isEmpty(arr)) {
            return [[]]
        }
        if (arr!.length < 2) {
            return [arr![0]] || [[]];
        }

        return arr!.reduce((previousValue, currentValue) => {
            let res: any[] = [];
            previousValue.forEach((item: any) => {
                currentValue.forEach((subItem: any) => {
                    if (item instanceof Array) {
                        res.push([...item, subItem]);
                    } else {
                        res.push([item, subItem]);
                    }
                })
            })
            return res;
        })
    }
}
