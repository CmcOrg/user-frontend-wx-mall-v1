// 注意：【confirmFun】和【cancelFun】，如果是 http请求，则需要 return http 请求，如果不是 Promise，则在方法前面加 async，即可
// export function execConfirm(
//     confirmFun: () => Promise<void>,
//     cancelFun?: () => Promise<void>,
//     msg?: string
// ) {
//     const beforeClose = (action: Action) => new Promise<boolean>(async (resolve) => {
//         if (action === 'confirm') {
//             if (confirmFun) {
//                 return await confirmFun()
//                     .then(() => resolve(true))
//                     .catch(() => resolve(true))
//             }
//             return resolve(true)
//         } else {
//             if (cancelFun) {
//                 return await cancelFun()
//                     .then(() => resolve(true))
//                     .catch(() => resolve(true))
//             }
//             return resolve(true)
//         }
//     });
//     Dialog.confirm({
//         title: '提示',
//         message: msg || '确定执行操作？',
//         beforeClose
//     })
// }

export async function ShowLoading(title: string = '请求中') {
    await wx.showLoading({
        title,
        mask: false
    })
}

export function ToastError(title: string) {
    ShowToast(title)
}

export function ToastSuccess(title: string) {
    ShowToast(title, 'success')
}

export function ShowToast(title: string, icon: 'success' | 'loading' | 'none' = 'none', duration: number = 4000) {
    setTimeout(async () => {
        await wx.showToast({
            icon,
            title: title || 'title',
            duration
        })
    }, 30)
}
