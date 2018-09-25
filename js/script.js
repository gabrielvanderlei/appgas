  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqL1FecjFVvhXZJevbJn-SkZ__DxQxesc",
    authDomain: "appgas-d7647.firebaseapp.com",
    databaseURL: "https://appgas-d7647.firebaseio.com",
    projectId: "appgas-d7647",
    storageBucket: "appgas-d7647.appspot.com",
    messagingSenderId: "715577686349"
  };

  var uuid;

  firebase.initializeApp(config);
  // Initialize Cloud Firestore through Firebase

  var db = firebase.firestore();
    
  function criarUsuario(){
    firebase.auth().createUserWithEmailAndPassword(document.getElementById('emailc').value,document.getElementById('senhac').value)
      .then(function(data){
          alert('Registrado');
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  }
  
  function logarUsuario(){
    firebase.auth()
    .signInWithEmailAndPassword(document.getElementById('emaill').value,document.getElementById('senhal').value)
    .then(function(){
          alert("Logado!");
    })
    .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
    })
  }
  
  function show(id){
    $('.section').css('display', 'none');
    $('#'+id).css('display','block');
  }
  

 function carregarSensores(doc){
    var data = doc.data();
    document.getElementById("sensores").innerHTML = data.sensores;
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      
      uuid = user.uid;
      var providerData = user.providerData;


      var user=db.collection("users").doc(uuid).get().then(carregarSensores)
      .catch(function(){
              db.collection("users").doc(uuid).add({
                  email: user.email
              })
              .then(function(docRef) {
                  alert('Usuário configurado');
              })
              .catch(function(error) {
                  console.error("Error adding document: ", error);
              });
            // ...
      });
            
      document.getElementById('username').innerHTML = email;
      
      show('painel');
      carregarSensores();
    } else {
      // User is signed out.
      // ...
      show('main');
    }
  });
  


  function addSensor(){
      var user=db.collection("users").doc(uuid);
      user.set({
      sensores: $("#sensor").val()
      }, {merge: true });

      show("painel");
      carregarSensores();
  }

  function logOut(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert('Deslogado');
    }).catch(function(error) {
      // An error happened.
      alert('Algum erro ocorreu');
    });
  }
    