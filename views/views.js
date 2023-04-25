const router = require('express').Router();

module.exports = function (app){

    const handle = app.getRequestHandler();
    
    // router.get('sw.js', (req,res)=>{
    //     res.set('Services-Worker-Allowed', "/");
    //     return handle(req, res, req.url);
    // });

    router.get('/unauthorized', (req,res)=>{
        return handle(req,res,'/unauthorized',req.url);
    });

    router.get('/', handlePage);
    
    router.get('*', (req,res)=>{
        return handle(req,res,req.url);
    });


    return router;

    /////// ROUTER HANDLES

    async function handlePage(req,res){

        try{
            return app.render(req,res,req.path,req.query)            
        }catch(e){
            return app.render404(req,res);
        }


    }
    

};
