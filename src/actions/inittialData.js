export const initialData ={
    broads:[
        {
            id:'broad-1',
            columnsOrder:["columns-1","columns-2","columns-3",'columns-4'],
            columns:[{
                id:'columns-1',
                broadId:'broad-1',
                title:'To do columns',
                cardOrder:["cards-1","cards-2","cards-3","cards-4","cards-5","cards-6"],
                cards:[
                     {id:'card-1', broadId:'broad-1',columnId:'columns-1',title:'Title of card-1',cover:'http://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg' },
                     {id:'card-2', broadId:'broad-2',columnId:'columns-2',title:'Title of card-2',cover:'http://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg' },
                     {id:'card-3', broadId:'broad-3',columnId:'columns-3',title:'Title of card-3',cover:'http://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg' },
                     {id:'card-4', broadId:'broad-4',columnId:'columns-4',title:'Title of card-4',cover:null },
                     {id:'card-5', broadId:'broad-5',columnId:'columns-5',title:'Title of card-5',cover:null },
                     {id:'card-6', broadId:'broad-6',columnId:'columns-6',title:'Title of card-6',cover:null }
                    ]
        },{
            id:'columns-2',
            broadId:'broad-1',
            title:'Dome do columns',
            cardOrder:["cards-7","cards-8","cards-9","cards-10","cards-11","cards-12"],
            cards:[
                 {id:'card-7', broadId:'broad-1',columnId:'columns-1',title:'Title of card-1',cover:null },
                 {id:'card-8', broadId:'broad-2',columnId:'columns-2',title:'Title of card-2',cover:null },
                 {id:'card-9', broadId:'broad-3',columnId:'columns-3',title:'Title of card-3',cover:'https://zshop.vn/blogs/wp-content/uploads/2016/08/1045.jpg' },
                 {id:'card-10', broadId:'broad-4',columnId:'columns-4',title:'Title of card-4',cover:'https://zshop.vn/blogs/wp-content/uploads/2016/08/1045.jpg'},
                 {id:'card-11', broadId:'broad-5',columnId:'columns-5',title:'Title of card-5',cover:'https://zshop.vn/blogs/wp-content/uploads/2016/08/1045.jpg' },
                 {id:'card-12', broadId:'broad-6',columnId:'columns-6',title:'Title of card-6',cover:null }
                ]
    },{
        id:'columns-3',
        broadId:'broad-1',
        title:'Tome do columns',
        cardOrder:["cards-13","cards-14","cards-15","cards-16","cards-17","cards-18"],
        cards:[
             {id:'card-13', broadId:'broad-1',columnId:'columns-1',title:'Title of card-1',cover:'http://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg'},
             {id:'card-14', broadId:'broad-2',columnId:'columns-2',title:'Title of card-2',cover:'http://www.elle.vn/wp-content/uploads/2017/07/25/hinh-anh-dep-1.jpg '},
             {id:'card-15', broadId:'broad-3',columnId:'columns-3',title:'Title of card-3',cover:null },
             {id:'card-16', broadId:'broad-4',columnId:'columns-4',title:'Title of card-4',cover:null },
             {id:'card-17', broadId:'broad-5',columnId:'columns-5',title:'Title of card-5',cover:null },
             {id:'card-18', broadId:'broad-6',columnId:'columns-6',title:'Title of card-6',cover:null }
            ]
}
    ]
        ,
}]
}
