const DEFAULT_WAIT_TIME = 3;
const DEFAULT_AUCTION_TIME = 5;
const PLAYER_COUNT = 5;
const waitingRoom = "waiting-room";

function LobbyManager(io){
    var LbMg = this;
    // Public Room
    LbMg.lobby = [];
    // LbMg.updating = false;
    
    // Public Room에서 대기 중인  명수
    LbMg.size = function() {
        return LbMg.lobby.length;
    };
    
    // Public Room에 추가
    LbMg.push = function(socket){
        socket.join(waitingRoom);
        LbMg.lobby.push(socket);
        io.in(waitingRoom).emit('wait-number-change', LbMg.size());
    };
    
    // Public Room에서 나오기
    LbMg.kick = function(socket){
        socket.leave(waitingRoom);
        
        // 대기 리스트에서 제거
        var index = LbMg.lobby.indexOf(socket);
        if(index >= 0) LbMg.lobby.splice(index,1);
        io.in(waitingRoom).emit('wait-number-change', LbMg.size());
    };
    
    // Public Room에서 null인 Socket들 정리
    LbMg.clean = function(){
        var sockets = LbMg.lobby;
        LbMg.lobby = sockets.filter(function(socket){ return socket !== null; });
    };
    
    // 6명 이상들어오면 방 생성
    LbMg.dispatch = function(RmMg){
        if(LbMg.dispatching) return;
        LbMg.dispatching = true;
  
        while(LbMg.lobby.length >= PLAYER_COUNT) {
            var players = LbMg.lobby.splice(0,PLAYER_COUNT);
            players = LbMg.shuffle(players);
            RmMg.create(players, DEFAULT_WAIT_TIME, DEFAULT_AUCTION_TIME, waitingRoom);
        }
        LbMg.dispatching = false;
    };
    
    // Custom Room
    LbMg.custom_lobby = {};
    LbMg.custom_time_info = {};
    LbMg.custom_user_dict = {};

    LbMg.putLeader = function(room, leader, socket) {
        if(room != null) {
            if(leader == 0)
            {
                room.random.push(socket);
            }
            else if(1<= leader && leader <= PLAYER_COUNT && !(leader in room))
            {
                room[leader] = socket;
            }
        }
    }
    
    // Custom Room Id가 이미 존재하는지 확인
    LbMg.isCustomIdNotExist = function(roomId, is_create=false, wait_time=DEFAULT_WAIT_TIME, auction_time=DEFAULT_AUCTION_TIME) {
        // Id가 이미 존재하는 경우
        if(roomId in LbMg.custom_lobby) {
            return null;
        }
        // Id가 없는 경우
        else {
            // 방을 생성하는 상황일 경우
            if(is_create) {
                // 새로운 Custom Room 생성
                LbMg.custom_lobby[roomId] = {
                    random : []
                };
                
                // Custom Room의 게임 설정 (대기 시간, 경매 시간)
                if(wait_time < 2) {
                    wait_time = DEFAULT_WAIT_TIME;
                }
                if(auction_time < 3) {
                    auction_time = DEFAULT_AUCTION_TIME;
                }
                LbMg.custom_time_info[roomId] = [wait_time, auction_time];
            }
            return roomId;
        }
        // console.log(Object.keys(LbMg.custom_lobby));
    };

    LbMg.isCustomJoinable = function(roomId, leader)
    {
        if(!(roomId in LbMg.custom_lobby))
            return 1;
        else
        {
            console.log(LbMg.custom_lobby[roomId]);
            if(leader in LbMg.custom_lobby[roomId])
                return 2;
            else
                return 0;
        }
    }
    
    // [0]Custom Room에 대기 중인 인원 명수
    LbMg.sizeCustom = function(roomId) {
        if(roomId in LbMg.custom_lobby) {
            var lobby = LbMg.custom_lobby[roomId];
            var result = lobby.random.length;
            for(var i = 1; i <= PLAYER_COUNT; i++)
            {
                if(i in lobby)
                {
                    result++;
                }
            }
            return result;
        }
        return -1;
    };
    
    // Custom Room에 참여
    LbMg.pushCustom = function(socket, roomId, leader) {
        socket.join(roomId);
        
        if(roomId in LbMg.custom_lobby) {
            LbMg.putLeader(LbMg.custom_lobby[roomId], leader, socket);
            LbMg.custom_user_dict[socket.id] = roomId;
        }
        
        io.to(socket.id).emit('room-id-create-result', true);
        io.in(roomId).emit('wait-number-change-custom', LbMg.getCustomStatus(roomId));
        // console.log("Push", Object.keys(LbMg.custom_lobby), Object.keys(LbMg.custom_user_dict));
    };

    LbMg.getCustomStatus = function(roomId) {
        var sumCount = 0;
        var participants = [];
        if(roomId in LbMg.custom_lobby) {
            var lobby = LbMg.custom_lobby[roomId];
            sumCount = lobby.random.length;
            for(var i = 1; i <= PLAYER_COUNT; i++)
            {
                if(i in lobby)
                {
                    participants.push(i - 1);
                    sumCount++;
                }
            }
        }

        return {
            count : sumCount,
            participants : participants
        };
    }
    
    // Custom Room 방 해체
    LbMg.breakCustom = function(socket) {
        if(socket.id in LbMg.custom_user_dict) {
            var roomId = LbMg.custom_user_dict[socket.id];
            if(roomId in LbMg.custom_lobby) {
                var room = LbMg.custom_lobby[roomId];
                var sockets = [];

                for(var i = 0; i < room.random.length; i++)
                    sockets.push(room.random[i]);

                for(var i = 1; i <= PLAYER_COUNT; i++)
                {
                    if(i in room)
                    {
                        sockets.push(room[i]);
                    }
                }

                sockets.forEach(function(socket) {
                    socket.emit('room-break-during-join');
                    delete LbMg.custom_user_dict[socket.id];
                });

                // LbMg.custom_lobby[roomId] = sockets.filter(function(socket){ return socket !== null; });
                
                delete LbMg.custom_lobby[roomId];
                delete LbMg.custom_time_info[roomId];
            }
        }
        // console.log("Breka", Object.keys(LbMg.custom_lobby), Object.keys(LbMg.custom_user_dict));
    };

    // Custom Room의 대기줄에서 나오기
    LbMg.leaveCustom = function(socket) {
        if(socket.id in LbMg.custom_user_dict) {
            var roomId = LbMg.custom_user_dict[socket.id];
            
            if(roomId in LbMg.custom_lobby) {
                socket.leave(roomId);
                var room = LbMg.custom_lobby[roomId];
                var index = room.random.indexOf(socket);
                if(index >= 0) {
                    room.random.splice(index,1);
                }
                else {
                    for(var i = 1; i <= PLAYER_COUNT; i++)
                    {
                        if(i in room && room[i] === socket)
                        {
                            delete room[i];
                            break;
                        }
                    }
                }
                delete LbMg.custom_user_dict[socket.id];
                io.in(roomId).emit('wait-number-change-custom', LbMg.getCustomStatus(roomId));
            }
        }
        // console.log("Leave", Object.keys(LbMg.custom_lobby), Object.keys(LbMg.custom_user_dict));
    };

    // 6 명 이상 들어오면 방 생성
    LbMg.dispatchCustom = function(RmMg, roomId) {
        if(roomId in LbMg.custom_lobby) {
            if(roomId in LbMg.custom_lobby && LbMg.sizeCustom(roomId) >= PLAYER_COUNT){
                var room = LbMg.custom_lobby[roomId];
                var players = [];
                var randomPool = room.random;
                if(randomPool.length > 0)
                {
                    randomPool = this.shuffle(randomPool);
                }
                for(var i = 1; i <= PLAYER_COUNT; i++)
                {
                    if(!(i in room))
                    {
                        var fromRandom = randomPool[0];
                        randomPool.splice(0, 1);
                        players.push(fromRandom);
                    }
                    else
                    {
                        players.push(room[i]);
                    }
                }

                var tmp_list = players.map((p) => {
                    return p.id;
                });
                RmMg.create(players, LbMg.custom_time_info[roomId][0], LbMg.custom_time_info[roomId][1], roomId);
          
                tmp_list.forEach(function(user_id) {
                    delete LbMg.custom_user_dict[user_id];
                });
                delete LbMg.custom_lobby[roomId];
                delete LbMg.custom_time_info[roomId];
                // console.log("Dispatch", Object.keys(LbMg.custom_lobby), Object.keys(LbMg.custom_user_dict));
            }
        }
    };

    LbMg.shuffle = function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
}
  
module.exports = LobbyManager;