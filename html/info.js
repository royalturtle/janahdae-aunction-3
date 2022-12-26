const player_list = [
	{"name":"", "tier-type":1, "tier-number":1, "position":0, "icon-small":"", "icon-big":""},
	
	{"name":"얍얍", "tier-type":5, "tier-number":4, "position":0, "icon-small":image_server + "G7ENFShUoL", "icon-big":image_server + "V7ENFSQtre"},
	{"name":"김뿡", "tier-type":5, "tier-number":4, "position":0, "icon-small":image_server + "J7ENFSiHZ5", "icon-big":image_server + "A7ENFSQvWu"},
	{"name":"중력", "tier-type":5, "tier-number":4, "position":0, "icon-small":image_server + "J7ENFSjsaA", "icon-big":image_server + "p7ENFSR2uo"},
	{"name":"룩삼", "tier-type":4, "tier-number":2, "position":0, "icon-small":image_server + "d7ENFS3GaB", "icon-big":image_server + "b7ENFSRxRk"},
	{"name":"치킨쿤", "tier-type":5, "tier-number":4, "position":0, "icon-small":image_server + "i7ENFS3FJV", "icon-big":image_server + "q7ENFSRKM0"},
	
	{"name":"푸린", "tier-type":3, "tier-number":2, "position":1, "icon-small":image_server + "F7ENFS3XOt", "icon-big":image_server + "k7ENFSFz2w"},
	{"name":"삼식", "tier-type":5, "tier-number":3, "position":1, "icon-small":image_server + "f7ENFS3RgG", "icon-big":image_server + "w7ENFSFzpc"},
	{"name":"스나랑", "tier-type":5, "tier-number":4, "position":1, "icon-small":image_server + "D7ENFS3FKA", "icon-big":image_server + "u7ENFSFybT"},
	{"name":"남봉", "tier-type":4, "tier-number":4, "position":1, "icon-small":image_server + "C7ENFS6ial", "icon-big":image_server + "K7ENFSFEOp"},
	{"name":"쌍베", "tier-type":3, "tier-number":4, "position":1, "icon-small":image_server + "b7ENFS6XJc", "icon-big":image_server + "W7ENFSFEG3"},
	
	{"name":"류제홍", "tier-type":5, "tier-number":4, "position":2, "icon-small":image_server + "c7ENFS7Gjh", "icon-big":image_server + "q7ENFSI4GW"},
	{"name":"눈꽃", "tier-type":6, "tier-number":4, "position":2, "icon-small":image_server + "R7ENFS8u4i", "icon-big":image_server + "H7ENFSIc8W"},
	{"name":"도현", "tier-type":5, "tier-number":3, "position":2, "icon-small":image_server + "z7ENFS8FEg", "icon-big":image_server + "U7ENFSIg1Y"},
	{"name":"감블러", "tier-type":5, "tier-number":2, "position":2, "icon-small":image_server + "z7ENFSaKGb", "icon-big":image_server + "p7ENFSIAJ2"},
	{"name":"김뚜띠", "tier-type":5, "tier-number":1, "position":2, "icon-small":image_server + "m7ENFSbiyI", "icon-big":image_server + "l7ENFSKaWu"},
	
	{"name":"따효니", "tier-type":5, "tier-number":3, "position":3, "icon-small":image_server + "p7ENFSbERk", "icon-big":image_server + "Y7ENFSKL8M"},
	{"name":"플러리", "tier-type":4, "tier-number":2, "position":3, "icon-small":image_server + "R7ENFSbJaU", "icon-big":image_server + "X7ENFSL7cl"},
	{"name":"러너", "tier-type":5, "tier-number":4, "position":3, "icon-small":image_server + "o7ENFScWs0", "icon-big":image_server + "R7ENFSL5U4"},
	{"name":"박나나", "tier-type":4, "tier-number":3, "position":3, "icon-small":image_server + "g7ENFSdRsA", "icon-big":image_server + "b7ENFSLqD1"},
	{"name":"유나땅", "tier-type":5, "tier-number":3, "position":3, "icon-small":image_server + "X7ENFSeb2S", "icon-big":image_server + "U7ENFSMIva"},
	
	{"name":"한동숙", "tier-type":4, "tier-number":3, "position":4, "icon-small":image_server + "m7ENFSerGR", "icon-big":image_server + "q7ENFSNvsc"},
	{"name":"던", "tier-type":4, "tier-number":2, "position":4, "icon-small":image_server + "O7ENFSg4qR", "icon-big":image_server + "a7ENFSNExN"},
	{"name":"연두부", "tier-type":4, "tier-number":2, "position":4, "icon-small":image_server + "L7ENFSgMEh", "icon-big":image_server + "J7ENFSO6ZH"},
	{"name":"빅헤드", "tier-type":4, "tier-number":3, "position":4, "icon-small":image_server + "y7ENFShdif", "icon-big":image_server + "S7ENFSOtnY"},
	{"name":"이춘향", "tier-type":4, "tier-number":4, "position":4, "icon-small":image_server + "I7ENFShCdx", "icon-big":image_server + "f7ENFSPbwk"},
];

const tier_list = [
	{"name":"", 			"icon":""},
	{"name":"iron", 		"icon":image_server + "b7EN2w2i1x"},
	{"name":"bronze", 		"icon":image_server + "Z7EN2w2p79"},
	{"name":"silver", 		"icon":image_server + "X7EN2w2i5g"},
	{"name":"gold", 		"icon":image_server + "u7EN2w2qiR"},
	{"name":"platinum", 	"icon":image_server + "V7EN2w4RsO"},
	{"name":"diamond", 		"icon":image_server + "a7EN2w4S87"},
	{"name":"master", 		"icon":image_server + "x7EN2w5aZN"},
	{"name":"grandmaster",  "icon":image_server + "K7EN2w5pSl"},
	{"name":"challenger", 	"icon":image_server + "s7EN2w7FV9"}
];

const position_dict = [
	{"name":"top", "icon":image_server + "d7EN2xJjZ0"},
	{"name":"jug", "icon":image_server + "A7EN2xJdMk"},
	{"name":"mid", "icon":image_server + "M7EN2xJjZQ"},
	{"name":"bot", "icon":image_server + "I7EN2xJdCu"},
	{"name":"sup", "icon":image_server + "n7EN2xJehf"},
];

const manager_list = ["얍얍", "푸린", "류제홍", "따효니", "한동숙"];
