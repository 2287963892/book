var express = require('express');
const pool = require('./pool.js');
const router = express.Router();

/* GET users listing. */
router.get('/queryCart', function (req, res, next) {
    let iid = req.query.iid,
        values=[iid],
        sql = 'select * from book_shoppingcart_item where iid=?';
    pool.query(sql, values, function (error, result) {
        if (error) throw error;
        res.send(result);
    })
});

router.get('/addCart',function (req,res,next) {
    let lid=req.query.lid,
        uid=req.session.uid;
        obj={
            user_id:uid,
            product_id:lid,
        };
        values=[obj];
        console.log(obj);
        sql='insert into book_shoppingcart_item set ?';
    pool.query(sql,values,function (error, result) {
        if(error)throw error;
        let info=result.affectedRows>0?{code:200,msg:'sucess'}:{code:201,msg:'faied'};
        res.send(info);
    })
});

module.exports = router;
