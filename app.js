// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  onChildAdded,
  get,

} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYN8zzsmqVpv2kUdnxmfeoaBD-MMpXTfc",
  authDomain: "quiz-database-73ab5.firebaseapp.com",
  databaseURL: "https://quiz-database-73ab5-default-rtdb.firebaseio.com",
  projectId: "quiz-database-73ab5",
  storageBucket: "quiz-database-73ab5.appspot.com",
  messagingSenderId: "224460000283",
  appId: "1:224460000283:web:ecb9e19d2aa6247c2b7cbe",
  measurementId: "G-10K4Q597NC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();






var question = document.getElementById('question');
var opt1 = document.getElementById('opt1');
var opt2 = document.getElementById('opt2');
var opt3 = document.getElementById('opt3');
var opt4 = document.getElementById('opt4');
var correct = document.getElementById('correct');
var mar = document.getElementById("marks")
var stat = document.getElementById("status")
var last = document.getElementById("lastdiv")
window.sendquiz = function () {
    var obj = {
        question: question.value,
        a: opt1.value,
        b: opt2.value,
        c: opt3.value,
        d: opt4.value,
        correctans: correct.value


    }
    const keyofref = ref(database, 'Quiz/')
    obj.id = push(keyofref).key;
    const refrences = ref(database, `Quiz/${obj.id}/`);
    set(refrences, obj)
    console.log(obj.id)
    console.log(obj)

    question.value = ""
    opt1.value = ""
    opt2.value = ""
    opt3.value = ""
    opt4.value = ""
    correct.value = ""
};


var currentindex = 0;
var list = [];
window.renderdata = function () {
    const refrences = ref(database, `Quiz/`);
    var parent = document.getElementById('parent');
    parent.innerHTML = "";
    for (var i = 0; i < list.length; i++) {
        parent.innerHTML = `<h2>${list[currentindex].question}</h2>
   <ul> 
   <li>
        <button  id="atext"  onclick="checking1()">
        ${list[currentindex].a}
         </button></li>
          <li>
          <button id="btext" onclick="checking2()">
                ${list[currentindex].b}
                </button>
                </li>
              <li>
              <button id="ctext" onclick="checking3()">
                  ${list[currentindex].c}
                  </button>
                  </li>
                <li>
                <button id="dtext" onclick="checking4()">
                  ${list[currentindex].d}
                  </button>
                  </li>
  </ul>`;
    }
}
window.getdata = function () {
    onValue(ref(database, '/Quiz/'),
        (snapshot) => {
            console.log(snapshot.val())
        });
    const quizRef = ref(database, 'Quiz/');
    onChildAdded(quizRef, function (data) {
        list.push(data.val());
        console.log(data.val());
        renderdata();
    });

}



var mark=0;
window.checking1 = function () {
   
    var atext = document.getElementById('atext')
    var txt1 = atext.innerText;
  console.log(txt1)

    for (var i = 0; i < list.length; i++) {
        console.log(list[i].correctans)
        if (txt1 == list[i].correctans) {
            mark++;
            console.log(mark)
            stat.innerText="Pass"
            mar.innerText=mark
break;
        }
   

    }


    currentindex++
    renderdata();
}


window.checking2 = function () {
 
    var btext = document.getElementById('btext')
    var txt2 = btext.innerText;
    console.log(txt2)


    for (var i = 0; i < list.length; i++) {
        console.log(list[i].correctans)
        if (txt2 == list[i].correctans) {

            mark++;
            console.log(mark)
            stat.innerText="Pass"
            mar.innerText=mark
            break;
        }

 
    }

    currentindex++
    renderdata();


}

window.checking3 = function () {
  
    var ctext = document.getElementById('ctext')
    var txt3 = ctext.innerText;
    console.log(txt3)


    for (var i = 0; i < list.length; i++) {
        console.log(list[i].correctans)
        if (txt3 == list[i].correctans) {
            mark++;
            stat.innerText="Pass"
            mar.innerText=mark
            console.log(mark)
break;
        }


    }

    currentindex++
    renderdata();


}

window.checking4 = function () {
   
    var dtext = document.getElementById('dtext')
    var txt4 = dtext.innerText;
    console.log(txt4)

    for (var i = 0; i < list.length; i++) {
        console.log(list[i].correctans)
        if (txt4 == list[i].correctans)
        {

            mark++;
            console.log(mark)
            stat.innerText="Pass"
            mar.innerText=mark
            break;

        }


    }


    currentindex++
    renderdata();

}
window.showresult = function () {

 last.setAttribute('id','new')


}

window.none = function () {
    last.setAttribute('id','lastdiv')

}