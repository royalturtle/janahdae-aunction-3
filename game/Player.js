function Player(player_id, leader) {
    var player = this;
    player.role = "player";
    player.id = player_id;
    player.ready = false;
    player.lineup_list = [-1, -1, -1, -1, -1];
    player.empty_space = 5 - 1;

    switch(leader)
    {
        case 0:
            player.money = 815;
            player.lineup_list[0] = 1;
            break;
        case 1:
            player.money = 995;
            player.lineup_list[1] = 6;
            break;
        case 2:
            player.money = 910;
            player.lineup_list[2] = 11;
            break;
        case 3:
            player.money = 840;
            player.lineup_list[3] = 16;
            break;
        case 4:
            player.money = 875;
            player.lineup_list[4] = 21;
            break;
    }
}

module.exports = Player;