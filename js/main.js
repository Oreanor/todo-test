$(document).ready(function(){
	var arr=[];

	//localStorage.clear();


	if (localStorage.getItem('taskdata')) {
	   arr = JSON.parse(localStorage.getItem('taskdata'));
	   buildList();
	}

	var reverse = -1;

	function savedata(){
		localStorage.setItem('taskdata',JSON.stringify(arr));
	}

	$("#bAdd")
	.on("click",function(){
		var str = $("#inputtext").val();
		if(str.replace(/\s+/g, '').length==0){
			$("#hint").css("display","block");
		} else {
			$("#hint").css("display","none");
			addTask(str);
		}
		$("#inputtext").val("");
	});



	$("#taskname")
	.on("click",function(){
		reverse*=-1;
		arr.sort(compare);
		buildList();

		if(reverse==-1){
			$("#sort").attr("src","img/down.png");
		} else {
			$("#sort").attr("src","img/up.png")	;		
		}
	});

	function addTask(name){
		arr.push({name:name,complete:false,remove:false});
		arr.sort(compare);
		savedata();
		buildList();
	}


	function buildList(){
		$("#content").empty();
		for(var i=0;i<arr.length;i++){
			$("#content").append('<div class="entry" id="e'+i+'"><div class="ename"><input type="text" class="etext"></div><div class="ecomplete"><input type="checkbox" class="ch1"/></div><div class="eremove"><input type="checkbox" class="ch2"/></div></div>');
			var el = $("#e"+i);
			el.find(".etext").val(arr[i].name);
			el.find(".ch1").prop("checked",arr[i].complete);
			el.find(".ch2").prop("checked",arr[i].remove);
		}

		addListeners();
	}


	function addListeners(){
		$(".etext")
		.focusout(function(event){
			var str = $(this).val();
			var ind = parseInt($(this).parent().parent().attr("id").substr(1));
			if(str.replace(/\s+/g, '').length!=0){
				arr[ind].name = str;
			}
			arr.sort(compare);
			savedata();
			buildList();

		});

		$(".ch1")
		.change(function(){
			var ind = parseInt($(this).parent().parent().attr("id").substr(1));
			arr[ind].complete = $(this).prop("checked");
			savedata();
		});
		$(".ch2")
		.change(function(){
			var ind = parseInt($(this).parent().parent().attr("id").substr(1));
			arr[ind].remove = $(this).prop("checked");
			savedata();
		});
	}

	$("#bDelete")
	.on("click",function(){
		var i = 0;
		while(arr[i]){
			if(arr[i].remove){
				arr.splice(i,1)
			} else {
				i++;
			}
		}

		savedata();
		buildList();
	});


	


	function compare(a,b) {
	  if (a.name < b.name)
	    return 1*reverse;
	  else if (a.name > b.name)
	    return -1*reverse;
	  else 
	    return 0;
	}

});