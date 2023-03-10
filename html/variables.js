// 게임 정보
var is_game_start = false;

// 경매 정보
var who_first = DEFAULT_WHO_FIRST;
var current_selected = 0;
var money = DEFAULT_MONEY, is_auction_start = false;

const min_up_money = 5, max_money = 1000;

// 방정보
var is_create_room = false, is_join_room=false;

var lineup_data = [];

// 내 정보
var my_team_index = -1;

// Timer 관련
var wait_timer = null, time_wait_countdown = 10, time_wait_remain = 0;
var auction_timer = null, time_auction_countdown = 10, time_auction_remain = 0;

// 결과 확인 정보
var is_check_point = false;

function get_default_money(index) {
	switch(index) {
		case 0:
			return 815;
		case 1:
			return 995;
		case 2:
			return 910;
		case 3:
			return 840;
		case 4:
			return 875;
		default:
			return 0;
	}
}
/*
var game_data = {
	"auction" : {
		
		"money" : DEFAULT_MONEY
	}
}*/