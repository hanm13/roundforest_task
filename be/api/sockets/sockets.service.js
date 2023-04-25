

const {getTokenRedisDataRepository} = require("../auth/auth.repository");
const {logger} = require("../../common/functions");
const {basename} = require("path");
const cookie = require('cookie');

let io = {listener:{}};

let ioInit = (ioListener)=>{
    logger.info(`${basename(__filename)} [ioInit] entered`);

    io.listener = ioListener;

    try{
     //Socket.io
     io.listener.on("connection", (socket) => {

        try{

            logger.info(`${basename(__filename)} socket-io new client connected, URL: ${socket.handshake.url}.`);

            //Client disconnected:
            socket.on("disconnect", async () => {
                logger.info(`${basename(__filename)} socket-io client disconnected`);
    
                const cookies = cookie.parse(socket.request.headers.cookie || '');
    
                if(cookies.uuid){
                    let token_data = await getTokenRedisDataRepository({}, cookies.uuid);
                    if(token_data){
                        io.listener.sockets.emit('admin-disconnected', {name:token_data.steamData.personaname,userSteamID32: token_data.userSteamID32});
                    }
                }
                
            });

            
            socket.on("connect_error", (err) => {
                logger.info(`${basename(__filename)} connect_error due to ${err.message}`);
            });

        }catch(e){
            logger.error(`${basename(__filename)} [ioInit - connection] error: ${JSON.stringify(e)}`);
        }

    });
    }catch(e){
        logger.error(`${basename(__filename)} [ioInit] error: ${JSON.stringify(e)}`);
    }

        
};

module.exports = {
    ioInit,
    io
}