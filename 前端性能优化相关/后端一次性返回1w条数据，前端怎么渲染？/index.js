// index.js

// 请求函数
const getList = () => {
    return new Promise((resolve, reject) => {
        //步骤一:创建异步对象
        var ajax = new XMLHttpRequest();
        //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数
        ajax.open('get', 'http://127.0.0.1:8000');
        //步骤三:发送请求
        ajax.send();
        //步骤四:注册事件 onreadystatechange 状态改变就会调用
        ajax.onreadystatechange = function () {
            if (ajax.readyState == 4 && ajax.status == 200) {
                //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
                resolve(JSON.parse(ajax.responseText))
            }
        }
    })
}

// 获取container对象
const container = document.getElementById('container')

// *方法一：直接渲染。 --- 耗时大概600ms
// const renderList = async () => {
//     console.time('列表时间')
//     const list = await getList()
//     list.forEach(item => {
//         const div = document.createElement('div')
//         div.className = 'sunshine'
//         div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
//         container.appendChild(div)
//     })
//     console.timeEnd('列表时间')
// }


// *方法二：setTimeout分页渲染。 --- 耗时大概200ms
// const renderList = async () => {
//     console.time('列表时间')
//     const list = await getList()
//     const total = list.length;
//     const page = 0;
//     const limit = 200;
//     const totalPage = Math.ceil(total / limit);
//     const render = (page) => {
//         if (page >= totalPage) return;
//         setTimeout(() => {
//             for (let i = page * limit; i < page * limit + limit && i < total; i++) {
//                 const item = list[i]
//                 const div = document.createElement('div')
//                 div.className = 'sunshine'
//                 div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
//                 container.appendChild(div);
//             }
//             render(page + 1);
//         }, 0)
//     }
//     render(page);
//     console.timeEnd('列表时间')
// }


// *方法三：requestAnimationFrame代替setTimeout，减少重排的次数，极大提高了性能。 --- 耗时大概150ms
const renderList = async () => {
    console.time('列表时间');
    const list = await getList();
    const total = list.length;
    const page = 0;
    const limit = 200;
    const totalPage = Math.ceil(total / limit);
    const render = (page) => {
        if (page >= totalPage) return;
        requestAnimationFrame(() => {
            for (let i = page * limit; i < page * limit + limit && i < total; i++) {
                const item = list[i]
                const div = document.createElement('div')
                div.className = 'sunshine'
                div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
                container.appendChild(div);
            }
            render(page + 1);
        })
    }
    render(page);
    console.timeEnd('列表时间');
}


// *方法四：文档碎片 + requestAnimationFrame。 --- 耗时大概150ms
/**
 * 1、之前都是每次创建一个div标签就appendChild一次，但是有了文档碎片可以先把1页的div标签先放进文档碎片中，然后一次性appendChild到container中，这样减少了appendChild的次数，极大提高了性能
 * 2、页面只会渲染文档碎片包裹着的元素，而不会渲染文档碎片
 */
// const renderList = async () => {
//     console.time('列表时间');
//     const list = await getList();
//     const total = list.length;
//     const page = 0;
//     const limit = 200;
//     const totalPage = Math.ceil(total / limit);
//     const render = (page) => {
//         if (page >= totalPage) return;
//         requestAnimationFrame(() => {
//             // 创建一个文档碎片
//             const fragment = document.createDocumentFragment();
//             for (let i = page * limit; i < page * limit + limit && i < total; i++) {
//                 const item = list[i]
//                 const div = document.createElement('div')
//                 div.className = 'sunshine'
//                 div.innerHTML = `<img src="${item.src}" /><span>${item.text}</span>`
//                 // 先塞进文档碎片
//                 fragment.appendChild(div);
//             }
//             // 一次性appendChild
//             container.appendChild(fragment);
//             render(page + 1);
//         })
//     }
//     render(page);
//     console.timeEnd('列表时间');
// }





renderList();