import { __SYD, __c, __m, __p, __sS, __u , __g} from './sydneyLib/sydneyDom.js'
import dataGrid from './file.json' with { type: 'json' };

const data = dataGrid;

const template = {
    date:'',
    title:'',
    category:'',
    notes:'',
    amount:'',
    flutterwaveid:''
}

input_ = (i,key,elem) =>{
    console.log(i);
    console.log(__p(['table','data'],dataGrid))
    const state = __g('table');
    state.data[i][`${key}`] = elem.value;
    __u('table' , {type:'a' , value:state})
}

__SYD.container = () =>{
    return __c(
        'div',
        {
            style:'height:100vh;width:100vw;display:flex;padding:10px;padding-top:20px;justify-content:center;overflow-x:scroll;'
        },
        [
            __SYD.table()
        ]
    )
}

__SYD.table = () =>{
    return __c(
        'div',
        {
            style:'height:fit-content;padding:10px;display:flex;flex-direction:column;row-gap:10px;width:80%;max-width:500px;min-width:300px;position:relative;',
            class:'thin_border'
        },
        [
            __SYD.float_add(),
            __SYD.def_row(),
            ...(__p(['table' , 'data'],dataGrid).map((val,i) =>{return __SYD.rows_parent_add(i)})),
            __SYD.total(),
        ],
        {
            createState:{
                stateName:'table',
                state:{data:data}
            }
        }
    )
}

__SYD.save = () =>{
    return __c(
        'div',
        {
            style:'padding:5px;height:30px;display:flex;justify-content:center;align-items:center;width:fit-content;font-weight:500;position:absolute;top:0;right:-10px;transform:translateX(calc(100% + 5px));cursor:pointer',
            class:"thin_border"
        },
        [
            'save'
        ],{
            events:{
                onclick:async() =>{
                    const state = __g('table');
                    const response = await fetch('/update' , {
                        method:'POST',
                        body:JSON.stringify({data:state.data}),
                        headers:{
                            "Content-Type": "application/json",
                        }
                    });

                    const json_res = await response.json();

                    console.log(json_res)

                    switch(json_res.status)
                    {
                        case true:
                            alert('data saved')
                    }
                }
            }
        }
    )
}

__SYD.float_add = () =>{
    return __c(
        'div',
        {
            style:'padding:5px;height:30px;display:flex;justify-content:center;align-items:center;width:30px;font-size:22px;font-weight:900;position:absolute;top:0;right:0;transform:translateX(calc(100% + 5px));cursor:pointer',
            class:'thin_border'
        },
        [
            '+'
        ],
        {
            events:{
                onclick:() =>{
                    const state = __g('table');
                    state.data.push(
                        {
                            date:'',
                            title:'',
                            category:'',
                            notes:'',
                            amount:'',
                            flutterwaveid:''
                        }
                    );
                    __u('table' , {type:'a' , value:state})
                }
            }
        }
    )
}

__SYD.title_header = (cnt) =>{
    return __c(
        'div',
        {
            style:'position:absolute;top:50%;transform:translateY(-50%) translateX(calc(-100% - 10px));text-transform:uppercase;font-weight:700;font-size:16px'
        },
        [
            cnt
        ]
    )
}


__SYD.def_row = () =>{
    return __c(
        'div',
        {
            style:'height:70px;width:100%;display:flex;position:relative'
        },
        [
            __SYD.headers('date'),
            __SYD.headers('title'),
            //category
            __SYD.category(),
            __SYD.headers('Notes'),
            __SYD.headers('Amount'),
            __SYD.headers('Flutter wave id'),
            __SYD.title_header('header')
        ]
    )
}

__SYD.headers = (title) =>{
    return __c(
        'p',
        {
            style:'width:100%;text-align:center;font-size:14px;text-transform:capitalize;font-weight:700;width:100%;display:flex;align-items:center;justify-content:center;text-align:center;',
            class:"thin_border"
        },
        [
            title
        ]
    )
}

__SYD.category = () =>{
    return __c(
        'select',
        {
            style:'font-size:14px;text-transform:capitalize;font-weight:700;width:100%;font-size:14px;font-weight:700;',
        },
        [
            __c(
                'option',{
                    value:'category',
                    selected:true
                },
                [
                    'category'
                ]
            )
        ]
    )
}

__SYD.total = () =>{
    return __c(
        'div',
        {
            style:'height:70px;width:100%;display:flex;position:relative',
            class:'thin_border'
        },
        [
            __SYD.total_el('date'),
            __SYD.total_el('title'),
            __SYD.total_el('category'),
            __SYD.total_el('notes'),
            __SYD.total_el('amount'),
            __SYD.total_el('flutterwaveid'),
            __SYD.title_header('totals'),
            __SYD.save()

        ]
    )
}

__SYD.total_el = (cls) =>{
    const total = () =>{
        const data = __p(['table' , 'data'],dataGrid)
        let total_val = 0;
        data.forEach(element => {
            total_val += Number(element[`${cls}`])
        });
        return `${total_val == 0 ? '' : total_val}`;
    }
    return __c(
        'p',
        {
            style:'width:100%;text-align:center;font-size:14px;text-transform:capitalize;font-weight:700;width:100%;display:flex;align-items:center;justify-content:center;text-align:center;',
            class:"thin_border"
        },
        [
            total()
        ]
    )
}

__SYD.rows_parent_add = (i) =>{
    return __c(
        'div',
        {
            style:'height:70px;width:100%;display:flex;position:relative',
            class:'thin_border'
        },
        [
            __SYD.btw_input({i:i , key:'date'}),
            __SYD.btw_input({i:i , key:'title'}),
            __SYD.btw_input({i:i , key:'category'}),
            __SYD.btw_input({i:i , key:'notes'}),
            __SYD.btw_input({i:i , key:'amount'}),
            __SYD.btw_input({i:i , key:'flutterwaveid'}),
        ]
    )
}

__SYD.btw_input = ({i,key}) =>{
    return __c(
        'input',
        {
            style:'width:100%;text-align:center;font-size:14px;text-transform:capitalize;font-weight:700;width:100%;display:flex;align-items:center;justify-content:center;text-align:center;outline:none',
            class:"thin_border",
            value:__p(['table' , 'data'],dataGrid)[i] !== undefined ? __p(['table' , 'data'],dataGrid)[i][`${key}`] : '',
            oninput:`input_.bind()(${i} , "${key}" , this)`
        },[],
        {
            events:{
                // oninput:(e) =>{
                    
                // }
            }
        }
    )
}
//
__m(__SYD.container())