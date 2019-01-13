var task = document.getElementById("task-text");
var add_btn = document.getElementById("add-btn");
var list = document.getElementById("list");
var list_important = document.getElementById("importantList");
var counterContainer = document.getElementById("counter");
var counterContainer2 = document.getElementById("counter_important");

function refreshCounter() {
  counterContainer.innerText =
    "Task to do: " + list.querySelectorAll("li:not(.done)").length;
}

function refreshCounterImportant() {
  counterContainer2.innerText =
    "Important Task to do: " +
    list_important.querySelectorAll("li:not(.done)").length;
}

function add_item() {
  if (task.value == "") {
    add_btn.addEventListener("click", function() {
      event.preventDefault();
    });
  } else {
    list.style.display = "block";

    var li = document.createElement("li");
    text = document.getElementById("task-text").value;
    li.innerHTML = text;

    var container = document.createElement("span");
    container.classList.add("btns-cont");
    li.appendChild(container);

    var done_btn = document.createElement("button");
    done_btn.classList.add("done-btn");
    done_btn.innerHTML =
      '<span class="fa fa-check-square-o" aria-hidden="true"></span>';
    container.appendChild(done_btn);

    var remove_btn = document.createElement("button");
    remove_btn.classList.add("remove-btn");
    remove_btn.innerHTML =
      '<span class="fa fa-trash" aria-hidden="true"></span>';
    container.appendChild(remove_btn);

    var pin_btn = document.createElement("button");
    pin_btn.classList.add("pin-btn");
    pin_btn.innerHTML = '<span class="fa fa-link" aria-hidden="true">';
    container.appendChild(pin_btn);

    task.value = "";
    list.appendChild(li);

    document.getElementById("welcome").style.display = "none";
    remove_btn.addEventListener("click", remove_item);
    pin_btn.addEventListener("click", makeImportant);
    done_btn.addEventListener("click", makeDone);
  }

  var li_all = document.getElementsByTagName("li");
  for (var i = 0; i < li_all.length; i++) {
    var li = li_all[i];
    li.addEventListener("mouseover", function() {
      var li_nodes = this.childNodes;
      li_nodes[1].style.display = "block";
    });

    li.addEventListener("mouseout", function() {
      var li_nodes = this.childNodes;
      li_nodes[1].style.display = "none";
    });
  }
  refreshCounter();
  refreshCounterImportant();
}

add_btn.addEventListener("click", add_item);

function remove_item() {
  var item = this.parentNode.parentNode;
  var parent = item.parentNode;
  parent.removeChild(item);
  refreshCounter();
  refreshCounterImportant();
}

function makeImportant() {
  var item = this.parentNode.parentNode;
  var ol_list = this.parentNode.parentNode.parentNode;

  if (ol_list.id == "list") {
    this.innerHTML = '<span class="fa fa-chain-broken" aria-hidden="true">';
    document.getElementById("importantList").style.display = "block";
    document.getElementById("task").style.marginBottom = "0px";
    document.getElementById("importantList").appendChild(item);
    this.parentNode.style.display = "none";
    refreshCounter();
    refreshCounterImportant();
  } else {
    list.appendChild(item);
    this.innerHTML = '<span class="fa fa-chain" aria-hidden="true">';
    refreshCounter();
    refreshCounterImportant();
  }
}

function makeDone() {
  var item = this.parentNode.parentNode;
  testClass = item.className;
  if (testClass == "done") {
    item.className = "tasks";
    this.className = "done-btn";
    this.innerHTML = '<span class="fa fa-check-square-o" aria-hidden="true">';
    refreshCounter();
    refreshCounterImportant();
  } else {
    item.className = "done";
    this.className = "done-btn-done";
    this.innerHTML = '<span class="fa fa-check" aria-hidden="true">';
    var li_nodes = item.childNodes;
    li_nodes[1].style.display = "block";
    refreshCounter();
    refreshCounterImportant();
  }
}
